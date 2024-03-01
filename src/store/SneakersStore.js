import { defineStore } from 'pinia';
import axios from 'axios';
import debounce from 'debounce';

export default defineStore({
  id: 'sneakers',
  state: () => ({
    sneakers: [],
    sortBy: 'name',
    searchQuery: '',
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
        const sneakers = response.data.map((obj) => ({
          ...obj,
          isFavorite: false,
          favoriteId: null,
          isAdded: false,
        }));
        this.sneakers = sneakers;
      } catch (e) {
        alert('Ошибка');
      }
    },
    onChangeSelect(event) {
      this.sortBy = event.target.value;
      this.fetchSneakers();
    },
    onChangeSearchInput: debounce(function (event) {
      this.searchQuery = event.target.value;
      this.fetchSneakers();
    }, 1000),
  },
});
