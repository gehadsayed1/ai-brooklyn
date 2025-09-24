<template>
  <div>
    <NaveBar v-if="showLayout" />

    <router-view />

    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";

const route = useRoute();

const hiddenRoutes = ["/business-instructor"];

const showLayout = computed(() => !hiddenRoutes.includes(route.path));
</script>
