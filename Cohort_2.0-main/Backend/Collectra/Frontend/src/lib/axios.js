import axios from "axios";

const TOKEN_KEY = "collectra_token";

const axiosInstance = axios.create({
  baseURL:
    "https://collectra-ae2v.onrender.com/api" || "http://localhost:3000/api",
  withCredentials: true, // ✅ cookies bhi bhejo (JWT cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor — har request mein token attach karo
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response interceptor — 401 pe logout karo
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — localStorage clear karo aur login pe redirect
      localStorage.removeItem(TOKEN_KEY);
      // Hard redirect — React Router state corrupt ho sakta hai
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
