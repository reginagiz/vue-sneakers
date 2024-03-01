<template>
  <div>
    <div v-if="sneakers" class="flex justify-start gap-10 flex-wrap content-start mt-20" v-auto-animate>
      <Card v-for="sneaker in sneakers" :sneaker="sneaker" :key="sneaker.id" @addToFavorites="handleAddToFavorites" @onClickAddToCart="handleAddToCart"/>
    </div>
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";


export default {
  components: { Card },
  props: {
    sneakers: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleAddToFavorites(sneaker) {
      this.$emit('addToFavorites', sneaker);
    },
    handleAddToCart(sneaker) {
      this.$emit('addToCart', sneaker);
    }
  }

};
</script>

<style scoped>
</style>