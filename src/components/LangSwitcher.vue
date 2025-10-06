<!-- components/LangSwitcher.vue -->
<template>
  <div class="flex gap-3 items-center">
    <button
      v-for="lng in filteredLanguages"
      :key="lng.code"
      @click="switchLanguage(lng.code)"
      class="px-3 py-1 rounded text-sm font-semibold border transition duration-200
             bg-white text-primary border-gray-300 hover:bg-gray-100"
    >
      {{ lng.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, onMounted, watch } from 'vue'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

const filteredLanguages = computed(() => {
  return languages.filter(lang => lang.code !== locale.value)
})

const switchLanguage = (lang) => {
  locale.value = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

onMounted(() => {
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale.value
})


watch(locale, (newLang) => {
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLang
})
</script>
