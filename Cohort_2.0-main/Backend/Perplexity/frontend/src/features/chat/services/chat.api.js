import api from "../../../utils/AxiosInstance";

export const sendMessage = async ({ message, chatId }) => {
  const response = await api.post("/chats/message", { message, chatId });
  return response.data;
};

export const getChats = async () => {
  const response = await api.get("/chats");
  return response.data;
};

export const getAllMessageByChat = async ({ chatId }) => {
  const response = await api.get(`/chats/${chatId}/messages`);
  return response.data;
};

export const deleteChat = async ({ chatId }) => {
  const response = await api.delete(`/chats/delete/${chatId}`); // ✅ Fixed: was api.get
  return response.data;
};

export const shareChatApi = async ({ chatId }) => {
  const response = await api.post(`/chats/${chatId}/share`);
  return response.data;
};

export const unshareChatApi = async ({ chatId }) => {
  const response = await api.delete(`/chats/${chatId}/share`);
  return response.data;
};

export const getSharedChatApi = async ({ shareSlug }) => {
  const response = await api.get(`/share/${shareSlug}`);
  return response.data;
};
