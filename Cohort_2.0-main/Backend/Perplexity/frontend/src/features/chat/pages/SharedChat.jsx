import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getSharedChatApi } from "../services/chat.api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LogoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

/* ── Inline styles for SharedChat (no Tailwind dependency for markdown) ── */
const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    .sc-root {
      min-height: 100vh;
      background: #0a0a0f;
      color: #f0f0f8;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* ambient */
    .sc-ambient {
      pointer-events: none; position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 55% 35% at 10% 0%, rgba(45,212,191,0.09) 0%, transparent 65%),
        radial-gradient(ellipse 35% 40% at 90% 100%, rgba(45,212,191,0.05) 0%, transparent 65%);
    }

    .sc-inner {
      position: relative; z-index: 1;
      max-width: 720px; margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* header bar */
    .sc-header {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .sc-logo {
      width: 30px; height: 30px; border-radius: 9px;
      background: linear-gradient(135deg, #0d9488, #2dd4bf);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 0 18px rgba(45,212,191,0.35);
    }
    .sc-brand { font-size: 14px; font-weight: 700; color: #f0f0f8; letter-spacing: -0.01em; }
    .sc-dot { color: rgba(255,255,255,0.12); font-size: 16px; }
    .sc-owner { font-size: 12px; color: #5a5a7a; }
    .sc-owner span { color: #7878a0; font-weight: 500; }

    /* chat meta */
    .sc-title { font-size: 22px; font-weight: 700; color: #f0f0f8; margin-bottom: 6px; letter-spacing: -0.02em; line-height: 1.3; }
    .sc-date { font-size: 12px; color: #3a3a55; margin-bottom: 40px; }

    /* shared badge */
    .sc-shared-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 99px;
      background: rgba(45,212,191,0.07);
      border: 1px solid rgba(45,212,191,0.18);
      font-size: 11px; font-weight: 600; color: rgba(45,212,191,0.7);
      letter-spacing: 0.06em; text-transform: uppercase;
      margin-bottom: 32px;
    }
    .sc-shared-dot {
      width: 5px; height: 5px; border-radius: 99px;
      background: #2dd4bf; box-shadow: 0 0 6px #2dd4bf;
      animation: scPulse 2.5s ease-in-out infinite;
    }
    @keyframes scPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

    /* messages */
    .sc-messages { display: flex; flex-direction: column; gap: 24px; }

    /* user bubble */
    .sc-user { display: flex; justify-content: flex-end; }
    .sc-user-bubble {
      max-width: 76%;
      padding: 13px 18px;
      background: #161620;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px 20px 4px 20px;
      font-size: 14.5px; line-height: 1.65;
      color: rgba(240,240,248,0.9);
    }

    /* ai bubble */
    .sc-ai { display: flex; gap: 14px; }
    .sc-ai-avatar {
      width: 30px; height: 30px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #0d9488, #2dd4bf);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 18px rgba(45,212,191,0.30);
      margin-top: 2px;
    }
    .sc-ai-label {
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: #2dd4bf;
      margin-bottom: 10px;
    }
    .sc-ai-body { flex: 1; min-width: 0; }

    /* markdown */
    .sc-md { font-size: 14.5px; line-height: 1.85; color: #b0b0cc; font-family: 'DM Sans', sans-serif; }
    .sc-md p { margin-bottom: 12px; }
    .sc-md p:last-child { margin-bottom: 0; }
    .sc-md strong { color: #f0f0f8; font-weight: 600; }
    .sc-md em { color: #9090b8; font-style: italic; }
    .sc-md code {
      font-family: 'DM Mono', monospace; font-size: 13px;
      background: rgba(45,212,191,0.08); border: 1px solid rgba(45,212,191,0.15);
      padding: 2px 7px; border-radius: 6px; color: #4dd8c4;
    }
    .sc-md pre {
      background: #161620; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px; padding: 18px; overflow-x: auto; margin: 14px 0;
    }
    .sc-md pre code { background: none; border: none; padding: 0; color: #9090b8; }
    .sc-md ul { list-style: none; padding: 0; margin-bottom: 12px; }
    .sc-md ul > li { display: flex; gap: 8px; color: #b0b0cc; margin-bottom: 6px; line-height: 1.75; }
    .sc-md ul > li::before { content: '▸'; color: #2dd4bf; flex-shrink: 0; margin-top: 3px; font-size: 11px; }
    .sc-md ol { padding-left: 22px; margin-bottom: 12px; color: #b0b0cc; }
    .sc-md ol > li { margin-bottom: 6px; line-height: 1.75; }
    /* table cells must never inherit list styles */
    .sc-md td, .sc-md th { display: table-cell !important; }
    .sc-md td::before, .sc-md th::before { content: none !important; display: none !important; }
    .sc-md h1,.sc-md h2,.sc-md h3 { color: #f0f0f8; font-weight: 600; margin: 18px 0 8px; }
    .sc-md h1 { font-size: 18px; }
    .sc-md h2 { font-size: 16px; }
    .sc-md h3 { font-size: 15px; }
    .sc-md blockquote { border-left: 2px solid rgba(45,212,191,0.35); padding-left: 16px; margin: 14px 0; color: #7070a0; font-style: italic; }
    .sc-md a { color: #2dd4bf; text-decoration: none; border-bottom: 1px solid rgba(45,212,191,0.3); }
    .sc-md a:hover { border-color: #2dd4bf; }
    .sc-md table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13.5px; }
    .sc-md th { background: #161620; border: 1px solid rgba(255,255,255,0.08); padding: 9px 13px; text-align: left; color: #9898b8; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
    .sc-md td { border: 1px solid rgba(255,255,255,0.06); padding: 9px 13px; color: #8888aa; }

    /* divider */
    .sc-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 48px 0 28px; }

    /* footer */
    .sc-footer { text-align: center; }
    .sc-cta {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 20px; border-radius: 12px;
      background: rgba(45,212,191,0.08);
      border: 1px solid rgba(45,212,191,0.2);
      font-size: 13px; font-weight: 600; color: #2dd4bf;
      text-decoration: none; transition: all 0.18s;
    }
    .sc-cta:hover {
      background: rgba(45,212,191,0.14);
      border-color: rgba(45,212,191,0.35);
      box-shadow: 0 0 20px rgba(45,212,191,0.15);
      transform: translateY(-1px);
    }

    /* loading */
    .sc-loading {
      min-height: 100vh; background: #0a0a0f;
      display: flex; align-items: center; justify-content: center;
    }
    .sc-spin { animation: spin 0.75s linear infinite; color: #2dd4bf; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* error */
    .sc-error {
      min-height: 100vh; background: #0a0a0f;
      display: flex; align-items: center; justify-content: center; padding: 24px;
    }
    .sc-error-card {
      text-align: center; max-width: 300px;
    }
    .sc-error-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: linear-gradient(135deg, #0d9488, #2dd4bf);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 18px;
      box-shadow: 0 0 28px rgba(45,212,191,0.3);
    }
    .sc-error-msg { font-size: 14px; color: #5a5a7a; margin-bottom: 18px; line-height: 1.6; }
    .sc-error-link { font-size: 12.5px; color: #2dd4bf; text-decoration: none; font-weight: 500; }
    .sc-error-link:hover { color: #4dd8c4; }

    @media (max-width: 640px) {
      .sc-inner { padding: 28px 16px 60px; }
      .sc-user-bubble { max-width: 88%; font-size: 14px; }
      .sc-title { font-size: 18px; }
    }
  `}</style>
);

const mdComponents = {
  p: ({ children }) => <p>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children }) => <code>{children}</code>,
  pre: ({ children }) => <pre>{children}</pre>,
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  table: ({ children }) => <table>{children}</table>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
};

const SharedChat = () => {
  const { shareSlug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSharedChatApi({ shareSlug })
      .then(setData)
      .catch(() => setError("Chat not found or link has been revoked."));
  }, [shareSlug]);

  if (error)
    return (
      <>
        <S />
        <div className="sc-error">
          <div className="sc-error-card">
            <div className="sc-error-icon"><LogoIcon /></div>
            <p className="sc-error-msg">{error}</p>
            <Link to="/login" className="sc-error-link">← Go to app</Link>
          </div>
        </div>
      </>
    );

  if (!data)
    return (
      <>
        <S />
        <div className="sc-loading">
          <svg className="sc-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
            <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
          </svg>
        </div>
      </>
    );

  return (
    <>
      <S />
      <div className="sc-root">
        <div className="sc-ambient" />
        <div className="sc-inner">

          {/* Header */}
          <div className="sc-header">
            <div className="sc-logo"><LogoIcon /></div>
            <span className="sc-brand">Perplexity</span>
            <span className="sc-dot">·</span>
            <span className="sc-owner">Shared by <span>{data.chat.owner}</span></span>
          </div>

          {/* Meta */}
          <div className="sc-shared-badge">
            <div className="sc-shared-dot" />
            Public conversation
          </div>
          <h1 className="sc-title">{data.chat.title}</h1>
          <p className="sc-date">{new Date(data.chat.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          {/* Messages */}
          <div className="sc-messages">
            {data.messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} className="sc-user">
                  <div className="sc-user-bubble">{msg.content}</div>
                </div>
              ) : (
                <div key={i} className="sc-ai">
                  <div className="sc-ai-avatar"><LogoIcon /></div>
                  <div className="sc-ai-body">
                    <div className="sc-ai-label">Perplexity</div>
                    <div className="sc-md">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <hr className="sc-divider" />
          <div className="sc-footer">
            <Link to="/" className="sc-cta">
              Try Perplexity →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default SharedChat;