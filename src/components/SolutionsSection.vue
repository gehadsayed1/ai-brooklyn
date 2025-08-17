<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6 md:px-12">
      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-5xl font-bold text-primary mb-2">
          {{ $t('business_ai.title') }}
        </h2>
        <p class="text-lg font-semibold">
          {{ $t('business_ai.subtitle') }}
        </p>
      </div>

      <!-- Grid of 3 AI Services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Veo 3 -->
        <div data-aos="fade-up" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <img src="../assets/veo.png" alt="Veo 3 Video AI" class="w-full h-40 m-auto object-cover mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ $t('business_ai.services.veo.title') }}
          </h3>
          <p class="text-gray-600">
            {{ $t('business_ai.services.veo.desc') }}
          </p>
          <button
            @click="router.push({ name: 'ServiceDetails', query: { service: 'video-ai' } })"
            class="mt-4 text-primary font-medium hover:underline"
          >
            {{ $t('business_ai.services.learn_more') }}
          </button>
        </div>

        <!-- 1Task -->
        <div data-aos="fade-up" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <img src="../assets/ai1.png" alt="Workspace AI" class="w-full h-40 m-auto object-cover mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ $t('business_ai.services.task.title') }}
          </h3>
          <p class="text-gray-600">
            {{ $t('business_ai.services.task.desc') }}
          </p>
          <button
            @click="router.push({ name: 'ServiceDetails', query: { service: 'workspace-ai' } })"
            class="mt-4 text-primary font-medium hover:underline"
          >
            {{ $t('business_ai.services.learn_more') }}
          </button>
        </div>

        <!-- AI Agent -->
        <div data-aos="fade-up" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <img src="../assets/aiagent.png" alt="AI Agent" class="w-full h-40 m-auto object-cover mb-4" />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ $t('business_ai.services.agent.title') }}
          </h3>
          <p class="text-gray-600">
            {{ $t('business_ai.services.agent.desc') }}
          </p>
          <button
            @click="router.push({ name: 'ServiceDetails', query: { service: 'ai-agent' } })"
            class="mt-4 text-primary font-medium hover:underline"
          >
            {{ $t('business_ai.services.learn_more') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>
