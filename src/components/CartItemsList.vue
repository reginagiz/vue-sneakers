<template>
  <div class="flex flex-col gap-10" v-auto-animate>
    <CartItem :item="item" v-for="item in cart" :key="item.id" @removeFromCart="removeFromCart"/>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";

export default {
  components: { CartItem },
  inject: ['cart', 'actions'],
  methods: {
    removeFromCart(item) {
      this.actions.removeFromCart(item);
    }
  }
}
</script>


