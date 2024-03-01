import { defineStore } from 'pinia';
import axios from "axios";
import cartItem from "@/components/CartItem.vue";
import CartItem from "@/components/CartItem.vue";

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        Cart: [],
    }),
    actions: {
        async fetchCart() {
            try {
                const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/cart?_relations=sneakers');
                this.Cart = response.data.map((obj)=>obj.sneaker);
            } catch (error) {
                console.error('Ошибка при получении корзины:', error.message);
                throw error;
            }
        },
        async addToCart(sneaker) {
            try {
                sneaker.isAdded = !sneaker.isAdded
                if(sneaker.isAdded ){
                    const obj = {
                        sneaker_id: sneaker.id
                    };
                    const response= await axios.post('https://67ee0e5bcbd05745.mokky.dev/cart', obj);
                    console.log(response)
                    sneaker.cartId = response.data.sneaker_id;
                }else {
                    console.log(sneaker)
                    if (sneaker.cartId) {
                        await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/cart/${sneaker.cartId}`);
                    }
                    sneaker.isAdded = false;
                    sneaker.cartId = null;
                }
            } catch (error) {
                console.error(error.message);
                throw error;
            }finally {
                await this.fetchCart()
            }
        },
        // async fetchCart() {
        //     try {
        //         const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/cart');
        //         this.Cart = response.data;
        //     } catch (error) {
        //         console.error('Ошибка при получении корзины:', error.message);
        //         throw error;
        //     }
        // },
        // async addToCart(sneaker) {
        //     sneaker.isAdded = true;
        //     try {
        //         sneaker.sneaker_id = sneaker.id;
        //         await axios.post('https://67ee0e5bcbd05745.mokky.dev/cart', sneaker);
        //         await this.fetchCart();
        //     } catch (error) {
        //         console.error('Ошибка при добавлении в корзину:', error.message);
        //         throw error;
        //     }
        // },
        // async removeFromCart(sneaker) {
        //     sneaker.isAdded = false;
        //     try {
        //
        //
        //         await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/cart/${id}`);
        //         await this.fetchCart();
        //     } catch (error) {
        //         console.error('Ошибка при удалении из корзины:', error.message);
        //         throw error;
        //         }
        // },
        // async clearCart() {
        //     for (const sneaker of this.Cart) {
        //         await this.removeFromCart(sneaker)
        //     }
        // },
    },
    getters:{
        TotalPrice() {
            return this.Cart.reduce((acc, sneaker) => acc + sneaker.price, 0);
        },
        TaxPrice() {
            return Math.round(this.TotalPrice * 0.05);
        },
    },
});
