<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img :src="imageUrl" class="w-[150px] h-[150px]" alt="info_img"/>
    <h2 class="mt-4 text-2xl font-bold">{{title}}</h2>
    <p class="text-gray text-xl ">{{description}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title:"",
    imageUrl:"",
    description:""
  }
}
</script>

<style scoped>

</style>