<template>
  <header class="flex justify-between border-b border-gray px-30 py-20">
    <div class="flex items-center gap-15">
      <img src="/logo.png" alt="logo" class="w-40"/>
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-gray">Магазин лучших кроссовок</p>
      </div>
    </div>

    <div class="flex items-center gap-20">

      <button @click="handleOpenDrawer" class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
        <img src="/cart.svg" alt="cart"/>
        <b>{{totalPrice}}</b>
      </button>

      <button class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
        <img src="/heart.svg" alt="heart"/>
        <span>Закладки</span>
      </button>

      <button class="flex items-center gap-10 text-gray cursor-pointer border-none bg-none hover:text-black">
        <img src="/profile.svg" alt="profile"/>
        <span>Профиль</span>
      </button>

    </div>
  </header>
</template>

<script>
export default {
  props:{
    totalPrice:{
      type:Number,
      required:true
    }
  },
  methods:{
    handleOpenDrawer(){
      this.$emit("openDrawer")
    }
  }
};
</script>

<style lang="scss" scoped>

</style>