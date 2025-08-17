import { createI18n } from "vue-i18n";
import en from './locales/en'
import ar from './locales/ar'

const messages = {
  en,
  ar
};

const defaultLocale = localStorage.getItem("lang") || "en";

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});
