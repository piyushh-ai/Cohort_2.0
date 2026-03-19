import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  deleteChat,
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/chats.controller.js";

const chatRouter = Router();

// chatLimiter sirf message bhejne pe — expensive AI call hai
chatRouter.post("/message", authUser,  sendMessage);

chatRouter.get("/", authUser, getChats);
chatRouter.get("/:chatId/messages", authUser, getMessages);
chatRouter.delete("/delete/:chatId", authUser, deleteChat);

export default chatRouter;
