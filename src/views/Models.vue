<template>
  <div class="min-h-screen bg-white flex flex-col items-center px-4 py-6 md:p-8">
    <!-- Welcome Section -->
    <header class="text-center mt-2 md:mt-4 max-w-2xl w-full">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-2 px-2">
        {{ $t("models.title") }}
      </h1>
      <p class="text-gray-600 text-sm sm:text-base md:text-lg px-2">{{ $t("models.subtitle") }}</p>
    </header>

    <!-- Search Bar -->
    <div class="w-full max-w-2xl mt-4 md:mt-8 relative">
      <input v-model="searchQuery" type="text" :placeholder="$t('models.searchPlaceholder')"
        class="w-full px-10 md:px-12 py-2.5 md:py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-base md:text-lg rtl:pl-10 rtl:pr-10 ltr:pr-10 ltr:pl-10" />
      <Search
        class="w-5 h-5 md:w-6 md:h-6 absolute top-1/2 transform -translate-y-1/2 rtl:right-4 ltr:left-4 text-primary" />
    </div>
    <section class="grid gap-4 md:gap-6 mt-6 md:mt-10 w-full 
         grid-cols-1 
         sm:grid-cols-2 
         md:grid-cols-3 
         lg:grid-cols-4
         max-w-[1300px]">
      <div v-for="module in filteredModules" :key="module.name" class="bg-gray-50 border border-gray-300 rounded-2xl md:rounded-3xl h-full 
           flex flex-col justify-between shadow-md p-4 md:p-6 
           hover:shadow-lg transition-shadow cursor-pointer group" role="button" tabindex="0">
        <div class="flex items-center gap-3 md:space-x-4">
          <div class="p-3 md:p-4 bg-primary/20 rounded-full text-primary flex-shrink-0">
            <component :is="module.icon" class="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h2
            class="text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {{ t(module.nameKey) }}
          </h2>
        </div>

        <p class="text-gray-600 mt-3 md:mt-4 text-xs md:text-sm leading-relaxed line-clamp-3">
          {{ t(module.descriptionKey) }}
        </p>

        <button
          class="mt-4 md:mt-6 w-full bg-primary text-white cursor-pointer py-2.5 md:py-3 rounded-lg font-medium hover:bg-primary/90 transition text-sm md:text-base"
          @click="goToModule(module)">
          {{ t("models.useModule") }}
        </button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useModuleStore } from '../stores/modules';
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { modules } from "../data/modules";;

const router = useRouter();
const { t } = useI18n();
const moduleStore = useModuleStore();

const searchQuery = ref("");

const filteredModules = computed(() =>
  modules.filter((m) =>
    t(m.nameKey).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function goToModule(mod) {
  moduleStore.setWidgetId(mod.widgetId);
  router.push(`/model/${mod.slug}`);
}
</script>

<style>
:root {
  --tw-color-primary: #002d62;
}

.bg-primary {
  background-color: var(--tw-color-primary);
}

.text-primary {
  color: var(--tw-color-primary);
}

.bg-primary\/20 {
  background-color: rgb(0 45 98 / 0.2);
}

.hover\:bg-primary\/90:hover {
  background-color: rgb(0 45 98 / 0.9);
}

.focus\:ring-primary:focus {
  --tw-ring-color: #002d62;
}

.focus\:border-primary:focus {
  border-color: #002d62;
}
</style>