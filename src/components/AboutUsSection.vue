<template>
  <section class="py-10 bg-white" id="about" data-aos="fade-up">
    <div class="container mx-auto px-4 sm:px-6 lg:px-12">
      <div class="text-center mb-12" data-aos="fade-down" data-aos-delay="100">
        <h3 class="text-3xl sm:text-4xl font-bold text-primary mb-4">
          {{ $t('about.title') }}
        </h3>
      </div>

      <div class="flex flex-col md:flex-row items-center md:items-start gap-10">
        <!-- Text Content -->
        <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-delay="200">
          <h4 class="text-xl sm:text-2xl font-bold mb-8 text-primary">
            {{ $t('about.subtitle') }}
          </h4>

          <div class="grid sm:grid-cols-2 gap-10">
            <!-- User-Friendly -->
            <div class="flex items-start gap-4" data-aos="fade-up" data-aos-delay="300">
              <span class="bg-blue-100 p-3 rounded-full text-blue-600">🔧</span>
              <div>
                <h5 class="font-bold text-gray-800">{{ $t('about.items.userFriendly.title') }}</h5>
                <p class="text-gray-600 text-md">{{ $t('about.items.userFriendly.desc') }}</p>
              </div>
            </div>

            <!-- AI-Powered -->
            <div class="flex items-start gap-4" data-aos="fade-up" data-aos-delay="400">
              <span class="bg-purple-100 p-3 rounded-full text-blue-800">⚙️</span>
              <div>
                <h5 class="font-bold text-gray-800">{{ $t('about.items.powerful.title') }}</h5>
                <p class="text-gray-600 text-md">{{ $t('about.items.powerful.desc') }}</p>
              </div>
            </div>

            <!-- Cloud -->
            <div class="flex items-start gap-4" data-aos="fade-up" data-aos-delay="500">
              <span class="bg-green-100 p-3 rounded-full text-green-600">☁️</span>
              <div>
                <h5 class="font-bold text-gray-800">{{ $t('about.items.cloud.title') }}</h5>
                <p class="text-gray-600 text-md">{{ $t('about.items.cloud.desc') }}</p>
              </div>
            </div>

            <!-- Scalable -->
            <div class="flex items-start gap-4" data-aos="fade-up" data-aos-delay="600">
              <span class="bg-yellow-100 p-3 rounded-full text-yellow-600">📈</span>
              <div>
                <h5 class="font-bold text-gray-800">{{ $t('about.items.scalable.title') }}</h5>
                <p class="text-gray-600 text-md">{{ $t('about.items.scalable.desc') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="w-full md:w-1/2 flex justify-center" data-aos="zoom-in" data-aos-delay="700">
          <img src="../assets/team.png" alt="About Us Image" class="w-full max-w-sm md:max-w-md lg:max-w-lg" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
