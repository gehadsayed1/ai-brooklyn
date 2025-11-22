<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const goBackToModels = () => {
  router.push('/models');
};

// الديناميكيين اللي جايين من صفحة الموديلز
const title = computed(() => t(route.query.name));
const description = computed(() => t(route.query.desc));

// دا اللي هيستخدمه ChatBot.vue
const widgetId = computed(() => route.query.chat);

</script>

<template>
  <div class="w-full h-[80vh] flex flex-col relative">
    
    <div class="p-4">
      <button 
        @click="goBackToModels"
        class="flex cursor-pointer items-center gap-2 text-primary hover:text-blue-700 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>{{ $t('models.useModule') }}</span>
      </button>
    </div>
    
    <!-- Content -->
    <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        {{ title }}
      </h2>

      <p class="text-sm md:text-xl text-gray-700">
        {{ description }}<br />
      </p>
    </div>
  </div>
</template>
