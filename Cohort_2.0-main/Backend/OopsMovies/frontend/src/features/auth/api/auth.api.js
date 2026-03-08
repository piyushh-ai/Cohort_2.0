import api from "../../../services/api";

export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};

export const getMeApi = () => {
  return api.get("/auth/me");
};