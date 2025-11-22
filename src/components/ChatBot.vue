
<script setup>
import { removeChat } from '../utils/removeChat';
import { useModuleStore } from '../stores/modules';
import { watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const moduleStore = useModuleStore();

let script = null;

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

const removeChat = () => {
  const el = document.getElementById("chat-widget");
  if (el) el.remove();

  if (window.getbutton) {
    try { window.getbutton.destroy(); } catch {}
    delete window.getbutton;
  }
};

watch(
  () => route.path,
  (path) => {
    // يظهر فقط داخل business-instructor
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
