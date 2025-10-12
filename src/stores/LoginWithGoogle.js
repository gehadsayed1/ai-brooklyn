import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL, LOGIN_WITH_GOOGLE, GET_USER, LOGOUT } from "../server/Apis";
import axiosInstance from "../server/axiosInstance";

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
      console.error('❌ Login error:', err);
      error.value = err;
      loading.value = false;
    }
  };

  const loadUserFromUrl = async (router = null) => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        // حفظ الـ token أولاً
        setCookie("auth_token", token, 7);
        
        // جلب بيانات المستخدم من الـ API
        const userData = await fetchUserData();
        
        // حذف كل الـ parameters من الـ URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // إذا كان لديه access، توجيهه لصفحة Models
        if (userData && userData.has_bot_access === 1) {
          // استخدام router إذا كان متاح، وإلا استخدام window.location
          if (router) {
            router.push('/models');
          } else {
            window.location.href = '/models';
          }
        }
        
      } catch (err) {
        console.error("Error loading user:", err);
        error.value = err;
      }
    }
  };

  const fetchUserData = async () => {
    loading.value = true;
    try {
      const response = await axiosInstance.get(GET_USER);
      
      if (response.data && response.data.data) {
        const userData = response.data.data;
        console.log("userData", userData);
        console.log("userData.has_bot_access", userData.has_bot_access);
        
        
        // التحقق من الـ access قبل حفظ البيانات
        if (userData.has_bot_access === 0) {
          // لو معندوش access، نعمل logout ونرمي رسالة مخصصة
          eraseCookie("auth_token");
          localStorage.removeItem('user_data');
          user.value = null;
          
          // حفظ NO_ACCESS في sessionStorage علشان يفضل بعد reload
          sessionStorage.setItem('show_no_access', 'true');
          error.value = 'NO_ACCESS'; // رسالة مخصصة
          
          loading.value = false;
          return null;
        }
        
        user.value = userData;
        
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // التحقق من تاريخ انتهاء الاشتراك
        if (userData.access_expiry) {
          const expiryDate = new Date(userData.access_expiry);
          const today = new Date();
          const isExpired = expiryDate < today;
          
          // إذا كان الاشتراك منتهي، عمل logout تلقائي
          if (isExpired) {
            console.log('Subscription expired, logging out...');
            await logout();
            throw new Error('Subscription expired');
          }
        }
        
        return userData;
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      error.value = err;
      
      error.value = 'NO_ACCESS';
      sessionStorage.setItem('show_no_access', 'true');
      // فقط نحذف الـ token إذا كان الخطأ 401 (Unauthorized)
      if (err.response && err.response.status === 401) {
        console.log('Unauthorized, clearing auth data...');
        eraseCookie("auth_token");
        localStorage.removeItem('user_data');
        user.value = null;
      }
      
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    const token = getCookie("auth_token");
    if (token) {
      const savedUser = localStorage.getItem('user_data');
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser);
        } catch (err) {
          console.error("Error loading user from localStorage:", err);
        }
      }
      
      // جلب بيانات المستخدم المحدثة من الـ API
      try {
        await fetchUserData();
      } catch (err) {
        console.error("Failed to fetch updated user data:", err);
      }
      
      return true;
    }
    return false;
  };

  const checkBotAccess = () => {
    if (!user.value) return false;
    return user.value.has_bot_access === 1;
  };

  const checkAccessExpiry = (autoLogout = false) => {
    if (!user.value || !user.value.access_expiry) return null;
    
    const expiryDate = new Date(user.value.access_expiry);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const isExpired = diffDays < 0;
    
    // إذا كان الاشتراك منتهي وطُلب logout تلقائي
    if (isExpired && autoLogout) {
      logout();
    }
    
    return {
      expiryDate: user.value.access_expiry,
      daysRemaining: diffDays,
      isExpired: isExpired,
      isExpiringSoon: diffDays > 0 && diffDays <= 7, // أقل من 7 أيام
    };
  };

  const logout = async () => {
    loading.value = true;
    
    // حذف البيانات المحلية أولاً
    user.value = null;
    eraseCookie("auth_token");
    localStorage.removeItem('user_data');
    
    try {
      // إرسال request للـ logout API (في الخلفية)
      await axiosInstance.post(LOGOUT);
    } catch (err) {
      console.error("Logout API failed:", err);
      error.value = err;
    } finally {
      loading.value = false;
      // التوجيه للـ home page
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
    fetchUserData,
    checkBotAccess,
    checkAccessExpiry,
  };
});
