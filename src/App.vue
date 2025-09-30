<template>
  <div>
    <NaveBar />

    <router-view />

    <Footer />
  </div>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";
</script>
