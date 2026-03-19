import { io } from "socket.io-client";

let socket = null;

// Singleton — ek hi connection, bar bar nahi banta
export const initializeSocketConnection = () => {
  if (socket?.connected) return socket;

  socket = io("https://perplexity-eeii.onrender.com", {
    withCredentials: true,
  });

  socket.on("connect", () => console.log("Socket connected:", socket.id));
  socket.on("disconnect", () => console.log("Socket disconnected"));
  socket.on("connect_error", (err) =>
    console.error("Socket error:", err.message),
  );

  return socket;
};

export const getSocket = () => socket;

export const joinChat = (chatId) => socket?.emit("join_chat", chatId);
export const leaveChat = (chatId) => socket?.emit("leave_chat", chatId);
