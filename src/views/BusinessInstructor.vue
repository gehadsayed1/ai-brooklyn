<template>
  <div class="w-full min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <div class="bg-[#002d62] text-white py-5 px-6 flex justify-between items-center">
      <h1 class="text-lg md:text-2xl font-bold">
        Brooklyn Business School Business Instructor by AI
      </h1>

      <!-- Dropdown User -->
      <div v-if="user" class="relative" @click="toggleDropdown">
        <button class="flex items-center gap-2 cursor-pointer">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Avatar"
            class="w-8 h-8 rounded-full border"
          />
          <span>Welcome, {{ user.name }}</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2 z-50"
        >
          <button
            @click="logout"
            class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-200 disabled:opacity-50"
            :disabled="loading"
          >
            <!-- النص -->
            <span>Logout</span>

            <!-- الاسبينر -->
            <svg
              v-if="loading"
              class="animate-spin h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-grow gap-6 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
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
import { ref, onMounted } from "vue";

const user = ref(null);
const token = ref(null);
const showDropdown = ref(false);
const loading = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// logout with token + spinner
const logout = async () => {
  loading.value = true;
  try {
    if (token.value) {
      await fetch("https://sea-turtle-app-vshwt.ondigitalocean.app/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });
    }
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    window.location.href = "/";
  }
};

const parseUserFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  token.value = params.get("token");

  const userStr = params.get("user");
  if (userStr) {
    try {
      user.value = JSON.parse(decodeURIComponent(userStr));
    } catch (e) {
      console.error("Failed to parse user info:", e);
    }
  }
};

onMounted(() => {
  parseUserFromUrl();
});
</script>
