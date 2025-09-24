<template>
  <div
    v-if="isOpen"
    class="bg-white rounded-2xl shadow-lg w-96 p-4 relative animate-fadeIn"
  >
    <button
      @click="$emit('close')"
      class="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-500 transition"
    >
      <X class="w-6 h-6" />
    </button>

    <img src="../assets/logo1.png" class="w-32 h-32 mx-auto" alt="" />
    <!-- <h2 class="text-xl font-bold text-center">Login</h2> -->

    <!-- Google Login -->
    <button
      @click="loginWithGoogle"
      class="flex items-center cursor-pointer justify-center gap-2 mt-4 w-full border py-2 rounded-lg hover:bg-gray-100 transition"
    >
   <span
  v-if="!loginWithGoogleStore.loading"
  class="flex items-center gap-2"
>
  <img
    src="https://www.svgrepo.com/show/355037/google.svg"
    class="w-5 h-5"
  />
  Continue with Google
</span>

<span
  v-else
  class="loader border-4 border-t-4 border-primary border-t-transparent rounded-full w-5 h-5 animate-spin"
></span>

    </button>

    <span v-if="loginWithGoogleStore.error">{{
      loginWithGoogleStore.error
    }}</span>
  </div>
</template>

<script setup>
import { X } from "lucide-vue-next";

import { useLoginWithGoogleStore } from "../store/LoginWithGoogle";

const loginWithGoogleStore = useLoginWithGoogleStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const loginWithGoogle = () => {
  loginWithGoogleStore.loginWithGoogle();
};
</script>
