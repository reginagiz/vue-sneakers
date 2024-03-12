import { defineStore } from 'pinia';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCartStore } from "@/store/CartStore";
import { useFavoritesStore } from "@/store/FavoritesStore";

const debouncedFetchSneakers = debounce(async function (store) {
  await store.fetchSneakers();
}, 1000);

export const useSneakersStore = defineStore({
  id: 'sneakers',
  state: () => ({
    sneakers: [],
    sortBy: 'name',
    searchQuery: '',
    cartStore: useCartStore(),
    favoritesStore: useFavoritesStore(),
  }),
  actions: {
    async fetchSneakers() {
      try {
        const response = await axios.get(
            'https://67ee0e5bcbd05745.mokky.dev/sneakers',
            {
              params: {
                sortBy: this.sortBy,
                title: this.searchQuery ? `*${this.searchQuery}*` : undefined,
              },
            }
        );

        this.sneakers = response.data.map((sneaker) => ({
          ...sneaker,
          isAdded: this.cartStore.Cart.some((cartItem) => cartItem.sneaker.id === sneaker.id),
          isFavorite: this.favoritesStore.favorites.some((favoriteItem) => favoriteItem.id === sneaker.id),
        }));

      } catch (e) {
        alert('Ошибка');
      }
    },

    onChangeSelect(event) {
      this.sortBy = event.target.value;
      debouncedFetchSneakers(this);
    },

    onChangeSearchInput(event) {
      this.searchQuery = event.target.value;
      debouncedFetchSneakers(this);
    },
  },
});
