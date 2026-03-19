import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { setCurrentChatId } from "../chats.slice";
import { PlusIcon, SendIcon, LogoIcon, DotsIcon } from "../../shared/icons.jsx";

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
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);
const ShareIcon = () => (
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
    width="13"
    height="13"
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
    width="15"
    height="15"
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
const LinkIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);
const SpinnerSVG = ({ size = 14 }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
    <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
  </svg>
);

// ─── Typing dots ──────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#20b2aa]/60"
        style={{
          animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes typingBounce {
        0%,60%,100% { transform:translateY(0); opacity:0.6; }
        30% { transform:translateY(-5px); opacity:1; }
      }
    `}</style>
  </div>
);

// ─── Sources Panel ────────────────────────────────────────────────────────────
const SourcesPanel = ({ sources }) => {
  if (!sources) return null;
  let blocks = [];
  if (typeof sources === "string")
    blocks = sources.split("\n\n").filter(Boolean);
  else if (Array.isArray(sources))
    blocks = sources.map(
      (s, i) => `[${i + 1}] ${s.title}\n${s.content}\nSource: ${s.url}`,
    );
  else return null;

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
    <div className="mt-4 pt-3 border-t border-[#161616]">
      <div className="flex items-center gap-1.5 text-[10px] text-[#333] uppercase tracking-widest font-semibold mb-2.5">
        <GlobeIcon /> Sources
      </div>
      <div className="flex flex-wrap gap-1.5">
        {parsed.map((s) => (
          <a
            key={s.index}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-[#1e1e1e] text-[#444] hover:text-[#20b2aa] hover:border-[#20b2aa]/20 hover:bg-[#20b2aa]/5 transition-all duration-150"
          >
            <span className="text-[#2a2a2a]">[{s.index}]</span>
            {s.title.slice(0, 30)}
            {s.title.length > 30 ? "…" : ""}
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (msg.role === "user") {
    return (
      <div className="flex justify-end mb-5">
        <div className="max-w-[78%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white/85 leading-relaxed bg-[#111] border border-[#1e1e1e]">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-7 group/msg">
      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center mt-0.5 shadow-[0_0_12px_rgba(32,178,170,0.3)]">
        <LogoIcon />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-bold text-[#20b2aa] tracking-widest uppercase">
            Perplexity
          </span>
          {msg.searched && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#20b2aa]/8 border border-[#20b2aa]/15 text-[#20b2aa]/70">
              <GlobeIcon /> searched web
            </span>
          )}
        </div>

        <div className="text-[#b0b0b8] text-sm leading-[1.8]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 text-[#b0b0b8] leading-[1.8]">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-[#888] italic">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 space-y-1.5 list-none pl-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 space-y-1.5 list-decimal pl-5 text-[#b0b0b8]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 text-[#b0b0b8]">
                  <span className="text-[#20b2aa] mt-1.5 flex-shrink-0 text-xs">
                    ▸
                  </span>
                  <span>{children}</span>
                </li>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="text-[#20b2aa] bg-[#20b2aa]/8 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-[#20b2aa]/10">
                    {children}
                  </code>
                ) : (
                  <code className="block bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4 text-[12px] font-mono text-[#999] overflow-x-auto my-3 leading-relaxed">
                    {children}
                  </code>
                ),
              pre: ({ children }) => <div className="my-3">{children}</div>,
              h1: ({ children }) => (
                <h1 className="text-white font-semibold text-base mb-2 mt-5 pb-1 border-b border-[#161616]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-white font-semibold text-sm mb-2 mt-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-[#ccc] font-medium text-sm mb-1.5 mt-3">
                  {children}
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#20b2aa]/30 pl-4 my-3 text-[#666] italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20b2aa] hover:text-[#2dd4bf] underline decoration-[#20b2aa]/20 underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-3 rounded-xl border border-[#1a1a1a]">
                  <table className="w-full text-xs border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-b border-[#1a1a1a] px-3 py-2 text-left text-[#888] font-semibold bg-[#0e0e0e] text-[11px] uppercase tracking-wide">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-[#131313] px-3 py-2 text-[#666] last:border-0">
                  {children}
                </td>
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        </div>

        <SourcesPanel sources={msg.sources} />

        <div className="mt-2.5 flex items-center gap-1 opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg text-[#2a2a2a] hover:text-[#666] hover:bg-[#111] transition-all border border-transparent hover:border-[#1a1a1a]"
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

// ─── Share Modal ──────────────────────────────────────────────────────────────
const ShareModal = ({ chat, onShare, onUnshare, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  // Local state so modal updates live without waiting for Redux round-trip
  const [sharedUrl, setSharedUrl] = useState(chat.shareUrl || null);
  const [isShared, setIsShared] = useState(chat.isShared || false);

  const copy = () => {
    navigator.clipboard.writeText(sharedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#0e0e0e] border border-[#1e1e1e] rounded-2xl w-full max-w-[380px] shadow-2xl overflow-hidden"
        style={{ animation: "modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[#161616]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#20b2aa]/10 border border-[#20b2aa]/15 flex items-center justify-center text-[#20b2aa]">
                <ShareIcon />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Share conversation
                </h3>
                <p className="text-[11px] text-[#333] mt-0.5">
                  Readers can view — not reply or edit
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#333] hover:text-[#666] transition-colors p-1 rounded-lg hover:bg-[#161616] mt-0.5"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          {isShared && sharedUrl ? (
            <>
              {/* Active badge */}
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#20b2aa] shadow-[0_0_6px_#20b2aa]"
                  style={{ animation: "pulseDot 2s infinite" }}
                />
                <span className="text-[11px] text-[#444]">
                  Link is live — anyone can read
                </span>
                <style>{`@keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
              </div>

              {/* URL row */}
              <div className="flex items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3 py-2.5">
                <span className="text-[#333]">
                  <LinkIcon />
                </span>
                <span className="text-[11px] text-[#444] flex-1 truncate font-mono">
                  {sharedUrl}
                </span>
                <button
                  onClick={copy}
                  className={`flex-shrink-0 text-[11px] flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all border ${
                    copied
                      ? "text-[#20b2aa] border-[#20b2aa]/20 bg-[#20b2aa]/5"
                      : "text-[#444] border-[#1e1e1e] hover:text-[#20b2aa] hover:border-[#20b2aa]/20"
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckIcon /> Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Revoke */}
              <button
                onClick={handleUnshare}
                disabled={loading}
                className="w-full text-[12px] py-2.5 rounded-xl border border-red-500/10 text-red-400/50 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {loading ? <SpinnerSVG size={12} /> : <XIcon />}
                {loading ? "Revoking…" : "Revoke link"}
              </button>
            </>
          ) : (
            <>
              <div className="bg-[#0a0a0a] border border-[#161616] rounded-xl px-4 py-3.5 text-[12px] text-[#333] leading-relaxed">
                Generate a public link for this chat. Anyone with the link can
                read the full conversation without logging in.
              </div>
              <button
                onClick={handleShare}
                disabled={loading}
                className="w-full text-sm py-2.5 rounded-xl bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] text-white font-semibold transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(32,178,170,0.18)]"
              >
                {loading ? (
                  <>
                    <SpinnerSVG size={13} /> Generating…
                  </>
                ) : (
                  <>
                    <ShareIcon /> Generate share link
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Chat List Item ───────────────────────────────────────────────────────────
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
          ? "bg-[#20b2aa]/8 border border-[#20b2aa]/12"
          : "hover:bg-[#0f0f0f] border border-transparent"
      }`}
      onClick={() => onOpen(chat.id)}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full bg-[#20b2aa]" />
      )}

      <span
        className={`flex-1 text-[13px] truncate transition-colors ${isActive ? "text-[#ccc]" : "text-[#555] group-hover:text-[#888]"}`}
      >
        {chat.title}
      </span>

      {chat.isShared && (
        <div
          className="w-1.5 h-1.5 rounded-full bg-[#20b2aa]/60 flex-shrink-0 shadow-[0_0_4px_#20b2aa]"
          title="Shared"
        />
      )}

      <div ref={menuRef} className="relative flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded-lg text-[#222] hover:text-[#555] hover:bg-[#181818] opacity-0 group-hover:opacity-100 transition-all"
        >
          <DotsIcon />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-7 z-20 bg-[#111] border border-[#1e1e1e] rounded-xl py-1 w-36 shadow-2xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onShare(chat);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[#555] hover:text-white hover:bg-[#181818] transition-colors"
            >
              <ShareIcon /> {chat.isShared ? "Manage share" : "Share"}
            </button>
            <div className="my-1 border-t border-[#181818]" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(chat.id);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition-colors"
            >
              <TrashIcon /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ onPrompt }) => {
  const prompts = [
    "What's happening in tech today?",
    "Explain quantum computing simply",
    "Best React practices in 2026",
    "Gold price in India today",
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-4 py-16">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#20b2aa] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(32,178,170,0.25)]">
          <LogoIcon />
        </div>
        <h2 className="text-xl font-semibold text-white mb-1.5 tracking-tight">
          Ask anything
        </h2>
        <p className="text-xs text-[#333] leading-relaxed">
          Powered by Gemini · searches the web when needed
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => onPrompt(p)}
            className="text-left text-[12px] px-3.5 py-3 rounded-xl border border-[#141414] text-[#3a3a3a] hover:text-[#777] hover:border-[#202020] hover:bg-[#0c0c0c] transition-all duration-150 leading-relaxed"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Topbar Share Button ──────────────────────────────────────────────────────
const TopbarShareBtn = ({ chat, onClick }) => {
  if (!chat) return null;
  const isShared = chat.isShared;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-200 border ${
        isShared
          ? "text-[#20b2aa] bg-[#20b2aa]/8 border-[#20b2aa]/15 hover:bg-[#20b2aa]/14 hover:border-[#20b2aa]/25"
          : "text-[#444] bg-transparent border-[#1a1a1a] hover:text-[#20b2aa] hover:border-[#20b2aa]/20 hover:bg-[#20b2aa]/5"
      }`}
    >
      <ShareIcon />
      <span>{isShared ? "Shared" : "Share"}</span>
      {isShared && (
        <>
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#20b2aa] shadow-[0_0_6px_#20b2aa]"
            style={{ animation: "pulseDot 2s infinite" }}
          />
          <style>{`@keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
        </>
      )}
    </button>
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

  // ── Real Redux state ──────────────────────────────────────────────────────
  const chats = useSelector((s) => s.chat.chats);
  const currentId = useSelector((s) => s.chat.currentChatId);
  const isLoading = useSelector((s) => s.chat.isLoading);
  const user = useSelector((s) => s.auth.user);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

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

  // Keep share modal in sync if Redux updates (e.g. after share/unshare)
  useEffect(() => {
    if (shareTarget && chats[shareTarget.id]) {
      setShareTarget(chats[shareTarget.id]);
    }
  }, [chats]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const trimmed = chatInput.trim();
      if (!trimmed || isLoading) return;
      setChatInput("");
      if (textareaRef.current) textareaRef.current.style.height = "24px";
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const doLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const openShareModal = (chat) => {
    setShareTarget(chat);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex text-white overflow-hidden">
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-30 h-screen w-60 flex-shrink-0 bg-[#080808] border-r border-[#111] flex flex-col transition-transform duration-200`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-[15px] border-b border-[#111]">
          <div className="w-7 h-7 rounded-xl bg-[#20b2aa] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(32,178,170,0.3)]">
            <LogoIcon />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Perplexity
          </span>
        </div>

        {/* New Chat */}
        <div className="px-2 py-2.5">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-[#141414] text-[#383838] hover:text-[#666] hover:border-[#1c1c1c] hover:bg-[#0d0d0d] transition-all text-[12px] group"
          >
            <span className="text-[#20b2aa]/50 group-hover:text-[#20b2aa]/80 transition-colors">
              <PlusIcon />
            </span>
            New chat
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#181818] [&::-webkit-scrollbar-thumb]:rounded-full">
          {sortedChats.length === 0 ? (
            <p className="text-[11px] text-[#202020] text-center mt-10 leading-relaxed">
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
                onShare={openShareModal}
              />
            ))
          )}
        </div>

        {/* User row */}
        <div className="px-2 py-2.5 border-t border-[#0f0f0f]">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#0d0d0d] transition-colors group cursor-default">
            <div className="w-6 h-6 rounded-full bg-[#20b2aa]/10 border border-[#20b2aa]/15 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-[#20b2aa]">
                {user?.username?.[0]?.toUpperCase()}
              </span>
            </div>
            <span className="text-[12px] text-[#333] truncate flex-1">
              {user?.username}
            </span>
            <button
              onClick={doLogout}
              title="Logout"
              className="text-[#222] hover:text-[#555] transition-colors opacity-0 group-hover:opacity-100"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar backdrop (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/70 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 h-[53px] border-b border-[#0f0f0f] flex-shrink-0 bg-[#080808]">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-[#333] hover:text-[#666] transition-colors flex-shrink-0"
          >
            <MenuIcon />
          </button>

          {/* Title */}
          <span className="text-[13px] text-[#2e2e2e] truncate flex-1">
            {currentChat?.title || (currentId ? "Chat" : "New conversation")}
          </span>

          {/* ── Share button — always visible when a chat is open ── */}
          {currentChat && (
            <TopbarShareBtn
              chat={currentChat}
              onClick={() => openShareModal(currentChat)}
            />
          )}
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#181818] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#252525]">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {currentMessages.length === 0 && !isLoading ? (
              <EmptyState
                onPrompt={(s) => {
                  setChatInput(s);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
              />
            ) : (
              <>
                {currentMessages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} />
                ))}
                {isLoading && (
                  <div className="flex gap-3 mb-6">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center mt-0.5 shadow-[0_0_10px_rgba(32,178,170,0.25)]">
                      <LogoIcon />
                    </div>
                    <div className="bg-[#0d0d0d] border border-[#161616] rounded-2xl px-4 py-3.5">
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
        <div className="border-t border-[#0d0d0d] bg-[#080808] px-4 py-3 flex-shrink-0">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end gap-3 bg-[#0d0d0d] border border-[#181818] rounded-2xl px-4 py-3 focus-within:border-[#20b2aa]/20 focus-within:shadow-[0_0_0_3px_rgba(32,178,170,0.04)] transition-all duration-200">
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
                className="flex-1 bg-transparent text-sm text-white placeholder-[#252525] outline-none resize-none leading-relaxed disabled:opacity-40"
                style={{ minHeight: "24px", maxHeight: "130px" }}
              />
              <button
                onClick={handleSubmit}
                disabled={!chatInput.trim() || isLoading}
                className="flex-shrink-0 w-7 h-7 rounded-xl bg-[#20b2aa] hover:bg-[#1aa39b] active:bg-[#178a82] disabled:opacity-20 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-[0_0_12px_rgba(32,178,170,0.2)] hover:shadow-[0_0_16px_rgba(32,178,170,0.35)]"
              >
                {isLoading ? <SpinnerSVG size={13} /> : <SendIcon />}
              </button>
            </div>
            <p className="text-center text-[10px] text-[#1a1a1a] mt-1.5">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>

      {/* Share Modal */}
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
