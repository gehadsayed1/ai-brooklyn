
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


const currentModule = computed(() =>
  modules.find((m) => m.slug === route.params.slug)
);
console.log(currentModule.value);
console.log(route.params);



const widgetId = computed(() => currentModule.value?.widgetId);
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

    <!-- <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">

    
      <h2 v-if="currentModule" class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        {{ t(currentModule.value.nameKey) }}
      </h2>

     
      <p v-if="currentModule" class="text-sm md:text-xl text-gray-700">
        {{ t(currentModule.value.descriptionKey) }}
      </p>

      <p v-else class="text-red-600">
         هذا الموديل غير موجود في النظام الخاص بك
      </p>

    </div> -->
  </div>
</template>
