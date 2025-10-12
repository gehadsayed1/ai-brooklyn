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
      
      <!-- رسالة مخصصة لو معندوش access -->
      <transition name="slide-fade">
        <div v-if="showNoAccessMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-start gap-2">
            <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
            <div class="flex-1 text-sm">
              <p class="text-red-700 font-semibold mb-2">{{ t('login.noAccess.title') }}</p>
              <p class="text-red-600 mb-3">{{ t('login.noAccess.message') }}</p>
              <a 
                href="https://wa.me/971567844965" 
                target="_blank"
                class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
              >
                <i class="fab fa-whatsapp text-lg"></i>
                <span>+971 567844965</span>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>




<script setup>
import { X } from "lucide-vue-next";
import { ref, watch, onUnmounted } from 'vue';
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

const showNoAccessMessage = ref(false);
let hideTimeout = null;

// مراقبة الـ error علشان نعرض الرسالة
watch(() => loginWithGoogleStore.error, (newError) => {
  if (newError === 'NO_ACCESS') {
    showNoAccessMessage.value = true;
    
    // إخفاء الرسالة بعد 8 ثواني
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      showNoAccessMessage.value = false;
      loginWithGoogleStore.error = null; // مسح الـ error
    }, 8000);
  } else if (!newError) {
    // إذا تم مسح الـ error، نخفي الرسالة فوراً
    showNoAccessMessage.value = false;
    if (hideTimeout) clearTimeout(hideTimeout);
  }
});


onUnmounted(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
  showNoAccessMessage.value = false;
});

const loginWithGoogle = () => {
  // مسح الرسالة والـ error قبل المحاولة الجديدة
  showNoAccessMessage.value = false;
  if (hideTimeout) clearTimeout(hideTimeout);
  
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

/* Animation للرسالة */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-5px);
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
