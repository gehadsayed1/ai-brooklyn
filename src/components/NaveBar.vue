<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
import { useI18n } from "vue-i18n";
import { LogIn } from "lucide-vue-next";
import { useLoginWithGoogleStore } from "../stores/loginWithGoogle";

const { t } = useI18n();
const router = useRouter();
const isMenuOpen = ref(false);
const currentSection = ref(window.location.hash || "#home"); 

const loginStore = useLoginWithGoogleStore();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const setActive = (hash) => {
  currentSection.value = hash;
  window.location.hash = hash; 
};

// Scroll highlight
onMounted(() => {
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = `#${section.getAttribute("id")}`;
      }
    });
    if (current) currentSection.value = current;
  });

  loginStore.loadUserFromUrl();
});
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-white flex px-2 md:px-10 border-b border-blue-200 md:shadow-lg shadow-2xl items-center justify-between">
    <!-- Logo -->
    <div class="text-lg font-bold cursor-pointer">
      <img class="w-35" @click="router.push('/')" src="../assets/logo1.png" alt="Logo" />
    </div>

    <!-- Burger Icon -->
    <div class="md:hidden text-gray-400 cursor-pointer" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Menu Items -->
    <ul :class="[
      'md:flex md:space-x-2 md:static absolute top-full left-0 w-full md:w-auto text-primary md:bg-transparent transition-all duration-300 ease-in-out',
      isMenuOpen ? 'block bg-white' : 'hidden',
    ]">
      <li>
        <a href="#home" @click.prevent="setActive('#home')" :class="['nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#home' ? 'active text-primary font-bold' : '']">
          {{ t("nav.home") }}
        </a>
      </li>
      <li>

        <a href="#about" @click.prevent="setActive('#about')" :class="['nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#about' ? 'active text-primary font-bold' : '']">
          {{ t("nav.about") }}
        </a>
      </li>
      <li>
        <a href="#solutions" @click.prevent="setActive('#solutions')" :class="['nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#solutions' ? 'active text-primary font-bold' : '']">
          {{ t("nav.solutions") }}
        </a>
      </li>

      <li>
        <a href="#contact" @click.prevent="setActive('#contact')" :class="['nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#contact' ? 'active text-primary font-bold' : '']">
          {{ t("nav.contact") }}
        </a>


      </li>
    </ul>

    <!-- Right side -->
    <div class="flex items-center gap-5 relative">
      <LangSwitcher class="ml-4" />

     
      <button v-if="!loginStore.user" @click="loginStore.loginWithGoogle"
        class="focus:outline-none bg-primary flex items-center gap-1 text-white font-semibold py-1 px-4 rounded hover:bg-blue-900 cursor-pointer transition transform hover:scale-105">
        <span>{{ t('nav.login') }}</span>
        <LogIn size="18" />
      </button>

    
      <div v-else class="relative group">
        <button class="flex items-center gap-2 cursor-pointer">
          <img :src="loginStore.user.avatar" alt="avatar" class="w-8 h-8 rounded-full border" />
          <span class="font-semibold">{{ loginStore.user.name }}</span>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown -->
        <div class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block">
          <button @click="loginStore.logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
