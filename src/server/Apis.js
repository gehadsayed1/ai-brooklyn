export const BASE_URL = (
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
) || "https://sea-turtle-app-vshwt.ondigitalocean.app/api/";


export const LOGIN_WITH_GOOGLE = "auth/google/redirect";
export const GET_USER = "user";
export const LOGOUT = "logout";

