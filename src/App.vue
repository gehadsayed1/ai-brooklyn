<template>
  <div>
    <NaveBar />

    <router-view />

    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";

const route = useRoute();

const showFooter = computed(() => {
 
  if (route.path === "/") return true;

  
  if (route.path === "/service-details") {
    return true;
  }

  return false;
});
</script>
