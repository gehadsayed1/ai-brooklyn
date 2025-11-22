<template>
  <div v-if="visible"></div>
</template>
<script setup>
import { useModuleStore } from '../stores/modules';
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

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

export const removeChat = () => {
  console.log("🔥 Removing chat widget...");

  // 1 — Remove main script
  const script = document.getElementById("chat-widget");
  if (script) script.remove();

  // 2 — Remove all widget DOM elements completely
  const widgetSelectors = [
    ".gb-widget",
    ".gb-widget-launcher",
    ".gb-widget-content",
    "[class*='gb-']",
    "[id*='gb-']",
    "[data-testid*='gb-']",
    "[class*='getbutton']",
    "iframe[src*='getbutton']",
    "iframe.gb-frame"
  ];

  document.querySelectorAll(widgetSelectors.join(",")).forEach(el => {
    el.remove();
  });

  // 3 — Remove all styles injected by GetButton
  const styleSelectors = [
    "style[data-emotion]",
    "style[id*='gb-']",
    "link[href*='getbutton']"
  ];

  document.querySelectorAll(styleSelectors.join(",")).forEach(el => {
    el.remove();
  });

  // 4 — Try to destroy existing instance
  if (window.getbutton) {
    try {
      window.getbutton.destroy();
    } catch (e) {
      console.warn("⚠ getbutton.destroy failed:", e);
    }
  }

  // 5 — Remove all global references
  try { delete window.getbutton; } catch {}
  try { window.getbutton = undefined; } catch {}
  try { window.gbHashId = undefined; } catch {}

  // 6 — Deep cleanup: remove anything smells like getbutton
  Object.keys(window).forEach((key) => {
    if (key.toLowerCase().includes("getbutton")) {
      try { delete window[key]; } catch {}
    }
  });

  console.log("🧹 Chat widget fully removed.");
};


watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log("Route changed from", oldPath, "to", newPath);

    // لازم نشيل الشات الأول
    removeChat();

    if (newPath.startsWith("/model/")) {
      // نديله وقت بسيط 200-300ms عشان الـ DOM يستقر
      setTimeout(() => {
        loadChat();
      }, 250);
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