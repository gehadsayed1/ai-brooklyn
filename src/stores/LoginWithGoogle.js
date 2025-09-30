import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL, LOGIN_WITH_GOOGLE } from "../server/Apis";

export const useLoginWithGoogleStore = defineStore("loginWithGoogle", () => {
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

 
  const loadUserFromUrl = () => {
    const params = new URLSearchParams(window.location.search);

    const userParam = params.get("user");
    const token = params.get("token");

    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        user.value = {
          ...parsedUser,
          token,
        };
      } catch (err) {
        console.error("Error parsing user:", err);
        error.value = err;
      }
    }
  };

const logout = async () => {
  try {
    if (user.value?.token) {
      await fetch("https://sea-turtle-app-vshwt.ondigitalocean.app/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.value.token}`,
        },
      });
    }
    user.value = null; 
  } catch (err) {
    console.error("Logout failed:", err);
    error.value = err;
  } finally {
    loading.value = false;
    window.location.href = "/"; 
  }
};

  return {
    loading,
    error,
    user,
    loginWithGoogle,
    loadUserFromUrl,
    logout,
  };
});
