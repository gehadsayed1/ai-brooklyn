<template>
  <div class="w-full min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <div class="bg-[#002d62] text-red-500 py-5 px-6">
      <h1 class="text-lg md:text-2xl font-bold">
        Brooklyn Business School Business Instructor by AI
      </h1>
    </div>

   
    <div class="flex-grow gap-6 flex flex-col   text-center py-8">
      <h2 class="text-xl md:text-5xl font-bold text-[#002d62] mb-4">
        Welcome to the Future of Business Education
      </h2>
      <p class="text-sm md:text-xl text-gray-700">
        Have a question? Our new AI instructor is here to help you 24/7.<br />
        Click the chat icon in the corner to get started!
      </p>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-200 text-center py-4">
      © 2025 Brooklyn Business School. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (!document.getElementById("getbutton-widget")) {
    const script = document.createElement("script")
    script.defer = true
    script.id = "getbutton-widget"
    script.src = "https://static.getbutton.io/widget/bundle.js?id=G9IGn"
    document.body.appendChild(script)
  }
})

</script>
