<template>
  <div>
    <h2 class="text-4xl font-bold mb-20">Мои закладки</h2>
    <CardList :sneakers="favorites"/>
  </div>
</template>

<script>
import axios from "axios";
import CardList from "@/components/CardList.vue";

export default {
  components: {CardList},
  data(){
    return{
      favorites:[]
    }
  },
  methods:{
    async fetchFavorites() {
      try {
        const response = await axios.get('https://67ee0e5bcbd05745.mokky.dev/favorites?_relations=sneakers');
        console.log(response)
        this.favorites = response.data.map((obj)=>obj.sneaker)
      } catch (e) {
        alert("Ошибка");
      }
    },
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