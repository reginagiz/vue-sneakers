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
  <CardList :sneakers="sneakers" @clickToFavorite="clickToFavorite" @addToCart="addToCart"/>
</template>

<script>
import CardList from "@/components/CardList.vue";
import axios from "axios";
import debounce from "debounce";
import {useCartStore} from "@/store/CartStore";
import {mapActions, mapState} from 'pinia';
import {useSneakersStore} from "@/store/SneakersStore";
import {useFavoritesStore} from "@/store/FavoritesStore";

export default {
  components: { CardList },

  methods: {
    ...mapActions(useCartStore, ['fetchCart','addToCart']),
    ...mapActions(useFavoritesStore, ['fetchFavorites','clickToFavorite']),
    ...mapActions(useSneakersStore, ['fetchSneakers','onChangeSelect','onChangeSearchInput']),
  },

  computed: {
    ...mapState(useCartStore, ['Cart']),
    ...mapState(useSneakersStore, ['sneakers']),
    ...mapState(useFavoritesStore, ['favorites']),
  },

  async mounted() {
    try {
      await this.fetchFavorites();
      await this.fetchCart()
      await this.fetchSneakers();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}
</script>
