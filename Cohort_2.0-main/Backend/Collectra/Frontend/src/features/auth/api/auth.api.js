import axiosInstance from "../../../lib/axios";

export const registerAPI = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginAPI = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const googleLoginAPI = () => {
  // Google OAuth — redirect karo backend pe
  window.location.href = "http://localhost:3000/api/auth/google";
};

export const getMeAPI = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const forgotPasswordAPI = async (data) => {
  const response = await axiosInstance.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPasswordAPI = async (id, token, data) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${id}/${token}`,
    data
  );
  return response.data;
};