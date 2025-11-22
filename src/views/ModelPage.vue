<script setup>
import { modules } from "../data/modules";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();


import { useRouter } from 'vue-router';
import { removeChat } from '../utils/removeChat'; // هنضيفه دلوقتي

const router = useRouter();

const handleBack = () => {
  // 1 — احذف الشات يدويًا
  removeChat();

  // 2 — ارجع لصفحة الموديلز
  router.push('/models');
};

const currentModule = computed(() => {
  return modules.find((m) => m.slug === route.params.slug);
});

const goBackToModels = () => {
  router.push("/models");
};


const widgetId = computed(() => currentModule.value?.widgetId);
</script>

<template>
  <div class="w-full h-[80vh] flex flex-col relative">
    <div class="p-4">
      <button 
  @click="handleBack"
  class="flex cursor-pointer items-center gap-2 text-primary hover:text-blue-700 transition-colors"
>

        class="flex cursor-pointer items-center gap-2 text-primary hover:text-blue-700 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>{{ $t("models.useModule") }}</span>
      </button>
    </div>

    <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        <!-- {{ t(currentModule.value.nameKey) }} -->
        <p>slug: {{ route.params.slug }}</p>
<p>found: {{ currentModule }}</p>

      </h2>

      <p class="text-sm md:text-xl text-gray-700">
        <!-- {{ t(currentModule.value.descriptionKey) }} -->
      </p>
    </div>
  </div>
</template>
