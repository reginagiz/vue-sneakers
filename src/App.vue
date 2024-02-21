<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-50">
    <Drawer :cart="cart" v-if="isDrawerOpen" @closeDrawer="closeDrawer" :removeFromCart="removeFromCart" :totalPrice="totalPrice" :taxPrice="taxPrice" @createOrder="createOrder" :isCreatingOrder="isCreatingOrder" />
    <Header @openDrawer="openDrawer" :totalPrice="totalPrice"/>
    <div class="p-30">
      <Home @sneakers-fetched="handleSneakersFetched" :removeFromCart="removeFromCart" :addToCart="addToCart" @update-cart="updateCart"/>
    </div>
  </div>
</template>

<script>
import Home from "@/pages/Home.vue";
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";

export default {
  components: {Drawer, Header, Home},
  data() {
    return {
      cart: [],
      orders: [],
      taxRate: 0.05,
      isDrawerOpen: false,
      isCreatingOrder: false,
      sneakers: []
    };
  },
  methods: {
    async handleSneakersFetched(sneakers) {
      this.sneakers = sneakers;
    },
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
      console.log(sneaker,'add')
    },
    removeFromCart(sneaker) {
      this.cart.splice(this.cart.indexOf(sneaker), 1);
      sneaker.isAdded = false;
      console.log(sneaker,'remove')
    },
    openDrawer() {
      this.isDrawerOpen = true;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    updateCart(newCart) {
      this.cart = newCart;
    }
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
  }
}
</script>
