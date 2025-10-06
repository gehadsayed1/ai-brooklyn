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
  // إزالة أي widget موجود أولاً
  removeChat();
  
  // إضافة تأخير صغير لضمان الإزالة الكاملة
  setTimeout(() => {
    if (!document.getElementById("chat-widget")) {
      script = document.createElement("script");
      script.src = "https://static.getbutton.io/widget/bundle.js?id=hiUvw"; 
      script.defer = true;
      script.id = "chat-widget";
      document.body.appendChild(script);
    }
  }, 100);
};

const removeChat = () => {
  console.log('Removing chat widget...');
  
  // إزالة الـ script
  const s = document.getElementById("chat-widget");
  if (s && s.parentNode) {
    s.parentNode.removeChild(s);
  }

  // إزالة جميع عناصر الـ widget
  const widgets = document.querySelectorAll("[class*='gb-'], [id*='gb-'], .gb-widget, .gb-widget-launcher, .gb-widget-content, [class*='getbutton'], [data-testid*='gb-']");
  widgets.forEach(el => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  // إزالة أي styles مضافة
  const styles = document.querySelectorAll('style[data-emotion], link[href*="getbutton"], style[id*="gb-"]');
  styles.forEach(el => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });

  // إزالة أي event listeners
  if (window.getbutton) {
    try {
      window.getbutton.destroy();
    } catch (e) {
      console.log('getbutton destroy failed:', e);
    }
  }
};

watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log('Route changed from', oldPath, 'to', newPath);
    
    if (newPath === "/business-instructor") {
      visible.value = true;
      // إضافة تأخير لضمان تحميل الصفحة أولاً
      setTimeout(() => {
        loadChat();
      }, 200);
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
