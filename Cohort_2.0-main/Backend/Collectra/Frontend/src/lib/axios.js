import axios from "axios";

const TOKEN_KEY = "collectra_token";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://collectra-ae2v.onrender.com/api",
  withCredentials: true,
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
      localStorage.removeItem(TOKEN_KEY);

      // Sirf in pages pe redirect karo — /welcome aur /login pe NAHI
      const publicPaths = [
        "/login",
        "/register",
        "/welcome",
        "/forgot-password",
      ];
      const isPublic = publicPaths.some((path) =>
        window.location.pathname.startsWith(path),
      );

      // Aur sirf tab redirect karo jab yeh getMeAPI NA ho
      // getMeAPI ki failure pe ProtectedRoute handle karega
      const isMeEndpoint = error.config?.url?.includes("/auth/me");

      if (!isPublic && !isMeEndpoint) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
