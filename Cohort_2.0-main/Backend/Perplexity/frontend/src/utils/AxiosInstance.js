import axios from "axios";

const api = axios.create({
  baseURL: "https://perplexity-eeii.onrender.com/api",
  withCredentials: true,
});

export default api;
