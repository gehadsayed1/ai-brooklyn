<template>
  <section
    class="py-20 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white text-gray-800"
    :dir="isArabic ? 'rtl' : 'ltr'"
  >
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
      <!-- Left Column: Service Info -->
      <div class="space-y-8">
        <!-- Service Header -->
        <div class="border-b pb-6">
          <h1 class="text-4xl font-bold text-primary mb-4">
            {{ t(`services.${serviceKey}.title`) }}
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ t(`services.${serviceKey}.description`) }}
          </p>
        </div>

        <!-- Service Details (Overview) -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t('services.overview') }}
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ t(`services.${serviceKey}.description`) }}
          </p>
        </div>

        <!-- Features List -->
        <div class="space-y-4">
          <!-- <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t('services.features') }}
          </h3> -->
          <div
            v-for="feature in serviceData.features"
            :key="feature"
            class="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100"
          >
            <i class="fas fa-check-circle text-primary"></i>
            <span class="text-gray-700">{{ feature }}</span>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t('services.benefits') }}
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit1') }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit2') }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit3') }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit4') }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit5') }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t('services.benefit6') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="sticky top-24">
        <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-primary mb-6">
            {{ t('serviceForm.title') }}
          </h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t('serviceForm.serviceName') }}
                </label>
                <div class="relative">
                  <i class="fas fa-briefcase absolute left-4 top-3.5 text-gray-400"></i>
                  <input
                    v-model="form.service"
                    type="text"
                    readonly
                    class="w-full pl-12 pr-4 py-3 border rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t('serviceForm.name') }}
                </label>
                <div class="relative">
                  <i class="fas fa-user absolute left-4 top-3.5 text-gray-400"></i>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :placeholder="t('serviceForm.namePlaceholder')"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t('serviceForm.email') }}
                </label>
                <div class="relative">
                  <i class="fas fa-envelope absolute left-4 top-3.5 text-gray-400"></i>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :placeholder="t('serviceForm.emailPlaceholder')"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t('serviceForm.message') }}
                </label>
                <div class="relative">
                  <i class="fas fa-comment absolute left-4 top-3.5 text-gray-400"></i>
                  <textarea
                    v-model="form.message"
                    rows="4"
                    class="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :placeholder="t('serviceForm.messagePlaceholder')"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i class="fas fa-paper-plane"></i>
              {{ t('serviceForm.button') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n()
const route = useRoute()
const isArabic = computed(() => locale.value === 'ar')
const serviceKey = route.query.service || ''

// Form state
const form = ref({
  service: "",
  name: "",
  email: "",
  message: "",
})

watch(
  () => t(`services.${serviceKey}.title`),
  (newTitle) => {
    form.value.service = newTitle
  },
  { immediate: true }
)

const features = computed(() => {
  try {
    return t(`services.${serviceKey}.features`, { returnObjects: true })
  } catch (error) {
    return []
  }
})

const serviceData = computed(() => {
  // الحصول على بيانات الخدمة الحالية من ملف الترجمة
  return t(`services.${serviceKey}`, { returnObjects: true }) || {
    title: '',
    description: '',
    features: []
  }
})

function submitForm() {
  alert(t('serviceForm.success'))
  form.value.name = ''
  form.value.email = ''
  form.value.message = ''
}
</script>

<style scoped>
.bg-primary {
  background-color: var(--color-primary);
}
.text-primary {
  color: var(--color-primary);
}
.border-primary {
  border-color: var(--color-primary);
}
.ring-primary {
  --tw-ring-color: var(--color-primary);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Form focus styles */
input:focus, textarea:focus {
  outline: none;
}
</style>
