<template>
  <!-- Notification في أعلى الصفحة -->
  <transition name="slide-down">
    <div 
      v-if="showNoAccessMessage" 
      class="fixed top-20 z-[9999] ltr:right-4 rtl:left-4 max-w-md w-full mx-4 md:mx-0"
    >
      <div class="bg-white rounded-xl shadow-2xl border-l-4 border-red-500 p-4">
        <div class="flex items-start gap-3">
          <!-- Close Button -->
          <button 
            @click="closeNotification"
            class="absolute top-2 ltr:right-2 rtl:left-2 text-gray-400 hover:text-gray-600 transition"
          >
            <i class="fas fa-times"></i>
          </button>
          
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <i class="fas fa-exclamation-circle text-red-500 text-xl"></i>
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 pt-1">
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ t('login.noAccess.title') }}
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              {{ t('login.noAccess.message') }}
            </p>
            
            <!-- WhatsApp Button -->
            <a 
              href="https://wa.me/971567844965" 
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition shadow-md hover:shadow-lg"
            >
              <i class="fab fa-whatsapp text-lg"></i>
              <span>+971 567844965</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue';
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loginWithGoogleStore = useLoginWithGoogleStore();

const showNoAccessMessage = ref(false);
let hideTimeout = null;

// فحص sessionStorage عند تحميل الـ component
onMounted(() => {
  const shouldShowNoAccess = sessionStorage.getItem('show_no_access');
  
  if (shouldShowNoAccess === 'true') {
    console.log('🔴 Found NO_ACCESS flag in sessionStorage, showing notification');
    
    // مسح الـ flag من sessionStorage
    sessionStorage.removeItem('show_no_access');
    
    // عرض الرسالة
    showNoAccessMessage.value = true;
    
    // إخفاء الرسالة بعد 10 ثواني
    hideTimeout = setTimeout(() => {
      showNoAccessMessage.value = false;
      sessionStorage.removeItem('show_no_access');
    }, 10000);
  }
});

// مراقبة الـ error علشان نعرض الرسالة
watch(() => loginWithGoogleStore.error, (newError) => {
  if (newError === 'NO_ACCESS') {
    showNoAccessMessage.value = true;
    
    // إخفاء الرسالة بعد 10 ثواني
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      showNoAccessMessage.value = false;
      sessionStorage.removeItem('show_no_access');
      loginWithGoogleStore.error = null;
    }, 10000);
  }
}, { immediate: true });

// دالة لإغلاق الرسالة يدوياً
const closeNotification = () => {
  showNoAccessMessage.value = false;
  if (hideTimeout) clearTimeout(hideTimeout);
  sessionStorage.removeItem('show_no_access'); // مسح من sessionStorage
  loginWithGoogleStore.error = null;
};

// مسح الـ timeout لما الـ component يتحذف
onUnmounted(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
});
</script>

<style scoped>
/* Animation للرسالة */
.slide-down-enter-active {
  transition: all 0.5s ease-out;
}
.slide-down-leave-active {
  transition: all 0.4s ease-in;
}
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

