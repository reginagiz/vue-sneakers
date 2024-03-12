<template>
  <div>
    <h2 class="text-4xl font-bold mb-20">Мои закладки</h2>
    <CardList :sneakers="favorites" @clickToFavorite="clickToFavorite"/>
  </div>
</template>

<script>
import axios from "axios";
import CardList from "@/components/CardList.vue";
import {mapState,mapActions} from "pinia";
import {useFavoritesStore} from "@/store/FavoritesStore";


export default {
  components: {CardList},
  methods:{
    ...mapActions(useFavoritesStore, ['fetchFavorites','clickToFavorite']),
  },
  computed: {
    ...mapState(useFavoritesStore, ['favorites']),
  },
  async mounted() {
    try {
      await this.fetchFavorites();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}
</script>

<style scoped>

</style>