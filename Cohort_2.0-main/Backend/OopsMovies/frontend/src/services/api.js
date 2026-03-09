import axios from "axios";

const api = axios.create({
  baseURL: "https://oopsmovies.onrender.com/api",
  withCredentials: true,
});

export default api;
