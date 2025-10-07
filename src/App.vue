<template>
  <div>
    <!-- Global Loading Spinner -->
    <div 
      v-if="isAppLoading" 
      class="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-6">
        <!-- Logo or Brand -->
        <div class="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center">
       <img src="./assets/logo1.png" alt="Logo" class="w-full">
        </div>
        
        <!-- Spinner -->
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        
     
      </div>
    </div>

    <!-- Main App Content -->
    <div v-show="!isAppLoading">
      <NaveBar />
      <router-view />
      <Footer v-if="showFooter" />
      <ChatBot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";
import ChatBot from "./components/ChatBot.vue";

const route = useRoute();
const isAppLoading = ref(true);

const showFooter = computed(() => {
  return route.path === "/" || route.path === "/service-details" ;
});

onMounted(() => {
  // إخفاء الـ loading بعد تحميل الموقع بالكامل
  setTimeout(() => {
    isAppLoading.value = false;
  }, 1500); // 1.5 ثانية عشان الموقع يتحمل بالكامل
});
</script>
