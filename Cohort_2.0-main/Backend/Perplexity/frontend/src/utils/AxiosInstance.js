import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000/api" // local development
    : "https://perplexity-piyush.in/api", // production
  withCredentials: true,
});

export default api;
