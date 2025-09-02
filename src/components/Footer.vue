<template>
  <footer class="bg-gray-900 text-white pt-10  px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
      <!-- Company Info -->
      <div>
        <h3 class="text-xl font-semibold mb-4">AI Brooklyn</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          {{ $t('footer.companyInfo') }}
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('footer.quickLinks.title') }}</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white transition">{{ $t('nav.home') }}</a></li>
          <li><a href="#about" class="hover:text-white transition">{{ $t('nav.about') }}</a></li>
          <li><a href="#solutions" class="hover:text-white transition">{{ $t('nav.solutions') }}</a></li>
          <li><a href="#contact" class="hover:text-white transition">{{ $t('nav.contact') }}</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('footer.services.title') }}</h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="#" class="hover:text-white transition">{{ $t('footer.services.consultation') }}</a></li>
          <li><a href="#" class="hover:text-white transition">{{ $t('footer.services.crm') }}</a></li>
          <li><a href="#" class="hover:text-white transition">{{ $t('footer.services.web') }}</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('footer.contact.title') }}</h3>
        <p class="text-gray-400 text-sm">{{ $t('footer.contact.email') }}: ai@brooklynacademy.net</p>
        <a href="https://wa.me/966567844965" target="_blank" class="flex items-center mt-2 hover:underline">
          <i class="fab fa-whatsapp w-5 h-5 mr-2 sm:mr-4 text-xl"></i>
          <span>+971 567844965</span>
        </a>
      </div>
    </div>

    <div class="text-center pb-5 text-gray-500 text-sm mt-10 border-t flex items-center justify-center border-gray-700 pt-3">
      &copy; 2025 AI Brooklyn. {{ $t('footer.rights') }}
    </div>
  </footer>
</template>


<script setup>
// Font Awesome is already imported below
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
