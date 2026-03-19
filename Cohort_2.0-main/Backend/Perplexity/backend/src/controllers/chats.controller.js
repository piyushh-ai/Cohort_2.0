import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import {
  generateAgentResponse,
  generateTitle,
} from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  try {
    let title;
    let chat;

    if (!chatId) {
      title = await generateTitle(message);
      chat = await chatModel.create({ user: req.user.id, title });
    }

    const currentChatId = chatId || chat._id;

    // Security: verify chat belongs to this user
    if (chatId) {
      const existingChat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id,
      });
      if (!existingChat) {
        return res.status(404).json({ error: "Chat not found" });
      }
    }

    const previousMessages = await messageModel
      .find({ chat: currentChatId })
      .sort({ createdAt: 1 });

    await messageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    const allMessages = [
      ...previousMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Agent decides: search karna hai ya direct answer
    const { content, sources, searched } =
      await generateAgentResponse(allMessages);

    const aiMessage = await messageModel.create({
      chat: currentChatId,
      content,
      role: "ai",
    });

    res.status(201).json({
      title,
      chat: chat || { _id: currentChatId },
      aiMessage,
      searched, // frontend ko pata chale ki search hua ya nahi
      sources, // source links
    });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export async function getChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user.id })
      .sort({ updatedAt: -1 });
    res.status(200).json({ message: "Chats retrieved successfully", chats });
  } catch (err) {
    console.error("getChats error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });
    res
      .status(200)
      .json({ message: "Messages retrieved successfully", messages });
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await messageModel.deleteMany({ chat: chatId });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.error("deleteChat error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
