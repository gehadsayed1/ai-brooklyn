<template>
  <section class="py-20 bg-blue-50">
    <div class="container mx-auto px-6  md:px-12">

      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">{{ $t('whyUs.title') }}</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ $t('whyUs.description') }}
        </p>
      </div>

     
      <div class="flex flex-wrap justify-center gap-15 ">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative group w-90 h-90 rounded-full overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          data-aos="fade-up"
        >
          <!-- الخلفية -->
          <div class="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>

          <!-- الدائرة الداخلية -->
          <!-- <div class="absolute inset-8 rounded-full border-4 border-dashed border-indigo-300 animate-pulse"></div> -->

          <!-- الأيقونة -->
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div  class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-6 transform transition-transform duration-300 group-hover:rotate-12">
              <component :is="item.icon" :class="item.bgColor"  size="28" />

            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-3">
              {{ $t(item.title) }}
            </h3>
            <p class="text-sm text-gray-600 text-center leading-relaxed">
              {{ $t(item.desc) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Activity, Clock, BookOpen } from 'lucide-vue-next';

const { t } = useI18n()

const items = [
  {
    title: 'whyUs.items.quality.title',
    desc: 'whyUs.items.quality.desc',
    icon:Activity,
    bgColor: 'text-blue-500',
    aos: 'fade-up',
  },
  {
    title: 'whyUs.items.timely.title',
    desc: 'whyUs.items.timely.desc',
    icon: Clock,
    bgColor: 'text-green-500',
    aos: 'fade-up',
  },
  {
    title: 'whyUs.items.learning.title',
    desc: 'whyUs.items.learning.desc',
    icon: BookOpen,
    bgColor: 'text-purple-500',
    aos: 'fade-up',
  },
]
</script>
