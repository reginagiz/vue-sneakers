<template>
  <div class="flex justify-between items-center">
    <h2 class="text-4xl font-bold mb-20">Все кроссовки</h2>
    <div class="flex gap-10">
      <select @change="onChangeSelect" class="py-5 px-7 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (по возрастанию)</option>
        <option value="-price">По цене (по убыванию)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-2.5" src="/search.svg" alt="search"/>
        <input @input="onChangeSearchInput" type="text" class="border rounded py-5 pl-40 pr-10 outline-none focus:border-gray" placeholder="Поиск...">
      </div>
    </div>
  </div>
  <CardList :sneakers="sneakers" @addToFavorites="addToFavorites" @onClickAddToCart="onClickAddToCart"/>
</template>

<script>
import CardList from "@/components/CardList.vue";
import axios from "axios";
import debounce from "debounce";

export default {
  components: { CardList },
  data() {
    return {
      favorites: [],
      sortBy: 'name',
      searchQuery: '',
      sneakers: [],
    };
  },
  inject: ['cart','actions'],
  methods: {
    async fetchSneakers() {
      try {
        const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/sneakers', {
          params: {
            sortBy: this.sortBy,
            title: this.searchQuery ? `*${this.searchQuery}*` : undefined
          }
        });
        this.sneakers = response.data;
        this.sneakers = this.sneakers.map((obj) => ({
          ...obj,
          isFavorite: false,
          favoriteId: null,
          isAdded: false
        }));
      } catch (e) {
        alert("Ошибка")
      }
    },

    async fetchFavorites() {
      try {
        const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/favorites');
        this.favorites = response.data;
        this.sneakers = this.sneakers.map((item) => {
          const favorite = this.favorites.find((favorite) => favorite.sneaker_id === item.id);
          if (favorite) {
            return {
              ...item,
              isFavorite: true,
              favoriteId: favorite.id
            };
          } else {
            return item;
          }
        });
      } catch (e) {
        alert("Ошибка");
      }
    },
    async addToFavorites(sneaker) {
      try {
        sneaker.isFavorite = !sneaker.isFavorite;
        if (sneaker.isFavorite) {
          const obj = {
            sneaker_id: sneaker.id
          };
          const response = await axios.post('https://67ee0e5bcbd05745.mokky.dev/favorites', obj);
          sneaker.favoriteId = response.data.favoriteId;
        } else {
          if (sneaker.favoriteId) {
            await axios.delete(`https://67ee0e5bcbd05745.mokky.dev/favorites/${sneaker.favoriteId}`);
          }
          sneaker.isFavorite = false;
          sneaker.favoriteId = null;
        }
      } catch (e) {
        console.error("Error:", e);
        alert("Ошибка");
      }
    },
    onClickAddToCart(sneaker) {
      if (!sneaker.isAdded) {
        this.actions.addToCart(sneaker);
      } else {
        this.actions.removeFromCart(sneaker)
      }
    },
    onChangeSelect(event) {
      this.sortBy = event.target.value;
      this.fetchSneakers();
    },
    onChangeSearchInput: debounce(function(event) {
      this.searchQuery = event.target.value;
      this.fetchSneakers();
    }, 1000),
  },
  async mounted() {
    try {
      await this.fetchSneakers();
      await this.fetchFavorites();

      this.sneakers = this.sneakers.map((sneaker) => {
        return{
          ...sneaker,
          isAdded: this.cart.some((cartItem) => cartItem.id === sneaker.id)
        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}
</script>