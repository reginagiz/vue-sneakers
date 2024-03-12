<template>
  <div class="fixed top-0 left-0 h-full w-full z-10 bg-black/50">
    <div class="fixed bg-white w-[450px] h-full top-0 right-0 z-20 p-30">
      <div class="flex gap-20 mb-20">
        <button @click="handleCloseDrawer" class="border-none bg-none">
          <img class="opacity-30 cursor-pointer rotate-180 transition hover:opacity-100 hover:translate-x-1" src="/arrow-next.svg" alt="arrow"/>
        </button>
        <h2 class="text-2xl font-bold">Корзина</h2>
      </div>
      <div v-if="TotalPrice">
        <CartItemsList/>
        <div class="flex flex-col gap-10 my-20">
          <div class="flex gap-10">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed mb-5"></div>
            <b>{{TotalPrice}} ₽</b>
          </div>
          <div class="flex gap-10">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed mb-5"></div>
            <b>{{ TaxPrice }} ₽</b>
          </div>
          <button @click="createOrder" :disabled="!TotalPrice" class="mt-10 bg-lime w-full rounded-xl py-10 text-white disabled:bg-gray cursor-pointer">Оформить заказ</button>
        </div>
      </div>
      <div v-if="orderId" class="flex h-full items-center">
        <InfoBlock title="Заказ оформлен" description="Ваш заказ будет скоро передан курьерской доставке" image-url="/order-success-icon.png"/>
      </div>
      <div v-if="!TotalPrice && !orderId" class="flex h-full items-center">
        <InfoBlock title="Корзина пустая" description="Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ" image-url="/package-icon.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import CartItemsList from "@/components/CartItemsList.vue";
import InfoBlock from "@/components/InfoBlock.vue";
import {useCartStore} from "@/store/CartStore";
import {mapActions, mapState} from 'pinia';
import axios from "axios";

export default {
  components: {InfoBlock, CartItemsList},
  data(){
    return{
      isButtonDisabled:Boolean,
      order:[],
      orderId:null
    }
  },
  methods:{
    async createOrder() {
      try {

        const response = await axios.post('https://67ee0e5bcbd05745.mokky.dev/orders', {
          items: this.Cart,
          totalPrice: this.TotalPrice
        });

        this.order = response.data;
        this.orderId=this.order.id;

        await this.clearCart()

      } catch (error) {
        console.error(`Ошибка при оформлении заказа: ${error.message}`);
        throw error;
      }
    },
    handleCloseDrawer(){
      this.$emit("closeDrawer")
    },
    ...mapActions(useCartStore, ['clearCart']),
  },
  computed: {
    ...mapState(useCartStore, ['Cart','TotalPrice','TaxPrice']),
  },

}
</script>

<style scoped>

</style>