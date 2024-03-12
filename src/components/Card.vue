<template>
  <div class="flex">
    <div class="w-[355px] h-[430px] bg-white relative border border-ligth-gray rounded-3xl p-20 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl" >
      <button @click="toggleFavorite" class="border-none bg-none">
        <img class="absolute top-8 left-8" :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="like"/>
      </button>
      <div class="w-[300px] h-[260px]">
        <img class="w-full h-full object-cover" :src="sneaker.imageUrl" alt="sneaker"/>
      </div>
      <p class="mt-10">{{sneaker.title}}</p>
      <div class="flex justify-between mt-10">
        <div class="flex flex-col">
          <span class="text-gray">Цена:</span>
          <b>{{sneaker.price}} ₽</b>
        </div>
        <button v-if="isOnMainPage" @click="toggleCart" >
          <img :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="plus">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sneaker: {
      type: Object,
      required: true
    },
    isFavoritePage: {
      type: Boolean
    }
  },
  data() {
    return {
      isOnMainPage: false,
      isFavorite: false,
      isAdded: false,
    };
  },
  mounted() {
    this.isOnMainPage = this.$route.name === 'Home';
    this.isFavorite = this.sneaker.isFavorite || false;
    this.isAdded = this.sneaker.isAdded || false;
  },
  methods: {
    toggleFavorite() {
      this.$emit('clickToFavorite', this.sneaker);
    },
    toggleCart() {
      this.$emit('addToCart', this.sneaker);
    }
  },
  watch: {
    sneaker: {
      handler(newItem) {
        this.isFavorite = newItem.isFavorite;
        this.isAdded = newItem.isAdded;
      },
      deep: true
    }
  },
}
</script>


<style scoped>

</style>
