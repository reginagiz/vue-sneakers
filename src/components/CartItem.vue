<template>
  <div class="flex items-center border border-gray p-10 rounded-xl gap-10">
    <img class="w-[74px] h-[74px] flex-2" :src="item.imageUrl" alt="sneaker"/>
    <div class="flex flex-col flex-1">
      <p>{{item.title}}</p>
      <div class="flex justify-between mt-10">
        <b>{{item.price}} ₽</b>
        <button class="bg-none border-none" @click="handleRemoveFromCart">
          <img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="close"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  methods: {
    handleRemoveFromCart() {
      this.$emit('addToCart', this.item);
      console.log('hello')
    }
  }
}
</script>
