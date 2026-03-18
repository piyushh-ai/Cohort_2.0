import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateMessage, generateTitle } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  try {
    let title;
    let chat;

    // 🧠 Step 1: Create new chat if not exists
    if (!chatId) {
      title = await generateTitle(message);

      chat = await chatModel.create({
        user: req.user.id,
        title,
      });
    }

    const currentChatId = chatId || chat._id;

    // 📜 Step 2: Get previous messages
    const previousMessages = await messageModel.find({
      chat: currentChatId,
    });

    // 👤 Step 3: Save user message
    const humanMessage = await messageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    // 🧠 Step 4: Prepare messages for AI (IMPORTANT)
    const allMessages = [
      ...previousMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message }, // latest message add
    ];

    // 🤖 Step 5: Generate AI response
    const result = await generateMessage(allMessages);

    // 🛡️ Step 6: Safe content (avoid array crash)
    const safeResult = Array.isArray(result) ? result[0]?.text || "" : result;

    // 🤖 Step 7: Save AI message
    const aiMessage = await messageModel.create({
      chat: currentChatId,
      content: safeResult,
      role: "ai",
    });

    // 📤 Step 8: Response
    res.status(201).json({
      title,
      chat,
      humanMessage,
      aiMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(200).json({
    message: "Chats retrieved successfully",
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Messages retrieved successfully",
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  res.status(200).json({
    message: "Chat deleted successfully",
  });
}
