<template>
  <div v-if="visible"></div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useChatBot } from '../composables/useChatBot';

const route = useRoute();
const { removeChat, loadChat } = useChatBot();

const visible = ref(false);


watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log("Route changed from", oldPath, "to", newPath);

    // لازم نشيل الشات الأول
    removeChat();

    if (newPath.startsWith("/model/")) {
      // نديله وقت أطول (800ms) عشان الـ cleanup يكتمل بشكل كامل
      setTimeout(() => {
        loadChat();
      }, 800);
    }
  },
  { immediate: true }
);




onMounted(() => {
  // الـ chatbot هيتحمل تلقائياً من خلال الـ watch
});

onUnmounted(() => {
  removeChat();
});
</script>