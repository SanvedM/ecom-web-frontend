import axios from "axios";

// 🌐 Base URL
// const BASE_URL = "https://sanved-ecom.up.railway.app/api/";
const BASE_URL = "http://127.00.1:8000/api/";


// ✅ Public API (no token)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Private API (with token)
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token ONLY for private API
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Optional: Handle 401 (auto logout)
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - redirect to login");
      // optional: logout logic
    }
    return Promise.reject(error);
  }
);