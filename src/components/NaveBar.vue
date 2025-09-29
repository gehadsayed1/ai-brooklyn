<template>
  <nav
    class="sticky top-0 z-50 bg-white flex px-2 md:px-10 border-b border-blue-200 md:shadow-lg shadow-2xl items-center justify-between"
  >
    <!-- Logo -->
    <div class="text-lg font-bold cursor-pointer">
      <img
        class="w-35"
        @click="router.push('/')"
        src="../assets/logo1.png"
        alt="Logo"
      />
    </div>

    <!-- Burger Icon -->
    <div class="md:hidden text-gray-400 cursor-pointer" @click="toggleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 6h16M4 12h16M4 18h16"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Menu Items -->
    <ul
      :class="[
        'md:flex md:space-x-2 md:static absolute top-full left-0 w-full md:w-auto text-primary md:bg-transparent transition-all duration-300 ease-in-out',
        isMenuOpen ? 'block bg-white' : 'hidden',
      ]"
    >
      <li>
        <a
          href="#home"
          class="nav-link block md:inline-block p-3 hover:text-primary"
        >
          {{ t("nav.home") }}
        </a>
      </li>
      <li>
        <a
          href="#solutions"
          class="nav-link block md:inline-block p-3 hover:text-primary"
        >
          {{ t("nav.solutions") }}
        </a>
      </li>
      <li>
        <a
          href="#about"
          class="nav-link block md:inline-block p-3 hover:text-primary"
        >
          {{ t("nav.about") }}
        </a>
      </li>
      <li>
        <a
          href="#contact"
          class="nav-link block md:inline-block p-3 hover:text-primary"
        >
          {{ t("nav.contact") }}
        </a>
      </li>
    </ul>

    <!-- Right side -->
    <div class="flex items-center gap-5">
      <LangSwitcher class="ml-4" />

      <!-- Login Icon -->
      <button
        @click="isModalOpen = true"
        class="focus:outline-none bg-primary flex items-center gap-1 text-white font-semibold py-1 px-4 rounded hover:bg-blue-900 cursor-pointer transition transform hover:scale-105"
      >
        <span>{{ t("nav.login") }}</span>
        <LogIn size="18" />
      </button>
    </div>
  </nav>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <GoogleLoginModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
import { useI18n } from "vue-i18n";
import { LogIn } from "lucide-vue-next";
import GoogleLoginModal from "./GoogleLoginModal.vue";

const { t } = useI18n();
const router = useRouter();
const isMenuOpen = ref(false);
const isModalOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Scroll highlight
onMounted(() => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
</script>
