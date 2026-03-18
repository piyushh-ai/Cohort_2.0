import axios from "axios";

const api = axios.create({
  baseURL: "https://oopsmovies-t16j.onrender.com/api",
  withCredentials: true,
});

export default api;
