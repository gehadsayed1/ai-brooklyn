<template>
  <div>
    <NaveBar v-if="showLayout" />

    <div v-if="loading" class="flex items-center justify-center min-h-[100vh]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-8 border-primary border-solid"
      ></div>
    </div>

    <router-view v-else />
    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import NaveBar from "./components/NaveBar.vue";

const route = useRoute();
const loading = ref(true);

const hiddenRoutes = ["/business-instructor"];

const showLayout = computed(
  () => !hiddenRoutes.some((r) => route.path.startsWith(r))
);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});
</script>
