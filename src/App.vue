<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-50">
    <Drawer v-if="isDrawerOpen" @closeDrawer="closeDrawer" />
    <Header @openDrawer="openDrawer"/>
    <div class="p-30">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import Header from "@/components/Header.vue";

export default {
  components: {Drawer, Header},
  data() {
    return {
      isDrawerOpen: false,
      isCreatingOrder: false,
    };
  },
  methods: {
    openDrawer() {
      this.isDrawerOpen = true;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
  }
}
</script>





