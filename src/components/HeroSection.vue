<template>
  <section
    class="bg-img md:h-[70vh] text-center px-4 md:px-20 py-10 flex flex-col-reverse md:flex-row items-center justify-between bg-white">
    <!-- Content -->
    <div class="w-full md:w-1/2 mt-8 md:mt-0 text-start flex flex-col items-start">
      <h2 class="text-2xl md:text-5xl font-bold mb-4 text-primary">
        {{ $t('hero.title') }}
      </h2>
      <p class="text-sm md:text-lg text-black font-semibold my-6 px-2 md:px-0 max-w-xl">
        {{ $t('hero.description') }}
      </p>
      <button
        class="bg-gray-200 shadow-xl mt-5 hover:shadow-2xl rounded-2xl text-primary px-8 py-3 font-semibold hover:bg-gray-100 transition">
        {{ $t('hero.button') }}
      </button>
    </div>

    <!-- Image -->
    <div class="w-full md:w-1/2 flex justify-center">
      <img src="../assets/undraw_programming_65t2.png" alt="AI Illustration" class="w-52 md:w-96" />
    </div>
  </section>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>
<style scoped>
.bg-img {
  background-image: url("../assets/backgroundHero.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
}</style>