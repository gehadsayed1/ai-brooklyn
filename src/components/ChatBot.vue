
<script setup>

import { useRoute } from 'vue-router';
import { modules } from '../data/modules';
import { watch, onMounted, onUnmounted, computed } from "vue";

const route = useRoute();
let script;

const currentModule = computed(() =>
  modules.find((m) => m.slug === route.params.slug)
);

const widgetId = computed(() => currentModule.value?.widgetId);

const removeChat = () => {
  const el = document.getElementById("chat-widget");
  if (el) el.remove();

  const btn = document.querySelector(".gb-widget-launcher");
  if (btn) btn.remove();

  if (window.getbutton) {
    try { window.getbutton.destroy(); } catch {}
    delete window.getbutton;
  }
};

const loadChat = () => {
  removeChat();
  const id = widgetId.value;
  if (!id) return;

  script = document.createElement("script");
  script.id = "chat-widget";
  script.src = `https://static.getbutton.io/widget/bundle.js?id=${id}`;
  script.defer = true;
  document.body.appendChild(script);
};

watch(
  () => route.path,
  () => {
    if (route.path.startsWith("/model/")) {
      loadChat();
    } else {
      removeChat();
    }
  },
  { immediate: true }
);

onUnmounted(removeChat);
</script>

<template>
  <div></div>
</template>
