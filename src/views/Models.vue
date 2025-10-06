<template>
  <div class="min-h-screen bg-white flex flex-col items-center p-8">
    <!-- Welcome Section -->
    <header class="text-center mt-12 max-w-2xl">
      <h1 class="text-3xl font-extrabold text-primary mb-2">{{ $t('models.title') }}</h1>
      <p class="text-gray-600 text-lg">{{ $t('models.subtitle') }}</p>
    </header>

    <!-- Search Bar -->
    <div class="w-full max-w-2xl mt-8 relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('models.searchPlaceholder')"
        class="w-full  px-12 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-lg"
      />
      <Search  class="w-6 h-6 absolute right-4 top-4  text-primary"/>
    </div>

    <!-- Modules Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl w-full">
      <div
        v-for="module in filteredModules"
        :key="module.name"
        class="bg-gray-50 border h-70 border-gray-300 rounded-3xl flex flex-col justify-between shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer group relative"
       
        role="button"
        tabindex="0"
      >
        <div class="flex items-center space-x-5">
          <div class="p-4 bg-primary/20 rounded-full text-primary">
            <component :is="module.icon" class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {{ module.name }}
          </h2>
        </div>
        <p class="text-gray-600 mt-4 leading-relaxed">{{ module.description }}</p>
        <button
          class="mt-6 w-full bg-primary text-white cursor-pointer py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          @click="goToModule(module.route)"
        >
          {{ $t('models.useModule') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { User, BookOpenCheck, FileText, Search } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";


const searchQuery = ref("");
const router = useRouter();
const { t } = useI18n();

// منع زر الباك من الرجوع للصفحة الرئيسية
onMounted(() => {
  // إضافة حالة جديدة في history لمنع الرجوع
  window.history.pushState(null, '', window.location.href);
  
  const preventBack = (e) => {
    window.history.pushState(null, '', window.location.href);
  };
  
  window.addEventListener('popstate', preventBack);
  
  // حفظ الدالة للإزالة لاحقاً
  onUnmounted(() => {
    window.removeEventListener('popstate', preventBack);
  });
});

const modules = computed(() => [
  // {
  //   name: t('models.modules.students.name'),
  //   description: t('models.modules.students.description'),
  //   icon: User,
  //   route: "/students",
  // },
  // {
  //   name: t('models.modules.exams.name'),
  //   description: t('models.modules.exams.description'),
  //   icon: BookOpenCheck,
  //   route: "/exams",
  // },
  {
    name: t('models.modules.businessInstructor.name'),
    description: t('models.modules.businessInstructor.description'),
    icon: FileText,
    route: "/business-instructor",
  },
]);

const filteredModules = computed(() =>
  modules.value.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function goToModule(route) {
  console.log("Navigate to:", route);
  
  // إذا كان الانتقال إلى BusinessInstructor، أضف معامل للتحقق من العودة
  if (route === "/business-instructor") {
    router.push(`${route}?from=models`);
  } else {
    router.push(route);
  }
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
