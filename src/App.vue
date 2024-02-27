<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-50">
    <Drawer v-if="isDrawerOpen" @closeDrawer="closeDrawer" :cart="cart"  :totalPrice="totalPrice" :taxPrice="taxPrice" @createOrder="createOrder" :isCreatingOrder="isCreatingOrder"/>
    <Header @openDrawer="openDrawer" :totalPrice="totalPrice"/>
    <div class="p-30">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";
import {computed} from "vue";
import axios from "axios";

export default {
  components: {Drawer, Header},
  data() {
    return {
      cart: [],
      orders: [],
      taxRate: 0.05,
      isDrawerOpen: false,
      isCreatingOrder: false,
    };
  },
  provide() {
    return {
      cart: computed(() => this.cart),
      actions: {
        addToCart: this.addToCart,
        removeFromCart: this.removeFromCart
      }
    }
  },
  methods: {
    async createOrder() {
      try {
        this.isCreatingOrder = true;
        const response = await axios.post('https://67ee0e5bcbd05745.mokky.dev/orders', {
          items: this.cart,
          totalPrice: this.totalPrice
        });
        this.orders = response.data;

        this.cart = [];
        this.sneakers = this.sneakers.map((sneaker) => ({
          ...sneaker,
          isAdded: false
        }));
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isCreatingOrder = false;
      }
    },
    addToCart(sneaker) {
      this.cart.push(sneaker);
      sneaker.isAdded = true;
    },
    removeFromCart(sneaker) {
      this.cart = this.cart.filter(item => item.id !== sneaker.id);
      sneaker.isAdded = false;
    },
    openDrawer() {
      this.isDrawerOpen = true;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
  },
  computed: {
    taxPrice() {
      return Math.round(this.totalPrice * this.taxRate);
    },
    totalPrice() {
      return this.cart.reduce((acc, sneaker) => acc + sneaker.price, 0);
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true
    }
  },
  mounted() {
    const localCart = localStorage.getItem('cart');
    if (localCart && typeof localCart === 'string') {
      this.cart = JSON.parse(localCart);
    } else {
      this.cart = [];
    }
  }
}
</script>



