<script setup>

import { removeChat } from '../utils/removeChat';
import { modules } from "../data/modules";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const handleBack = () => {
  removeChat();
  router.push("/models");
};


// const currentModule = computed(() =>
//   modules.find((m) => m.slug === route.params.slug)
// );


// const widgetId = computed(() => currentModule.value?.widgetId);
</script>

<template>
  <div class="w-full h-[80vh] flex flex-col relative">
    <div class="p-4">
      <button 
        @click="handleBack"
        class="flex cursor-pointer items-center gap-2 text-primary hover:text-blue-700 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>{{ $t("models.useModule") }}</span>
      </button>
    </div>
<h1>model page</h1>
    <!-- <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">

      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        <p>slug: {{ route.params.slug }}</p>
        <p>found: {{ currentModule }}</p>

        <div v-if="currentModule">
          {{ t(currentModule.value.nameKey) }}
        </div>
      </h2>

      <p class="text-sm md:text-xl text-gray-700" v-if="currentModule">
        {{ t(currentModule.value.descriptionKey) }}
      </p>

      <p v-else class="text-red-600">❌ هذا الموديل غير موجود — slug غير مطابق</p>
    </div> -->
  </div>
</template>
