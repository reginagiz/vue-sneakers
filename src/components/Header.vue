<template>
  <header class="flex justify-between border-b border-gray px-30 py-20">
   <router-link to="/">
     <div class="flex items-center gap-15">
       <img src="/logo.png" alt="logo" class="w-40"/>
       <div>
         <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
         <p class="text-gray">Магазин лучших кроссовок</p>
       </div>
     </div>
   </router-link>

    <div class="flex items-center gap-20">

      <button @click="handleOpenDrawer" class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
        <img src="/cart.svg" alt="cart"/>
        <b>{{TotalPrice}}</b>
      </button>

      <router-link to="/favorites">
        <button class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
          <img src="/heart.svg" alt="heart"/>
          <span>Закладки</span>
        </button>
      </router-link>

      <button class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
        <img src="/profile.svg" alt="profile"/>
        <span>Профиль</span>
      </button>

    </div>
  </header>
</template>

<script>
import { mapState} from "pinia";
import {useCartStore} from "@/store/CartStore";

export default {
  methods:{
    handleOpenDrawer(){
      this.$emit("openDrawer")
    },
  },
  computed: {
    ...mapState(useCartStore, ['TotalPrice']),
  },

};
</script>

<style scoped>

</style>