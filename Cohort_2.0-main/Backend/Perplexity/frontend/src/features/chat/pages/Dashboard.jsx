import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { setCurrentChatId } from "../chats.slice";
import {
  PlusIcon,
  SendIcon,
  LogoIcon,
  DotsIcon,
  Ic,
} from "../../shared/icons.jsx";
import useFahhSound from "../../shared/useFahhSound .jsx";
import { G } from "../components/styles.jsx";
import { ShareModal } from "../components/ShareModal.jsx";
import { MessageBubble } from "../components/MessageBubble.jsx";
import { ChatItem } from "../components/ChatItem.jsx";

/* ─── EMPTY STATE ────────────────────────────────────────────────────────────── */
const EmptyState = ({ onPrompt }) => {
  const prompts = [
    "What's happening in tech today?",
    "Explain quantum computing simply",
    "Best React practices in 2026",
    "Gold price in India today",
  ];
  return (
    <div className="welcome">
      <div className="welcome-glow">
        <LogoIcon />
      </div>
      <div className="welcome-title">Ask anything</div>
      <div className="welcome-sub">
        Powered by Gemini · searches the web when needed
      </div>
      <div className="suggestions">
        {prompts.map((p, i) => (
          <button key={i} className="suggestion" onClick={() => onPrompt(p)}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── DASHBOARD ──────────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleShareChat,
    handleUnshareChat,
  } = useChat();
  const { handleLogout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [chatInput, setChatInput] = useState("");
  const [shareTarget, setShareTarget] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chats = useSelector((s) => s.chat.chats);
  const currentId = useSelector((s) => s.chat.currentChatId);
  const isLoading = useSelector((s) => s.chat.isLoading);
  const user = useSelector((s) => s.auth.user);

  const playFahh = useFahhSound();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const taRef = useRef(null);
  const prevLoadingRef = useRef(false);

  const currentChat = currentId ? chats[currentId] : null;
  const currentMessages = currentChat?.messages || [];
  const sortedChats = Object.values(chats)
    .filter((c) => !c.id?.startsWith("temp-"))
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  useEffect(() => {
    initializeSocketConnection();
    handleGetChats();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isLoading]);
  useEffect(() => {
    if (shareTarget && chats[shareTarget.id])
      setShareTarget(chats[shareTarget.id]);
  }, [chats]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const t = chatInput.trim();
      if (!t || isLoading) return;
      setChatInput("");
      if (taRef.current) taRef.current.style.height = "24px";
      await handleSendMessage({ message: t, chatId: currentId });
    },
    [chatInput, currentId, isLoading],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleTaChange = (e) => {
    setChatInput(e.target.value);
    e.target.style.height = "24px";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };
  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 60);
  };
  const doLogout = async () => {
    await handleLogout();
    navigate("/login");
  };
  const openShare = (chat) => {
    setShareTarget(chat);
    setSidebarOpen(false);
  };

  // Play fahh when AI finishes responding (isLoading: true → false)
  useEffect(() => {
    if (
      prevLoadingRef.current === true &&
      isLoading === false &&
      currentMessages.length > 0
    ) {
      playFahh();
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  return (
    <>
      <G />
      <div className="root">
        <div className="ambient" />

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-brand">
            <div className="brand-logo">
              <LogoIcon />
            </div>
            <span className="brand-name">Perplexity</span>
          </div>
          <button className="new-chat" onClick={handleNewChat}>
            <PlusIcon /> New chat
          </button>
          <div className="chat-section-label">Recent</div>
          <div className="chat-list">
            {sortedChats.length === 0 ? (
              <p
                style={{
                  fontSize: 11,
                  color: "var(--c-text4)",
                  textAlign: "center",
                  marginTop: 32,
                  lineHeight: 1.7,
                }}
              >
                No chats yet.
                <br />
                Start a conversation.
              </p>
            ) : (
              sortedChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentId}
                  onOpen={(id) => {
                    handleOpenChat(id);
                    setSidebarOpen(false);
                  }}
                  onDelete={handleDeleteChat}
                  onShare={openShare}
                />
              ))
            )}
          </div>
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <span className="user-name">{user?.username}</span>
              <button className="logout-btn" title="Logout" onClick={doLogout}>
                <Ic.Logout />
              </button>
            </div>
          </div>
        </aside>

        <div
          className={`backdrop ${sidebarOpen ? "show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── MAIN ── */}
        <main className="main">
          <header className="topbar">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Ic.Menu />
            </button>
            <span className="topbar-title">
              {currentChat?.title || (currentId ? "Chat" : "New conversation")}
            </span>
            {currentChat && (
              <button
                className={`share-btn ${currentChat.isShared ? "is-shared" : ""}`}
                onClick={() => openShare(currentChat)}
              >
                <Ic.Share />
                <span>{currentChat.isShared ? "Shared" : "Share"}</span>
                {currentChat.isShared && <div className="share-live-dot" />}
              </button>
            )}
          </header>

          <div className="messages-wrap">
            <div className="messages-inner">
              {currentMessages.length === 0 && !isLoading ? (
                <EmptyState
                  onPrompt={(s) => {
                    setChatInput(s);
                    setTimeout(() => inputRef.current?.focus(), 60);
                  }}
                />
              ) : (
                <>
                  {currentMessages.map((msg, i) => (
                    <MessageBubble key={i} msg={msg} />
                  ))}
                  {isLoading && (
                    <div className="typing-wrap">
                      <div className="ai-avatar">
                        <LogoIcon />
                      </div>
                      <div className="typing-dots">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>

          <div className="input-area">
            <div className="input-wrap">
              <div className="input-box">
                <textarea
                  ref={(el) => {
                    inputRef.current = el;
                    taRef.current = el;
                  }}
                  className="input-ta"
                  value={chatInput}
                  onChange={handleTaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything…"
                  rows={1}
                  disabled={isLoading}
                  style={{ minHeight: 24, maxHeight: 140 }}
                />
                <button
                  className="send-btn"
                  onClick={handleSubmit}
                  disabled={!chatInput.trim() || isLoading}
                >
                  {isLoading ? <Ic.Spin s={14} /> : <SendIcon />}
                </button>
              </div>
              <div className="input-hint">
                Enter to send · Shift+Enter for new line
              </div>
            </div>
          </div>
        </main>

        {shareTarget && (
          <ShareModal
            chat={shareTarget}
            onShare={handleShareChat}
            onUnshare={handleUnshareChat}
            onClose={() => setShareTarget(null)}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
