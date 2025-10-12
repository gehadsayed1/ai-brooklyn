<template>
  <transition name="fade">
    <div v-if="isOpen" class="popup bg-white rounded-xl shadow-lg p-10 w-96 relative">
      <button @click="$emit('close')" class="close-btn absolute p-1 bg-red-300 -top-3 -right-2 text-gray-600 hover:text-red-600">
        <X class="w-5 h-5" />
      </button>
      
      <img src="../assets/logo1.png" alt="Logo" class="w-56 mx-auto mb-4" />
      
      <button
        @click="loginWithGoogle"
        class="google-login-btn flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="w-6 h-6" />
        <span v-if="!loginWithGoogleStore.loading">{{ t('nav.continueWithGoogle') }}</span>
        <span v-else class="loader border-4 border-t-4 border-primary border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
      </button>
    </div>
  </transition>
</template>




<script setup>
import { X } from "lucide-vue-next";
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loginWithGoogleStore = useLoginWithGoogleStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const loginWithGoogle = () => {
  loginWithGoogleStore.loginWithGoogle();
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.google-login-btn {
  font-weight: 600;
  font-size: 1rem;
  color: #202124;
}
.close-btn {
  cursor: pointer;
  border-radius: 50%;
}
</style>
