<template>
  <div></div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, onUnmounted } from "vue";

const route = useRoute();
let script;

/* إزالة أي ودجت قديم */
const removeChat = () => {
  const s = document.getElementById("chat-widget");
  if (s) s.remove();

  const widgets = document.querySelectorAll(
    "[class*='gb-'], .gb-widget, .gb-widget-launcher, .gb-widget-content"
  );
  widgets.forEach((el) => el.remove());

  if (window.getbutton) {
    try {
      window.getbutton.destroy();
    } catch (e) {}
    delete window.getbutton;
  }
};

/* تحميل الودجت الجديد */
const loadChat = () => {
  removeChat();

  const widgetId = route.query.chat;
  if (!widgetId) return;

  script = document.createElement("script");
  script.id = "chat-widget";
  script.src = `https://static.getbutton.io/widget/bundle.js?id=${widgetId}`;
  script.defer = true;

  document.body.appendChild(script);
};

/* شغّال أول ما الصفحة تفتح */
onMounted(() => {
  loadChat();
});

/* لو المستخدم اختار موديل جديد → اعمل reload للودجت */
watch(
  () => route.query.chat,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      loadChat();
    }
  }
);

/* نظافة */
onUnmounted(() => {
  removeChat();
});
</script>
