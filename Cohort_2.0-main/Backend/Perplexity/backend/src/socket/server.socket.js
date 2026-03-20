import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "https://www.perplexity-piyush.in",
        "https://perplexity-piyush.in",
        "http://localhost:5173",
        "http://localhost:3000",
      ],
      credentials: true,
    },
  });

  // ✅ Socket auth middleware — verifies JWT from cookie
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.token;

      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.username} [${socket.id}]`);

    // Join a personal room by userId — useful for sending targeted messages
    socket.join(`user:${socket.user.id}`);

    socket.on("join_chat", (chatId) => {
      socket.join(`chat:${chatId}`);
    });

    socket.on("leave_chat", (chatId) => {
      socket.leave(`chat:${chatId}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });

  console.log("Socket.io server running");
}

export function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}

// Helper: emit AI response to a chat room
export function emitAiMessage(chatId, message) {
  if (!io) return;
  io.to(`chat:${chatId}`).emit("ai_message", message);
}
