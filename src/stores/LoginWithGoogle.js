import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL, LOGIN_WITH_GOOGLE } from "../server/Apis";

export const useLoginWithGoogleStore = defineStore("loginWithGoogle", () => {
  const loading = ref(false);
  const error = ref(null);
  const user = ref(null);

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const eraseCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  };

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
        if (token) {
          setCookie("auth_token", token, 7); // تخزين التوكن 7 أيام
        }
      } catch (err) {
        console.error("Error parsing user:", err);
        error.value = err;
      }
    }
  };

  const checkAuth = () => {
    const token = getCookie("auth_token");
    if (token) {
      user.value = { ...user.value, token };
      return true;
    }
    return false;
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
      eraseCookie("auth_token");
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
    checkAuth,
  };
});
