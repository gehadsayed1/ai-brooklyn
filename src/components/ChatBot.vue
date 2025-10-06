<template>
  <div v-if="visible"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const visible = ref(false);
let script;

const loadChat = () => {
  if (!document.getElementById("chat-widget")) {
    script = document.createElement("script");
    script.src = "https://static.getbutton.io/widget/bundle.js?id=hiUvw"; 
    script.defer = true;
    script.id = "chat-widget";
    document.body.appendChild(script);
  }
};

const removeChat = () => {
  // إزالة الـ script
  const s = document.getElementById("chat-widget");
  if (s && s.parentNode) s.parentNode.removeChild(s);

  // إزالة جميع عناصر الـ widget
  document.querySelectorAll("[class*='gb-'], [id*='gb-'], .gb-widget, .gb-widget-launcher, .gb-widget-content, [class*='getbutton']")
    .forEach(el => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

  // إزالة أي styles مضافة
  const styles = document.querySelectorAll('style[data-emotion], link[href*="getbutton"]');
  styles.forEach(el => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/business-instructor") {
      visible.value = true;
      loadChat();
    } else {
      visible.value = false;
      removeChat();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (route.path === "/business-instructor") {
    visible.value = true;
    loadChat();
  }
});

onUnmounted(() => {
  removeChat();
});
</script>
