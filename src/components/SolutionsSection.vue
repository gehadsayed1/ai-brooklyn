<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6 md:px-12">
      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-5xl font-bold text-primary mb-2">
          {{ $t("business_ai.title") }}
        </h2>
        <p class="text-lg font-semibold">
          {{ $t("business_ai.subtitle") }}
        </p>
      </div>

      <!-- Grid of AI Services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          data-aos="fade-up"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <img
            :src="service.img"
            :alt="service.alt"
            class="w-full h-60 rounded-2xl m-auto object-cover mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ $t(service.title) }}
          </h3>
          <p class="text-gray-600 mb-2">
            {{ $t(service.desc) }}
          </p>

          <div class="flex justify-between items-center mt-6 r">
            <button
              @click="handleClick(service)"
              class="text-primary cursor-pointer font-medium hover:underline"
            >
              {{ $t("business_ai.services.learn_more") }}
            </button>

            <span
              class="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1"
            >
              {{ $t(service.price) }}
              <!-- <BadgeDollarSign class="w-4 h-4" /> -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import img from "../assets/chatbot.png";
import img2 from "../assets/ai1.png";
import img3 from "../assets/aiagent.png";
import { BadgeDollarSign } from "lucide-vue-next";

const router = useRouter();
const { t } = useI18n();

const handleClick = (service) => {
  if (service.external) {
    window.open(service.link, "_blank");
  } else {
    router.push({
      name: "ServiceDetails",
      query: { service: service.query },
    });
  }
};

const services = [
  {
    img: img,
    alt: "ai chatbot",
    title: "business_ai.services.veo.title",
    desc: "business_ai.services.veo.desc",
    price: "business_ai.services.veo.price",
    query: "ai-chatbot",
  },
  {
    img: img2,
    alt: "Business coach",
    title: "business_ai.services.business.title",
    desc: "business_ai.services.business.desc",
    price: "business_ai.services.business.price",
    query: "business",
  },
  {
    img: img3,
    alt: "AI Agent",
    title: "business_ai.services.agent.title",
    desc: "business_ai.services.agent.desc",
    price: "business_ai.services.agent.price",
    query: "ai-agent",
  },
];
</script>
