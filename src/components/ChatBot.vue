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

    removeChat();

    if (newPath.startsWith("/model/")) {
      setTimeout(() => {
        loadChat();
      }, 800);
    }
  },
  { immediate: true }
);




onMounted(() => {
});

onUnmounted(() => {
  removeChat();
});
</script>