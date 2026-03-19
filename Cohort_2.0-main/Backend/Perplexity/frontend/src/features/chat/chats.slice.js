import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        isShared: false,
        shareSlug: null,
        shareUrl: null,
        lastUpdated: new Date().toISOString(),
      };
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role, sources, searched } = action.payload;
      state.chats[chatId].messages.push({
        content,
        role,
        sources: sources || null,
        searched: searched || false,
      });
      state.chats[chatId].lastUpdated = new Date().toISOString();
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages = messages;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setChatShared: (state, action) => {
      const { chatId, isShared, shareSlug, shareUrl } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].isShared = isShared;
        state.chats[chatId].shareSlug = shareSlug;
        state.chats[chatId].shareUrl = shareUrl;
      }
    },
    removeChat: (state, action) => {
      const chatId = action.payload;
      delete state.chats[chatId];
      if (state.currentChatId === chatId) state.currentChatId = null;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  setChatShared,
  removeChat,
} = chatSlice.actions;
export default chatSlice.reducer;
