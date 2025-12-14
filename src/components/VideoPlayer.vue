<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    videoSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: ''
    }
});

const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isOpen.value = false;
    document.body.style.overflow = '';
};
</script>

<template>
    <div class="video-player-container">
        <div @click="openModal"
            class="group relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/80 to-purple-600/80 group-hover:opacity-90 transition-opacity">
            </div>

            <div class="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-6">
                <div
                    class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
                <h3 v-if="title" class="text-xl font-bold text-center px-4">{{ title }}</h3>
                <p class="text-sm opacity-90 mt-2 text-center">{{ t('videoSection.clickToWatch') || '' }}</p>
            </div>

            <img v-if="thumbnail" :src="thumbnail"
                class="absolute inset-0 w-full h-full object-cover -z-0 opacity-50" />
        </div>

        <div v-if="isOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
            @click.self="closeModal">
            <div class="relative w-full max-w-5xl bg-black rounded-lg shadow-2xl overflow-hidden" @click.stop>

                <button @click="closeModal"
                    class="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="aspect-video w-full">
                    <video v-if="!videoSrc.includes('youtube')" :src="videoSrc" class="w-full h-full object-contain"
                        controls autoplay></video>

                    <iframe v-else class="w-full h-full"
                        :src="`https://www.youtube.com/embed/${videoSrc}?autoplay=1&rel=0`" title="Video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
