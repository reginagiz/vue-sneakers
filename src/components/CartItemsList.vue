<template>
  <div class="flex flex-col gap-10" v-auto-animate>
    <CartItem :sneaker="sneaker" :removeFromCart="removeFromCart" v-for="sneaker in cart" :key="sneaker.id" />
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";

export default {
  components: {CartItem},
  props:{
    cart:{
      type:Array,
      required:true
    },
    removeFromCart: {
      type: Function,
      required: true
    }
  },
}
</script>

<style scoped>

</style>