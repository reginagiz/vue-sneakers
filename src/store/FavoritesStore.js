import { defineStore } from 'pinia';
import axios from "axios";
import { useSneakersStore } from './SneakersStore';

export const useFavoritesStore = defineStore({
    id: 'favorites',
    state: () => ({
        favorites: [],
        sneakersStore: useSneakersStore()
    }),
    actions: {
        async fetchFavorites() {
            try {
                const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/favorites?_relations=sneakers');
                this.favorites = response.data.map((obj)=>{
                    return{
                        ...obj.sneaker,
                        isFavorite:true
                    }
                })

            } catch (error) {
                console.error('Ошибка при получении избранного:',error.message);
                throw error;
            }
        },

        async clickToFavorite(sneaker){
            try {
                sneaker.isFavorite = !sneaker.isFavorite;

                if (sneaker.isFavorite) {
                    await this.addToFavorites(sneaker)
                } else {
                    await this.removeFromFavorites(sneaker)
                }

            } catch (error) {
                console.error(error.message);
                throw error;
            } finally {
                await this.fetchFavorites()
            }
        },

        async addToFavorites(sneaker) {
            try {
                const obj = {sneaker_id: sneaker.id};
                await axios.post('https://67ee0e5bcbd05745.mokky.dev/favorites', obj);

            } catch (error) {
                console.error('Ошибка при добавлении в избранное:',error.message);
                throw error;
            }
        },

        async removeFromFavorites(sneaker){
            try {
                const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/favorites');

                const itemToDelete = response.data.find(item => item.sneaker_id === sneaker.id);
                await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/favorites/${itemToDelete.id}`);

            } catch (error) {
                console.error('Ошибка при удалении из избранного:',error.message);
                throw error;
            }

        },
    },
});
