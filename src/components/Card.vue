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
        <button @click="toggleCart">
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
    }
  },
  data() {
    return {
      isFavorite: this.sneaker.isFavorite || false,
      isAdded: this.sneaker.isFavorite || false,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$emit('addToFavorites', this.sneaker);
    },
    toggleCart() {
      this.isAdded = !this.isAdded;
      this.$emit('onClickAddToCart', this.sneaker);
    }
  },
  watch:{
    sneaker:{
      handler(newItem) {
        this.isFavorite = newItem.isFavorite;
        this.isAdded = newItem.isAdded;
      },
      deep:true
    }
  }
}
</script>

<style scoped>

</style>
