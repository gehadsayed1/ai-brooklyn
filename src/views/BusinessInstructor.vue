<script setup >
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { onMounted } from 'vue';

const router = useRouter();

const goBackToModels = () => {
  router.push('/models');
};

// إعادة تحميل الصفحة لضمان ظهور الـ ChatBot
onMounted(() => {
  // التحقق من وجود معامل في URL يشير إلى العودة من Models
  const urlParams = new URLSearchParams(window.location.search);
  const fromModels = urlParams.get('from') === 'models';
  
  if (fromModels) {
    // إزالة المعامل من URL
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
    
    // إعادة تحميل الصفحة لضمان ظهور الـ ChatBot
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
});
</script>

<template>
  <div class="w-full h-[80vh] flex flex-col">
    
    <div class="p-4">
      <button 
        @click="goBackToModels"
        class="flex cursor-pointer  items-center gap-2 text-primary hover:text-blue-700 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>{{ $t('models.useModule') }}</span>
      </button>
    </div>
    
    <!-- Content -->
    <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        {{ $t('businessInstructor.title') }}
      </h2>
      <p class="text-sm md:text-xl text-gray-700">
        {{ $t('businessInstructor.subtitle') }}<br />
        {{ $t('businessInstructor.instruction') }}
      </p>
    </div>
  </div>
</template>

