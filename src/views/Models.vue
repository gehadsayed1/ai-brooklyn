<template>
  <div class="min-h-screen bg-white flex flex-col items-center p-8">
    <!-- Welcome Section -->
    <header class="text-center mt-4 max-w-2xl">
      <h1 class="text-5xl font-extrabold text-primary mb-2">
        {{ $t("models.title") }}
      </h1>
      <p class="text-gray-600 text-lg">{{ $t("models.subtitle") }}</p>
    </header>

    <!-- Search Bar -->
    <div class="w-full max-w-2xl mt-8 relative">
      <input v-model="searchQuery" type="text" :placeholder="$t('models.searchPlaceholder')"
        class="w-full px-12 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-lg" />
      <Search class="w-6 h-6 absolute right-4 top-4 text-primary" />
    </div>
    <section class="grid gap-6 mt-10 w-full 
         grid-cols-1 
         sm:grid-cols-2 
         md:grid-cols-3 
         lg:grid-cols-4
         max-w-[1300px]">
      <div v-for="module in filteredModules" :key="module.name" class="bg-gray-50 border border-gray-300 rounded-3xl h-full 
           flex flex-col justify-between shadow-md p-6 
           hover:shadow-lg transition-shadow cursor-pointer group" role="button" tabindex="0">
        <div class="flex items-center space-x-4">
          <div class="p-4 bg-primary/20 rounded-full text-primary">
            <component :is="module.icon" class="w-8 h-8" />
          </div>
          <h2 class="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {{ t(module.nameKey) }}
          </h2>
        </div>

        <p class="text-gray-600 mt-4 text-sm leading-relaxed">
          {{ t(module.descriptionKey) }}
        </p>

        <button
          class="mt-6 w-full bg-primary text-white cursor-pointer py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          @click="goToModule(module)">
          {{ t("models.useModule") }}
        </button>
      </div>
    </section>

  </div>
</template>
<script setup>import { computed, onMounted, onUnmounted, ref } from 'vue';;
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { modules } from "../data/modules";
import { useModuleStore } from "../stores/modules";

const router = useRouter();
const { t } = useI18n();
const moduleStore = useModuleStore();

const searchQuery = ref("");

const filteredModules = computed(() =>
  modules.filter((m) =>
    t(m.nameKey).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(() => {
  // بنضيف نقطة ثابتة جديدة في الهستوري
  window.history.pushState(null, "", window.location.href);

  // لو حاول يرجع → نرجّعه تاني لنفس الصفحة
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };
});

onUnmounted(() => {
  // نرجع الباك لطبيعته لو خرج من الصفحة
  window.onpopstate = null;
});


function goToModule(mod) {
  console.log(mod);
  
  moduleStore.setWidgetId(mod.widgetId);

router.push(`/model/${mod.slug}`)

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
