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
    script.src = "https://static.getbutton.io/widget/bundle.js?id=URimL"; 
    script.defer = true;
    script.id = "chat-widget";
    document.body.appendChild(script);
  }
};

const removeChat = () => {

  const s = document.getElementById("chat-widget");
  if (s && s.parentNode) s.parentNode.removeChild(s);

 
  document.querySelectorAll(".gb-widget, .gb-widget-launcher, .gb-widget-content")
    .forEach(el => el.remove());
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
