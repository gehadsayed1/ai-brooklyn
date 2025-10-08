import axios from 'axios';
import { BASE_URL } from './Apis';

// إنشاء axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة interceptor لإضافة الـ token تلقائياً
axiosInstance.interceptors.request.use(
  (config) => {
    // الحصول على الـ token من الـ cookie
    const token = getCookie('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// دالة للحصول على الـ cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default axiosInstance;
