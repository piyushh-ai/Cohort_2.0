import { initializeSocketConnection, joinChat } from "../services/chat.socket";
import {
  sendMessage,
  getAllMessageByChat,
  getChats,
  deleteChat,
  shareChatApi,
  unshareChatApi,
} from "../services/chat.api";
import { useDispatch } from "react-redux";
import {
  createNewChat,
  addNewMessage,
  setCurrentChatId,
  setLoading,
  addMessages,
  setChats,
  setChatShared,
  removeChat,
} from "../chats.slice";
import { store } from "../../../app/app.store";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      // ✅ Step 1: Agar new chat hai toh placeholder banao
      let activeChatId = chatId;
      if (!chatId) {
        const tempId = "temp-" + Date.now();
        dispatch(createNewChat({ chatId: tempId, title: "New Chat" }));
        dispatch(setCurrentChatId(tempId));
        activeChatId = tempId;
      }

      // ✅ Step 2: Human message TURANT dikhao — API ka wait mat karo
      dispatch(
        addNewMessage({ chatId: activeChatId, content: message, role: "user" }),
      );

      // ✅ Step 3: Loading ON — AI typing indicator dikhega
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage, sources, searched } = data;

      const prevChats = store.getState().chat.chats;

      // Agar temp chat tha, real chat se replace karo
      if (!prevChats[chat._id]) {
        dispatch(
          createNewChat({ chatId: chat._id, title: chat.title || "New Chat" }),
        );
        // Temp chat ke messages real chat mein copy karo
        dispatch(
          addNewMessage({ chatId: chat._id, content: message, role: "user" }),
        );
      }

      // ✅ Step 4: AI response add karo
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
          sources: sources || null,
          searched: searched || false,
        }),
      );

      dispatch(setCurrentChatId(chat._id));
      joinChat(chat._id);

      // Temp chat cleanup
      if (activeChatId.startsWith("temp-")) {
        dispatch(removeChat(activeChatId));
      }
    } catch (error) {
      console.error("handleSendMessage error:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    try {
      const data = await getChats();
      dispatch(
        setChats(
          data.chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              isShared: chat.isShared || false,
              shareSlug: chat.shareSlug || null,
              shareUrl: chat.shareSlug
                ? `${window.location.origin}/share/${chat.shareSlug}`
                : null,
              lastUpdated: chat.updatedAt,
            };
            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      console.error("handleGetChats error:", error);
    }
  }

  async function handleOpenChat(chatId) {
    try {
      // Already messages loaded hain toh skip karo
      const existing = store.getState().chat.chats[chatId];
      if (existing?.messages?.length > 0) {
        dispatch(setCurrentChatId(chatId));
        return;
      }
      const data = await getAllMessageByChat({ chatId });
      dispatch(
        addMessages({
          chatId,
          messages: data.messages.map((msg) => ({
            content: msg.content,
            role: msg.role,
            sources: msg.sources || null,
            searched: msg.searched || false,
          })),
        }),
      );
      dispatch(setCurrentChatId(chatId));
      joinChat(chatId);
    } catch (error) {
      console.error("handleOpenChat error:", error);
    }
  }

  async function handleDeleteChat(chatId) {
    try {
      await deleteChat({ chatId });
      dispatch(removeChat(chatId));
    } catch (error) {
      console.error("handleDeleteChat error:", error);
    }
  }

  async function handleShareChat(chatId) {
    try {
      const data = await shareChatApi({ chatId });
      dispatch(
        setChatShared({
          chatId,
          isShared: true,
          shareSlug: data.shareSlug,
          shareUrl: data.shareUrl,
        }),
      );
      return data.shareUrl;
    } catch (error) {
      console.error("handleShareChat error:", error);
    }
  }

  async function handleUnshareChat(chatId) {
    try {
      await unshareChatApi({ chatId });
      dispatch(
        setChatShared({
          chatId,
          isShared: false,
          shareSlug: null,
          shareUrl: null,
        }),
      );
    } catch (error) {
      console.error("handleUnshareChat error:", error);
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleShareChat,
    handleUnshareChat,
  };
};
