<template>
  <div class="flex flex-col gap-10" v-auto-animate>
    <CartItem :item="item" v-for="item in Cart" :key="item.id" @removeFromCart="removeItemFromCart"/>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import {useCartStore} from "@/store/CartStore";
import {mapActions, mapState} from 'pinia';

export default {
  components: {CartItem},
  methods: {
    ...mapActions(useCartStore, ['addToCart']),

    removeItemFromCart(item) {
      this.addToCart(item);
    },
  },
  computed: {
    ...mapState(useCartStore, ['Cart']),
  },
}
</script>
