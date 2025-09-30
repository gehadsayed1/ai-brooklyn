<template>
  <div class="w-full h-[60vh] flex flex-col">
    <!-- Content -->
    <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        Welcome to the Future of Business Education
      </h2>
      <p class="text-sm md:text-xl text-gray-700">
        Have a question? Our new AI instructor is here to help you 24/7.<br />
        Click the chat icon in the corner to get started!
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://static.getbutton.io/widget/bundle.js?id=URimL";
  script.defer = true;
  script.id = "chat-widget"; 
  document.body.appendChild(script);
});

onUnmounted(() => {
 
  const script = document.getElementById("chat-widget");
  if (script) script.remove();


  const widget = document.querySelector(".gb-widget"); 
  if (widget) widget.remove();
});
</script>
