<template>
  <div v-if="visible"></div>
</template>
<script setup>

import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useModuleStore } from "../stores/modules";

const route = useRoute();
const moduleStore = useModuleStore();

const visible = ref(false);
let script;

const loadChat = () => {
  removeChat();

  setTimeout(() => {
    const existingScript = document.getElementById("chat-widget");
    if (existingScript) {
      existingScript.remove();
    }

    script = document.createElement("script");


    const widgetId = moduleStore.currentWidgetId;
    script.src = `https://static.getbutton.io/widget/bundle.js?id=${widgetId}`;

    script.defer = true;
    script.id = "chat-widget";
    script.onload = () => {
      console.log("Chat widget loaded successfully");
    };
    document.body.appendChild(script);
  }, 300);
};

const removeChat = () => {
  console.log("Removing chat widget...");

  const s = document.getElementById("chat-widget");
  if (s && s.parentNode) {
    s.parentNode.removeChild(s);
  }

  const widgets = document.querySelectorAll(
    "[class*='gb-'], [id*='gb-'], .gb-widget, .gb-widget-launcher, .gb-widget-content, [class*='getbutton'], [data-testid*='gb-']"
  );
  widgets.forEach((el) => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  const styles = document.querySelectorAll(
    "style[data-emotion], link[href*='getbutton'], style[id*='gb-']"
  );
  styles.forEach((el) => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  if (window.getbutton) {
    try {
      window.getbutton.destroy();
    } catch (e) {
      console.log("getbutton destroy failed:", e);
    }
  }

  if (window.getbutton) {
    delete window.getbutton;
  }
};

watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log("Route changed from", oldPath, "to", newPath);

    if (newPath === "/business-instructor") {
      visible.value = true;

      removeChat();

      setTimeout(() => {
        loadChat();
      }, 500);
    } else {
      visible.value = false;
      removeChat();
    }
  },
  { immediate: true }
);

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromModels = urlParams.get("from") === "models";

  if (fromModels) {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
});

onUnmounted(() => {
  removeChat();
});
</script>
