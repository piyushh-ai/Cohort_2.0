import axiosInstance from "../../../lib/axios";

export const getAllCollectionsAPI = async () => {
  const response = await axiosInstance.get("/collections");
  return response.data;
};

export const createCollectionAPI = async (data) => {
  const response = await axiosInstance.post("/collections", data);
  return response.data;
};

export const updateCollectionAPI = async (id, data) => {
  const response = await axiosInstance.put(`/collections/${id}`, data);
  return response.data;
};

export const deleteCollectionAPI = async (id) => {
  const response = await axiosInstance.delete(`/collections/${id}`);
  return response.data;
};