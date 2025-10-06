<script setup >
import { onMounted, onUnmounted } from 'vue';

// منع زر الباك من الرجوع للصفحة الرئيسية
onMounted(() => {
  window.history.pushState(null, '', window.location.href);
  
  const preventBack = () => {
    window.history.pushState(null, '', window.location.href);
  };
  
  window.addEventListener('popstate', preventBack);
  
  onUnmounted(() => {
    window.removeEventListener('popstate', preventBack);
  });
});
</script>

<template>
  <div class="w-full h-[80vh] flex flex-col">
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

