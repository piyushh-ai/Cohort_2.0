import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
