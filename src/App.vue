<template>
  <div>
    <NaveBar />
    <router-view />
    <Footer v-if="showFooter" />

    <!-- Dynamic ChatBot -->
    <ChatBot />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";
import ChatBot from "./components/ChatBot.vue";

const route = useRoute();

const showFooter = computed(() => {
  return route.path === "/" || route.path === "/service-details";
});
</script>
