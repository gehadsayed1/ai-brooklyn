<template>
  <div>
   
    <div 
      v-if="isAppLoading" 
      class="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-6">
        <div class="relative">
          <div class="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-600"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white">
              <img src="./assets/logo1.png" alt="Logo" class="w-full">
            </div>
          </div>
        </div>
        
      
      </div>
    </div>
    <div v-show="!isAppLoading">
      <NaveBar />
      <router-view />
      <Footer v-if="showFooter" />
      <ChatBot />
      
    
      <ExpiryWarningPopup />
    
      <NoAccessNotification />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";
import ChatBot from "./components/ChatBot.vue";
import ExpiryWarningPopup from "./components/ExpiryWarningPopup.vue";
import NoAccessNotification from "./components/NoAccessNotification.vue";






const route = useRoute();
const isAppLoading = ref(true);

const showFooter = computed(() => {
  return route.path === "/" || route.path === "/service-details" ;
});

onMounted(() => {

  setTimeout(() => {
    isAppLoading.value = false;
  }, 1500);
});




</script>
