import { defineStore } from 'pinia';
import axios from "axios";
import { useSneakersStore } from './SneakersStore';

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        Cart: [],
        sneakersStore: useSneakersStore()
    }),
    actions: {
        async fetchCart() {
            try {
                const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/cart?_relations=sneakers');
                this.Cart = response.data
            } catch (error) {
                console.error('Ошибка при получении корзины:', error.message);
                throw error;
            }
        },
        async addToCart(sneaker) {
            try {
                sneaker.isAdded = !sneaker.isAdded;

                if (sneaker.isAdded) {
                    await this.addToCartRequest(sneaker);
                } else {
                    await this.removeFromCart(sneaker);
                }
            } catch (error) {
                console.error(error.message);
                throw error;
            }
        },

        async addToCartRequest(sneaker) {
            const obj = {sneaker_id: sneaker.id};
            await axios.post('https://67ee0e5bcbd05745.mokky.dev/cart', obj);
            await this.fetchCart();
        },

        async removeFromCart(sneaker) {
            try {

                if ("isAdded" in sneaker) {
                    const itemToDelete = this.Cart.find(item => item.sneaker.id === sneaker.id);
                    await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/cart/${itemToDelete.id}`);

                    sneaker.isAdded = false;
                } else {
                    // В данном случае sneaker - это запись из корзины
                    await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/cart/${sneaker.id}`);

                    const updatedSneakers = this.sneakersStore.sneakers.map(item => {
                        if (item.id === sneaker.sneaker.id) {
                            return {
                                ...item,
                                isAdded: false
                            };
                        }
                        return item;
                    });
                    this.sneakersStore.sneakers = updatedSneakers;
                }
            }  catch (error){
                console.error(`Ошибка при удалении из корзины: ${error.message}`);
                throw error;
            } finally {
                await this.fetchCart();
            }
        },
        async clearCart() {
            try {
                this.Cart.map((obj)=>obj.sneaker)

                for (let sneaker of this.Cart) {
                    await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/cart/${sneaker.id}`);

                    const updatedSneakers = this.sneakersStore.sneakers.map(item => {
                        if (item.id === sneaker.id) {
                            return {
                                ...item,
                                isAdded: false
                            };
                        }
                        return item;
                    });
                    this.sneakersStore.sneakers = updatedSneakers;
                }
            } catch (error) {
                console.error(`Ошибка при очищении корзины: ${error.message}`);
                throw error;
            } finally {
                await this.fetchCart();
            }
        }

    },
    getters:{
        TotalPrice() {
            return this.Cart.map((obj)=>obj.sneaker).reduce((acc, sneaker) => acc + sneaker.price, 0);
        },
        TaxPrice() {
            return Math.round(this.TotalPrice * 0.05);
        },
    },
});
