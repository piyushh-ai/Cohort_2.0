import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PlusIcon, SendIcon, LogoIcon, DotsIcon } from "../../shared/icons.jsx";
import { setCurrentChatId } from "../chats.slice";
import { useDispatch } from "react-redux";

// ─── Icons ────────────────────────────────────────────────────────────────────
const TrashIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const ShareIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const CopyIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const GlobeIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Typing dots ──────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1 px-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-[#20b2aa]/70"
        style={{
          animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
        30% { transform: translateY(-6px); opacity: 1; }
      }
    `}</style>
  </div>
);

// ─── Sources panel ────────────────────────────────────────────────────────────
const SourcesPanel = ({ sources }) => {
  if (!sources) return null;

  let blocks = [];
  if (typeof sources === "string") {
    blocks = sources.split("\n\n").filter(Boolean);
  } else if (Array.isArray(sources)) {
    blocks = sources.map(
      (s, i) => `[${i + 1}] ${s.title}\n${s.content}\nSource: ${s.url}`,
    );
  } else return null;

  const parsed = blocks
    .map((block, i) => {
      const urlMatch = block.match(/Source:\s*(https?:\/\/[^\s]+)/);
      const titleMatch = block.match(/^\[(\d+)\]\s(.+)/);
      return {
        url: urlMatch?.[1],
        title: titleMatch?.[2]?.split("\n")[0] || `Source ${i + 1}`,
        index: i + 1,
      };
    })
    .filter((s) => s.url);

  if (!parsed.length) return null;

  return (
    <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
      <div className="flex items-center gap-1.5 text-[11px] text-[#444] uppercase tracking-wider font-medium mb-2">
        <GlobeIcon /> Sources
      </div>
      <div className="flex flex-wrap gap-1.5">
        {parsed.map((s) => (
          <a
            key={s.index}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-[#1e1e1e] text-[#555] hover:text-[#20b2aa] hover:border-[#20b2aa]/25 transition-all"
          >
            <span className="text-[#333]">[{s.index}]</span>
            {s.title.slice(0, 28)}
            {s.title.length > 28 ? "…" : ""}
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Message bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (msg.role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white/90 leading-relaxed bg-[#1a2a2a] border border-[#20b2aa]/15">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center mt-0.5">
        <LogoIcon />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-[#20b2aa] tracking-widest uppercase">
            Perplexity
          </span>
          {msg.searched && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#20b2aa]/10 border border-[#20b2aa]/20 text-[#20b2aa]">
              <GlobeIcon /> searched web
            </span>
          )}
        </div>

        {/* ✅ Fixed: remark-gfm for tables, lists, etc. */}
        <div className="text-[#bbb] text-sm leading-7">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 text-[#bbb] leading-7">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-[#aaa] italic">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 space-y-1 list-none pl-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 space-y-1 list-decimal pl-5 text-[#bbb]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 text-[#bbb]">
                  <span className="text-[#20b2aa] mt-1.5 flex-shrink-0">•</span>
                  <span>{children}</span>
                </li>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="text-[#20b2aa] bg-[#20b2aa]/10 px-1.5 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 text-xs font-mono text-[#aaa] overflow-x-auto my-3">
                    {children}
                  </code>
                ),
              pre: ({ children }) => <div className="my-3">{children}</div>,
              h1: ({ children }) => (
                <h1 className="text-white font-semibold text-lg mb-2 mt-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-white font-semibold text-base mb-2 mt-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-white font-medium text-sm mb-1.5 mt-3">
                  {children}
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#20b2aa]/40 pl-4 my-3 text-[#888] italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20b2aa] hover:text-[#2dd4bf] underline decoration-[#20b2aa]/30"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-3">
                  <table className="w-full text-xs border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-[#222] px-3 py-2 text-left text-white font-medium bg-[#111]">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-[#1a1a1a] px-3 py-2 text-[#aaa]">
                  {children}
                </td>
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        </div>

        <SourcesPanel sources={msg.sources} />

        <div className="mt-2 flex items-center gap-0.5">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg text-[#333] hover:text-[#777] hover:bg-[#141414] transition-all"
          >
            {copied ? (
              <>
                <CheckIcon /> Copied
              </>
            ) : (
              <>
                <CopyIcon /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Share modal ──────────────────────────────────────────────────────────────
const ShareModal = ({ chat, onShare, onUnshare, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  // ✅ Local state — modal mein live update
  const [sharedUrl, setSharedUrl] = useState(chat.shareUrl || null);
  const [isShared, setIsShared] = useState(chat.isShared || false);

  const copy = () => {
    navigator.clipboard.writeText(sharedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShare = async () => {
    setLoading(true);
    const url = await onShare(chat.id);
    if (url) {
      setSharedUrl(url);
      setIsShared(true);
    }
    setLoading(false);
  };

  const handleUnshare = async () => {
    setLoading(true);
    await onUnshare(chat.id);
    setSharedUrl(null);
    setIsShared(false);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-white">
            Share conversation
          </h3>
          <button
            onClick={onClose}
            className="text-[#444] hover:text-[#888] transition-colors p-1"
          >
            <XIcon />
          </button>
        </div>
        <p className="text-xs text-[#444] mb-5 leading-relaxed">
          Anyone with the link can read — they cannot reply or edit.
        </p>

        {isShared && sharedUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-3 py-2.5">
              <span className="text-xs text-[#444] flex-1 truncate font-mono">
                {sharedUrl}
              </span>
              <button
                onClick={copy}
                className="flex-shrink-0 text-[11px] flex items-center gap-1 text-[#20b2aa] hover:text-[#2dd4bf] transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <CheckIcon /> Copied
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy
                  </>
                )}
              </button>
            </div>
            <button
              onClick={handleUnshare}
              disabled={loading}
              className="w-full text-xs py-2 rounded-xl border border-red-500/15 text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-all disabled:opacity-40"
            >
              {loading ? "Revoking…" : "Revoke link"}
            </button>
          </div>
        ) : (
          <button
            onClick={handleShare}
            disabled={loading}
            className="w-full text-sm py-2.5 rounded-xl bg-[#20b2aa] hover:bg-[#1aa39b] text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                  <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                </svg>{" "}
                Generating…
              </>
            ) : (
              <>
                <ShareIcon /> Generate link
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Chat list item ───────────────────────────────────────────────────────────
const ChatItem = ({ chat, isActive, onOpen, onDelete, onShare }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div
      className={`group relative flex items-center gap-2 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-150 ${
        isActive
          ? "bg-[#20b2aa]/10 border border-[#20b2aa]/15"
          : "hover:bg-[#111] border border-transparent"
      }`}
      onClick={() => onOpen(chat.id)}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-[#20b2aa]" />
      )}
      <span className="flex-1 text-sm truncate text-[#666] group-hover:text-[#aaa] transition-colors">
        {chat.title}
      </span>
      {chat.isShared && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#20b2aa]/50 flex-shrink-0" />
      )}

      <div ref={menuRef} className="relative flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded-lg text-[#333] hover:text-[#666] hover:bg-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-all"
        >
          <DotsIcon />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-7 z-20 bg-[#131313] border border-[#1e1e1e] rounded-xl py-1 w-36 shadow-xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onShare(chat);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <ShareIcon /> Share
            </button>
            <div className="my-1 border-t border-[#1a1a1a]" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(chat.id);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-colors"
            >
              <TrashIcon /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ onPrompt }) => {
  const prompts = [
    "What's happening in tech today?",
    "Explain quantum computing simply",
    "Best React practices in 2026",
    "Gold price in India today",
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-4 py-12">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#20b2aa] flex items-center justify-center mx-auto mb-4">
          <LogoIcon />
        </div>
        <h2 className="text-lg font-semibold text-white mb-1">Ask anything</h2>
        <p className="text-xs text-[#444]">
          Powered by Gemini · searches web when needed
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => onPrompt(p)}
            className="text-left text-xs px-3.5 py-3 rounded-xl border border-[#161616] text-[#444] hover:text-[#888] hover:border-[#222] hover:bg-[#0e0e0e] transition-all leading-relaxed"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
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

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const sortedChats = Object.values(chats)
    .filter((c) => !c.id?.startsWith("temp-"))
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  const currentMessages = currentId ? chats[currentId]?.messages || [] : [];

  useEffect(() => {
    initializeSocketConnection();
    handleGetChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isLoading]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const trimmed = chatInput.trim();
      if (!trimmed || isLoading) return;
      setChatInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "24px";
      }
      await handleSendMessage({ message: trimmed, chatId: currentId });
    },
    [chatInput, currentId, isLoading],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e) => {
    setChatInput(e.target.value);
    e.target.style.height = "24px";
    e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
  };

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    setSidebarOpen(false);
    inputRef.current?.focus();
  };

  const doLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#080808] flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-30 h-screen w-60 flex-shrink-0 bg-[#0b0b0b] border-r border-[#131313] flex flex-col transition-transform duration-200`}
      >
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#131313]">
          <div className="w-7 h-7 rounded-xl bg-[#20b2aa] flex items-center justify-center flex-shrink-0">
            <LogoIcon />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Perplexity
          </span>
        </div>

        <div className="px-2 py-2.5">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-[#161616] text-[#444] hover:text-[#888] hover:border-[#222] hover:bg-[#0e0e0e] transition-all text-xs"
          >
            <PlusIcon /> New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1e1e1e] [&::-webkit-scrollbar-thumb]:rounded-full">
          {sortedChats.length === 0 ? (
            <p className="text-[11px] text-[#2a2a2a] text-center mt-8">
              No chats yet
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
                onShare={(c) => {
                  setShareTarget(c);
                  setSidebarOpen(false);
                }}
              />
            ))
          )}
        </div>

        <div className="px-2 py-2.5 border-t border-[#131313]">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-6 h-6 rounded-full bg-[#20b2aa]/15 border border-[#20b2aa]/25 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-semibold text-[#20b2aa]">
                {user?.username?.[0]?.toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-[#444] truncate flex-1">
              {user?.username}
            </span>
            <button
              onClick={doLogout}
              title="Logout"
              className="text-[#2a2a2a] hover:text-[#666] transition-colors p-0.5"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[#111]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#444] hover:text-white transition-colors"
          >
            <MenuIcon />
          </button>
          <span className="text-sm font-medium text-[#888]">
            {currentId ? chats[currentId]?.title || "Chat" : "Perplexity"}
          </span>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1e1e1e] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#2a2a2a]">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {currentMessages.length === 0 && !isLoading ? (
              <EmptyState
                onPrompt={(s) => {
                  setChatInput(s);
                  inputRef.current?.focus();
                }}
              />
            ) : (
              <>
                {currentMessages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} />
                ))}

                {/* ✅ AI loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 mb-6">
                    <div className="w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <LogoIcon />
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl px-4 py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#0f0f0f] bg-[#080808] px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end gap-2 bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl px-4 py-3 focus-within:border-[#20b2aa]/25 transition-colors">
              <textarea
                ref={(el) => {
                  inputRef.current = el;
                  textareaRef.current = el;
                }}
                value={chatInput}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything…"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#2a2a2a] outline-none resize-none leading-relaxed disabled:opacity-50"
                style={{ minHeight: "24px", maxHeight: "130px" }}
              />
              <button
                onClick={handleSubmit}
                disabled={!chatInput.trim() || isLoading}
                className="flex-shrink-0 w-7 h-7 rounded-xl bg-[#20b2aa] hover:bg-[#1aa39b] disabled:opacity-25 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
              >
                <SendIcon />
              </button>
            </div>
            <p className="text-center text-[10px] text-[#1e1e1e] mt-1.5">
              Enter to send · Shift+Enter for new line
            </p>
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
  );
};

export default Dashboard;
