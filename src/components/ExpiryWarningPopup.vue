<template>
  <div 
    v-if="showWarning" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4"
    @click.self="closePopup"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
      <!-- Icon -->
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-center text-gray-800 mb-2">
        {{ $t('expiryWarning.title') }}
      </h3>

      <!-- Message -->
      <div class="text-center mb-6">
        <p class="text-gray-600 mb-2">
          {{ $t('expiryWarning.message') }} <span class="font-bold text-red-600">{{ daysRemaining }}</span> 
          {{ daysRemaining === 1 ? $t('expiryWarning.day') : $t('expiryWarning.days') }}
        </p>
        <p class="text-sm text-gray-500">
          {{ $t('expiryWarning.expiryDate') }} <span class="font-semibold">{{ formattedExpiryDate }}</span>
        </p>
        <p class="text-gray-700 mt-3">
          {{ $t('expiryWarning.pleaseRenew') }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3">
        <button
          @click="renewSubscription"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {{ $t('expiryWarning.renewButton') }}
        </button>
        <button
          @click="closePopup"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {{ $t('expiryWarning.laterButton') }}
        </button>
      </div>

      <!-- Don't show again -->
      <div class="mt-4 text-center">
        <label class="inline-flex items-center cursor-pointer text-sm text-gray-600">
          <input 
            type="checkbox" 
            v-model="dontShowAgain" 
            class="mr-2 rounded"
          >
          <span>{{ $t('expiryWarning.dontShowAgain') }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useLoginWithGoogleStore } from '../stores/LoginWithGoogle';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const loginStore = useLoginWithGoogleStore();
const router = useRouter();

const showWarning = ref(false);
const dontShowAgain = ref(false);

const accessInfo = computed(() => loginStore.checkAccessExpiry());

const daysRemaining = computed(() => {
  return accessInfo.value?.daysRemaining || 0;
});

const formattedExpiryDate = computed(() => {
  if (!accessInfo.value?.expiryDate) return '';
  const date = new Date(accessInfo.value.expiryDate);
  const localeCode = locale.value === 'ar' ? 'ar-EG' : 'en-US';
  return date.toLocaleDateString(localeCode, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

const checkAndShowWarning = () => {
  // التحقق من عدم إظهار التنبيه مرة أخرى
  const hideWarning = localStorage.getItem('hideExpiryWarning');
  if (hideWarning === 'true') {
    return;
  }

  // التحقق من آخر مرة تم إظهار التنبيه فيها
  const lastShown = localStorage.getItem('lastExpiryWarningShown');
  const now = new Date().getTime();
  
  // إظهار التنبيه مرة واحدة كل 24 ساعة
  if (lastShown && (now - parseInt(lastShown)) < 24 * 60 * 60 * 1000) {
    return;
  }

  if (accessInfo.value?.isExpiringSoon && !accessInfo.value?.isExpired) {
    showWarning.value = true;
    localStorage.setItem('lastExpiryWarningShown', now.toString());
  }
};

const closePopup = () => {
  showWarning.value = false;
  
  if (dontShowAgain.value) {
    localStorage.setItem('hideExpiryWarning', 'true');
  }
};

const renewSubscription = () => {
  // يمكنك توجيه المستخدم لصفحة التجديد أو فتح رابط خارجي
  closePopup();
  // مثال: router.push('/subscription');
  // أو فتح رابط خارجي
  window.open('https://your-subscription-page.com', '_blank');
};

onMounted(() => {
  // الانتظار قليلاً قبل التحقق (بعد تحميل بيانات المستخدم)
  setTimeout(() => {
    checkAndShowWarning();
  }, 2000);
});

// مراقبة تغيرات في بيانات المستخدم
watch(() => loginStore.user, () => {
  if (loginStore.user) {
    checkAndShowWarning();
  }
}, { deep: true });
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
