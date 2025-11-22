

<script setup>


import { useRoute } from 'vue-router';
import { useModuleStore } from '../stores/modules';
import { watch, onUnmounted } from "vue";

const route = useRoute();
const moduleStore = useModuleStore();

let script = null;

// كامل وصحيح 100%
const removeChat = () => {
  const el = document.getElementById("chat-widget");
  if (el) el.remove();



  const btn = document.querySelector(".gb-widget-launcher");
  if (btn) btn.remove();

  const frame = document.querySelector("iframe[src*='getbutton']");
  if (frame) frame.remove();

  if (window.getbutton) {
    try { window.getbutton.destroy(); } catch {}
    delete window.getbutton;
  }
};

const loadChat = () => {
  removeChat();
  const widgetId = moduleStore.currentWidgetId;
  if (!widgetId) return;

  script = document.createElement("script");
  script.id = "chat-widget";
  script.src = `https://static.getbutton.io/widget/bundle.js?id=${widgetId}`;
  script.defer = true;
  document.body.appendChild(script);
};

watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/model/")) {
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
