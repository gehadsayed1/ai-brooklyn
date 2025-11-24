<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { useChatBot } from '../composables/useChatBot';

const router = useRouter();
const route = useRoute();
const { removeChat } = useChatBot();
const isLoading = ref(false);

const name = route.params.slug;

const goBackToModels = () => {
  removeChat();
  router.push('/models');
};

onMounted(() => {
  // الصفحة هتتحمل تلقائياً بدون reload
  // الـ chatbot هيتحمل تلقائياً من خلال الـ watch في ChatBot.vue
});

onUnmounted(() => {
  console.log("💨 Leaving ModelPage → removing chat");
  removeChat();
});
</script>

<template>
  <div class="w-full h-[80vh] flex flex-col relative">
    <div class="p-4">
      <button @click="goBackToModels"
        class="flex cursor-pointer items-center gap-2 text-primary hover:text-blue-700 transition-colors">
        <ArrowLeft class="w-5 h-5" />
        <span>{{ $t('models.useModule') }}</span>
      </button>
    </div>

    <div class="flex-grow gap-6 mt-8 flex flex-col text-center py-8">
      <h2 class="text-xl md:text-4xl font-bold text-[#002d62] mb-4">
        {{ $t('businessInstructor.title') }}
      </h2>

      <h3 class="text-lg md:text-3xl font-bold text-[#002d62] mb-4">
        {{ name.toUpperCase() }}
      </h3>

      <p class="text-sm md:text-xl text-gray-700">
        {{ $t('businessInstructor.subtitle') }}<br />
        {{ $t('businessInstructor.instruction') }}
      </p>
    </div>
  </div>
</template>