import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL, LOGIN_WITH_GOOGLE } from "../server/Apis";

export const useLoginWithGoogleStore = defineStore('loginWithGoogle', () => {
    const loading = ref(false);
    const error = ref(null);
    const user = ref(null);

const loginWithGoogle = () => {
  loading.value = true;
  error.value = null;

  try {
    setTimeout(() => {
  window.location.href = `${BASE_URL}${LOGIN_WITH_GOOGLE}`;
}, 1000);

  } catch (err) {
    error.value = err;
    console.error(err);
    loading.value = false; 
  }
};


    return {
        loading,
        error,
        user,
        loginWithGoogle
    };
});
