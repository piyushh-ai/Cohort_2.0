import axiosInstance from "../../../lib/axios";

export const getAllItemsAPI = async (params = {}) => {
  const response = await axiosInstance.get("/items", { params });
  return response.data;
};

export const createItemAPI = async (formData) => {
  const response = await axiosInstance.post("/items", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getItemByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};

export const updateItemAPI = async (id, data) => {
  const response = await axiosInstance.put(`/items/${id}`, data);
  return response.data;
};

export const deleteItemAPI = async (id) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};

export const toggleFavoriteAPI = async (id) => {
  const response = await axiosInstance.patch(`/items/${id}/favorite`);
  return response.data;
};

export const addToCollectionAPI = async (id, collectionId) => {
  const response = await axiosInstance.patch(`/items/${id}/add-to-collection`, {
    collectionId,
  });
  return response.data;
};

export const removeFromCollectionAPI = async (id) => {
  const response = await axiosInstance.patch(`/items/${id}/collection`);
  return response.data;
};

export const addHighlightAPI = async (id, data) => {
  const response = await axiosInstance.post(`/items/${id}/highlight`, data);
  return response.data;
};

export const deleteHighlightAPI = async (id, highlightId) => {
  const response = await axiosInstance.delete(
    `/items/${id}/highlight/${highlightId}`,
  );
  return response.data;
};

export const generateAIHighlightsAPI = async (id) => {
  const response = await axiosInstance.get(`/items/${id}/highlights/generate`);
  return response.data;
};

export const getRelatedItemsAPI = async (id) => {
  const response = await axiosInstance.get(`/items/${id}/related`);
  return response.data;
};

export const resurfaceItemsAPI = async () => {
  const response = await axiosInstance.get("/items/resurface");
  return response.data;
};

export const getGraphDataAPI = async () => {
  const response = await axiosInstance.get("/items/graph");
  return response.data;
};

export const semanticSearchAPI = async (query, limit = 10) => {
  const response = await axiosInstance.get("/items/semantic-search", {
    params: { query, limit },
  });
  return response.data;
};

export const getTopicClustersAPI = async () => {
  const response = await axiosInstance.get("/items/topics");
  return response.data;
};
