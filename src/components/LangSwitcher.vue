<!-- components/LangSwitcher.vue -->
<template>
  <div class="flex gap-3 items-center">
    <button
      v-for="lng in languages"
      :key="lng.code"
      @click="switchLanguage(lng.code)"
      :class="[
        'px-3 py-1 rounded text-sm font-semibold border transition duration-200',
        locale === lng.code
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
      ]"
    >
      {{ lng.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, watch } from 'vue'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

const switchLanguage = (lang) => {
  locale.value = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

// Apply direction on initial load
onMounted(() => {
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale.value
})

// Watch language change to update dir/lang
watch(locale, (newLang) => {
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLang
})
</script>

<style scoped>
.bg-primary {
  background-color: #1e3a8a;
}
.border-primary {
  border-color: #1e3a8a;
}
</style>
