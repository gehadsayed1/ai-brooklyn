<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
import { useI18n } from "vue-i18n";
import { LogIn, LogOut } from "lucide-vue-next";
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";
import GoogleLoginModal from "./GoogleLoginModal.vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute(); 
const isLoginPopupOpen = ref(false);

const isMenuOpen = ref(false);
const currentSection = ref("#home");

const loginStore = useLoginWithGoogleStore();
const isLoggingOut = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    currentSection.value = `#${id}`;
  }
};

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    await loginStore.logout();
  } finally {
    isLoggingOut.value = false;
  }
};

const isHomePage = computed(() => {
  // الشرط الأول: لو في الهوم
  if (route.path === "/") return true;

  // الشرط الثاني: لو في service-details مع query معين
  if (route.path === "/service-details" ) {
    return true;
  }

  return false;
});

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
    class="sticky top-0 z-50 bg-white flex px-2 py-2 md:px-10 border-b border-blue-200 md:shadow-lg shadow-2xl items-center justify-between"
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
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
      v-if="isHomePage"
      :class="[ 
        'md:flex md:space-x-2 md:static absolute top-full left-0 w-full md:w-auto text-primary md:bg-transparent transition-all duration-300 ease-in-out',
        isMenuOpen ? 'block bg-white' : 'hidden',
      ]"
    >
      <li>
        <button
          @click="scrollTo('home')"
          :class="[
            'nav-link block md:inline-block p-3 hover:text-primary',
            currentSection === '#home' ? 'active text-primary font-bold' : '',
          ]"
        >
          {{ t('nav.home') }}
        </button>
      </li>
      <li>
        <button
          @click="scrollTo('about')"
          :class="[
            'nav-link block md:inline-block p-3 hover:text-primary',
            currentSection === '#about' ? 'active text-primary font-bold' : '',
          ]"
        >
          {{ t('nav.about') }}
        </button>
      </li>
      <li>
        <button
          @click="scrollTo('solutions')"
          :class="[
            'nav-link block md:inline-block p-3 hover:text-primary',
            currentSection === '#solutions' ? 'active text-primary font-bold' : '',
          ]"
        >
          {{ t('nav.solutions') }}
        </button>
      </li>
      <li>
        <button
          @click="scrollTo('contact')"
          :class="[
            'nav-link block md:inline-block p-3 hover:text-primary',
            currentSection === '#contact' ? 'active text-primary font-bold' : '',
          ]"
        >
          {{ t('nav.contact') }}
        </button>
      </li>
    </ul>

    <!-- Right side -->
    <div class="flex items-center gap-5 relative">
      
      <div v-if="isHomePage">
        <LangSwitcher class="ml-4" />
      </div>

     <button
        v-if="!loginStore.user"
        @click="isLoginPopupOpen = true"
        class="focus:outline-none bg-primary flex items-center gap-1 text-white font-semibold py-1 px-4 rounded hover:bg-blue-900 cursor-pointer transition transform hover:scale-105"
      >
        <span>{{ t('nav.login') }}</span>
        <LogIn size="18" />
      </button>

      <div v-else class="relative group">
        <button class="flex items-center gap-2 cursor-pointer">
          <img
            :src="loginStore.user.avatar"
            alt="avatar"
            class="w-8 h-8 rounded-full border"
          />
          <span class="font-semibold">{{ loginStore.user.name }}</span>
          <svg
            class="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown -->
        <div
          class="absolute -right-3 mt-1 w-40 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200"
        >
          <button
            @click="handleLogout"
            class="flex items-center gap-2 w-full text-left text-red-500 px-4 py-2 hover:bg-gray-100 hover:underline cursor-pointer"
          >
            <span>Log out</span>
            <div
              v-if="isLoggingOut"
              class="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"
            ></div>
            <LogOut v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div v-if="isLoginPopupOpen" class="fixed inset-0  bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
    <GoogleLoginModal :isOpen="isLoginPopupOpen" @close="isLoginPopupOpen = false" />
  </div>
</template>
