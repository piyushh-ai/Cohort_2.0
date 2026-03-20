import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { setCurrentChatId } from "../chats.slice";
import { PlusIcon, SendIcon, LogoIcon, DotsIcon } from "../../shared/icons.jsx";

/* ─── GLOBAL STYLES ────────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --c-bg:       #0a0a0f;
      --c-s1:       #0f0f17;
      --c-s2:       #161620;
      --c-s3:       #1e1e2e;
      --c-s4:       #252538;
      --c-border:   rgba(255,255,255,0.08);
      --c-border2:  rgba(255,255,255,0.13);
      --c-teal:     #2dd4bf;
      --c-teal2:    #14b8a6;
      --c-teal3:    #0d9488;
      --c-glow:     rgba(45,212,191,0.18);
      --c-glow2:    rgba(45,212,191,0.10);
      --c-glow3:    rgba(45,212,191,0.05);
      --c-text:     #f0f0f8;
      --c-text2:    #9898b8;
      --c-text3:    #5a5a7a;
      --c-text4:    #32324a;
      --c-red:      #f87171;
      --f-sans:     'DM Sans', sans-serif;
      --f-mono:     'DM Mono', monospace;
      --r:          16px;
      --r-sm:       10px;
      --sidebar:    272px;
      --topbar:     58px;
    }

    html, body { height: 100%; overflow: hidden; }
    body { font-family: var(--f-sans); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--c-s4); border-radius: 99px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--c-text3); }

    /* ── Layout ── */
    .root { display: flex; height: 100dvh; width: 100vw; overflow: hidden; position: relative; }

    /* ── Ambient light — more vivid ── */
    .ambient {
      pointer-events: none; position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 60% 40% at 12% 0%, rgba(45,212,191,0.10) 0%, transparent 70%),
        radial-gradient(ellipse 40% 55% at 92% 95%, rgba(45,212,191,0.07) 0%, transparent 65%),
        radial-gradient(ellipse 30% 30% at 50% 50%, rgba(45,212,191,0.03) 0%, transparent 70%);
    }

    /* ── Sidebar ── */
    .sidebar {
      position: relative; z-index: 20;
      width: var(--sidebar); flex-shrink: 0;
      height: 100dvh;
      display: flex; flex-direction: column;
      background: var(--c-s1);
      border-right: 1px solid var(--c-border);
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    }
    @media (max-width: 767px) {
      .sidebar { position: fixed; top: 0; left: 0; bottom: 0; transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); box-shadow: 0 0 60px rgba(0,0,0,0.9); }
    }

    .sidebar-brand {
      display: flex; align-items: center; gap: 10px;
      padding: 18px 16px 16px;
      border-bottom: 1px solid var(--c-border);
    }
    .brand-logo {
      width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 24px rgba(45,212,191,0.4), 0 2px 8px rgba(0,0,0,0.4);
    }
    .brand-name {
      font-size: 15px; font-weight: 700; letter-spacing: -0.02em;
      color: var(--c-text);
    }

    .new-chat {
      margin: 12px 12px 8px;
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      border-radius: var(--r-sm);
      border: 1px dashed rgba(45,212,191,0.25);
      background: var(--c-glow3);
      color: var(--c-text3);
      font-family: var(--f-sans); font-size: 13px; font-weight: 500;
      cursor: pointer; transition: all 0.18s;
    }
    .new-chat:hover {
      border-color: var(--c-teal); color: var(--c-teal);
      background: var(--c-glow2);
      box-shadow: 0 0 20px rgba(45,212,191,0.10);
    }
    .new-chat svg { flex-shrink: 0; }

    .chat-section-label {
      padding: 10px 16px 5px;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--c-text4);
    }

    .chat-list { flex: 1; overflow-y: auto; padding: 2px 8px 8px; }

    .chat-item {
      position: relative;
      display: flex; align-items: center; gap: 8px;
      padding: 9px 10px 9px 12px;
      border-radius: var(--r-sm);
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s;
      margin-bottom: 2px;
    }
    .chat-item:hover { background: var(--c-s2); border-color: var(--c-border); }
    .chat-item.active {
      background: var(--c-glow2);
      border-color: rgba(45,212,191,0.2);
    }
    .chat-item.active::before {
      content: ''; position: absolute; left: -1px; top: 50%; transform: translateY(-50%);
      width: 2px; height: 20px; border-radius: 99px;
      background: var(--c-teal);
      box-shadow: 0 0 10px var(--c-teal);
    }
    .chat-title {
      flex: 1; font-size: 13px; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
      color: var(--c-text3); transition: color 0.15s;
    }
    .chat-item:hover .chat-title { color: var(--c-text2); }
    .chat-item.active .chat-title { color: var(--c-text); font-weight: 500; }

    .shared-pip {
      width: 6px; height: 6px; border-radius: 99px;
      background: var(--c-teal); flex-shrink: 0;
      box-shadow: 0 0 8px var(--c-teal);
      animation: pipPulse 2.5s ease-in-out infinite;
    }
    @keyframes pipPulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

    .chat-item-actions { display: none; align-items: center; gap: 1px; }
    .chat-item:hover .chat-item-actions { display: flex; }
    .icon-btn-sm {
      width: 26px; height: 26px; border: none; background: none;
      color: var(--c-text4); cursor: pointer; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .icon-btn-sm:hover { background: var(--c-s3); color: var(--c-text2); }
    .icon-btn-sm.danger:hover { background: rgba(248,113,113,0.12); color: var(--c-red); }

    .sidebar-footer {
      padding: 10px 12px 14px;
      border-top: 1px solid var(--c-border);
    }
    .user-row {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 10px; border-radius: var(--r-sm);
      cursor: pointer; transition: background 0.15s;
    }
    .user-row:hover { background: var(--c-s2); }
    .user-avatar {
      width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
      background: linear-gradient(135deg, #0d2a2a, #0f3838);
      border: 1px solid rgba(45,212,191,0.25);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: var(--c-teal);
      box-shadow: 0 0 12px rgba(45,212,191,0.1);
    }
    .user-name { font-size: 12.5px; color: var(--c-text2); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
    .logout-btn {
      width: 28px; height: 28px; border: none; background: none;
      color: var(--c-text3); cursor: pointer; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; flex-shrink: 0;
    }
    .logout-btn:hover { background: var(--c-s3); color: var(--c-text); }

    /* ── Backdrop ── */
    .backdrop {
      display: none; position: fixed; inset: 0; z-index: 19;
      background: rgba(0,0,0,0.8); backdrop-filter: blur(6px);
    }
    .backdrop.show { display: block; }

    /* ── Main ── */
    .main { flex: 1; display: flex; flex-direction: column; height: 100dvh; min-width: 0; position: relative; z-index: 1; }

    /* ── Topbar ── */
    .topbar {
      height: var(--topbar); flex-shrink: 0;
      display: flex; align-items: center; gap: 12px;
      padding: 0 20px;
      border-bottom: 1px solid var(--c-border);
      background: rgba(10,10,15,0.90);
      backdrop-filter: blur(20px);
      position: relative; z-index: 5;
    }
    .menu-toggle {
      width: 34px; height: 34px; border: none;
      background: var(--c-s2); border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      color: var(--c-text2); cursor: pointer; flex-shrink: 0;
      transition: all 0.15s;
      border: 1px solid var(--c-border);
    }
    .menu-toggle:hover { background: var(--c-s3); color: var(--c-text); }
    @media (min-width: 768px) { .menu-toggle { display: none; } }

    .topbar-title {
      flex: 1; font-size: 14px; font-weight: 500;
      color: var(--c-text2); white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }

    .share-btn {
      display: flex; align-items: center; gap: 7px;
      padding: 7px 14px;
      border-radius: 10px;
      border: 1px solid var(--c-border2);
      background: var(--c-s2);
      color: var(--c-text2);
      font-family: var(--f-sans); font-size: 12.5px; font-weight: 600;
      cursor: pointer; flex-shrink: 0;
      transition: all 0.2s;
    }
    .share-btn:hover {
      border-color: var(--c-teal); color: var(--c-teal);
      background: var(--c-glow2);
      box-shadow: 0 0 20px rgba(45,212,191,0.15);
    }
    .share-btn.is-shared {
      border-color: rgba(45,212,191,0.35);
      color: var(--c-teal);
      background: var(--c-glow2);
      box-shadow: 0 0 18px rgba(45,212,191,0.12);
    }
    .share-live-dot {
      width: 6px; height: 6px; border-radius: 99px;
      background: var(--c-teal);
      box-shadow: 0 0 8px var(--c-teal);
      animation: pipPulse 2s infinite;
    }

    /* ── Messages ── */
    .messages-wrap { flex: 1; overflow-y: auto; overflow-x: hidden; min-height: 0; }
    .messages-inner {
      max-width: 720px; margin: 0 auto;
      padding: 32px 24px 140px;
    }
    @media (max-width: 640px) { .messages-inner { padding: 20px 14px 120px; } }

    /* User bubble */
    .msg-user { display: flex; justify-content: flex-end; margin-bottom: 24px; }
    .msg-user-bubble {
      max-width: 78%;
      padding: 13px 18px;
      background: var(--c-s3);
      border: 1px solid var(--c-border2);
      border-radius: 20px 20px 4px 20px;
      font-size: 14.5px; line-height: 1.65;
      color: rgba(240,240,248,0.92);
    }
    @media (max-width: 640px) { .msg-user-bubble { max-width: 90%; font-size: 14px; } }

    /* AI bubble */
    .msg-ai { display: flex; gap: 14px; margin-bottom: 32px; }
    .ai-avatar {
      width: 30px; height: 30px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 20px rgba(45,212,191,0.35), 0 2px 8px rgba(0,0,0,0.4);
      margin-top: 1px;
    }
    .ai-body { flex: 1; min-width: 0; }
    .ai-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
    .ai-label {
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--c-teal);
    }
    .searched-badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 10.5px; font-weight: 500;
      padding: 2px 9px; border-radius: 99px;
      background: var(--c-glow3);
      border: 1px solid rgba(45,212,191,0.15);
      color: rgba(45,212,191,0.65);
    }

    /* Markdown — rich readable typography */
    .md-content { font-size: 15px; line-height: 1.9; color: #c8c8e0; }
    .md-content p { margin-bottom: 14px; }
    .md-content p:last-child { margin-bottom: 0; }
    .md-content strong { color: #f0f0f8; font-weight: 600; }
    .md-content em { color: #a0a0c8; font-style: italic; }

    /* Inline code */
    .md-content code {
      font-family: var(--f-mono); font-size: 13px;
      background: rgba(45,212,191,0.09);
      border: 1px solid rgba(45,212,191,0.18);
      padding: 2px 8px; border-radius: 6px;
      color: #5ee6d0; letter-spacing: -0.01em;
    }

    /* Code block */
    .md-content pre {
      background: #111118;
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 14px; padding: 20px;
      overflow-x: auto; margin: 16px 0;
      position: relative;
    }
    .md-content pre::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent);
    }
    .md-content pre code { background: none; border: none; padding: 0; color: #a0a8c0; font-size: 13px; line-height: 1.7; }

    /* Lists — strictly scoped to direct li children, table td NOT affected */
    .md-content ul { list-style: none; padding: 0; margin-bottom: 14px; }
    .md-content ul > li {
      display: flex; gap: 10px; color: #c8c8e0; margin-bottom: 8px;
      padding: 0; line-height: 1.75;
    }
    .md-content ul > li::before {
      content: '▸'; color: var(--c-teal); flex-shrink: 0;
      margin-top: 4px; font-size: 10px; opacity: 0.8;
    }
    .md-content ol { padding-left: 0; margin-bottom: 14px; counter-reset: ol-counter; list-style: none; }
    .md-content ol > li {
      display: flex; gap: 12px; color: #c8c8e0; margin-bottom: 8px;
      counter-increment: ol-counter; line-height: 1.75;
    }
    .md-content ol > li::before {
      content: counter(ol-counter);
      flex-shrink: 0; min-width: 22px; height: 22px;
      background: rgba(45,212,191,0.1); border: 1px solid rgba(45,212,191,0.2);
      border-radius: 6px; color: var(--c-teal);
      font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin-top: 2px;
    }
    /* Table td/th must NEVER inherit list flex layout */
    .md-content td, .md-content th { display: table-cell !important; counter-increment: none !important; }
    .md-content td::before, .md-content th::before { content: none !important; display: none !important; }

    /* Headings */
    .md-content h1,.md-content h2,.md-content h3 {
      color: #f0f0f8; font-weight: 700;
      margin: 24px 0 10px; letter-spacing: -0.02em;
      line-height: 1.3;
    }
    .md-content h1 { font-size: 20px; }
    .md-content h2 {
      font-size: 17px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .md-content h3 { font-size: 15.5px; color: #d8d8f0; }

    /* Blockquote */
    .md-content blockquote {
      border-left: 3px solid rgba(45,212,191,0.4);
      padding: 12px 16px; margin: 16px 0;
      background: rgba(45,212,191,0.04);
      border-radius: 0 10px 10px 0;
      color: #9898b8; font-style: italic;
    }

    /* Links */
    .md-content a {
      color: var(--c-teal); text-decoration: none;
      border-bottom: 1px solid rgba(45,212,191,0.3);
      transition: all 0.15s; padding-bottom: 1px;
    }
    .md-content a:hover { border-color: var(--c-teal); color: #5ee6d0; }

    /* Table */
    .md-content table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px; border-radius: 12px; overflow: hidden; }
    .md-content thead tr { background: #161620; }
    .md-content th {
      border: 1px solid rgba(255,255,255,0.08); padding: 10px 14px;
      text-align: left; color: var(--c-teal);
      font-weight: 700; font-size: 11px;
      text-transform: uppercase; letter-spacing: 0.08em;
    }
    .md-content td { border: 1px solid rgba(255,255,255,0.06); padding: 10px 14px; color: #a0a0c0; }
    .md-content tbody tr:nth-child(even) { background: rgba(255,255,255,0.02); }
    .md-content tbody tr:hover { background: rgba(45,212,191,0.03); }

    /* Sources */
    .sources { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--c-border); }
    .sources-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--c-text4); margin-bottom: 9px;
      display: flex; align-items: center; gap: 5px;
    }
    .source-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .source-chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 11px; border-radius: 99px;
      border: 1px solid var(--c-border);
      background: var(--c-s2);
      font-size: 11.5px; color: var(--c-text3);
      text-decoration: none; transition: all 0.15s;
      font-family: var(--f-mono);
    }
    .source-chip:hover { border-color: rgba(45,212,191,0.3); color: var(--c-teal); background: var(--c-glow3); }

    /* Copy btn */
    .copy-btn {
      display: inline-flex; align-items: center; gap: 5px;
      margin-top: 10px; padding: 5px 10px; border-radius: 7px;
      border: none; background: none;
      font-family: var(--f-sans); font-size: 11.5px;
      color: var(--c-text4); cursor: pointer;
      transition: all 0.15s; opacity: 0;
    }
    .msg-ai:hover .copy-btn { opacity: 1; }
    .copy-btn:hover { background: var(--c-s2); color: var(--c-text3); }

    /* Typing */
    .typing-wrap { display: flex; gap: 14px; margin-bottom: 20px; }
    .typing-dots {
      display: flex; align-items: center; gap: 5px;
      padding: 14px 18px;
      background: var(--c-s2);
      border: 1px solid var(--c-border2);
      border-radius: 20px;
    }
    .typing-dot { width: 6px; height: 6px; border-radius: 99px; background: var(--c-teal); }
    .typing-dot:nth-child(1) { animation: tdot 1.3s ease-in-out 0s infinite; }
    .typing-dot:nth-child(2) { animation: tdot 1.3s ease-in-out 0.18s infinite; }
    .typing-dot:nth-child(3) { animation: tdot 1.3s ease-in-out 0.36s infinite; }
    @keyframes tdot { 0%,60%,100%{transform:translateY(0);opacity:0.35} 30%{transform:translateY(-6px);opacity:1} }

    /* ── Welcome ── */
    .welcome {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      min-height: 62vh; padding: 40px 20px;
      text-align: center;
    }
    .welcome-glow {
      width: 68px; height: 68px; border-radius: 22px;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 24px;
      box-shadow:
        0 0 0 1px rgba(45,212,191,0.35),
        0 0 50px rgba(45,212,191,0.30),
        0 0 100px rgba(45,212,191,0.12);
    }
    .welcome-title {
      font-size: 28px; font-weight: 700;
      letter-spacing: -0.03em; color: var(--c-text);
      margin-bottom: 10px;
      background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .welcome-sub { font-size: 14px; color: var(--c-text3); margin-bottom: 40px; line-height: 1.6; }
    .suggestions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 460px; }
    @media (max-width: 480px) { .suggestions { grid-template-columns: 1fr; } }
    .suggestion {
      padding: 14px 16px; border-radius: 14px;
      border: 1px solid var(--c-border);
      background: var(--c-s1);
      text-align: left; font-family: var(--f-sans);
      font-size: 13px; color: var(--c-text3);
      cursor: pointer; transition: all 0.18s; line-height: 1.55;
    }
    .suggestion:hover {
      border-color: rgba(45,212,191,0.25);
      background: var(--c-glow3); color: var(--c-text2);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(45,212,191,0.1);
    }

    /* ── Input ── */
    .input-area {
      flex-shrink: 0;
      padding: 14px 20px 18px;
      border-top: 1px solid var(--c-border);
      background: rgba(10,10,15,0.95);
      backdrop-filter: blur(20px);
    }
    .input-wrap { max-width: 720px; margin: 0 auto; }
    .input-box {
      display: flex; align-items: flex-end; gap: 10px;
      background: var(--c-s2);
      border: 1px solid var(--c-border2);
      border-radius: 18px;
      padding: 13px 13px 13px 18px;
      transition: all 0.2s;
    }
    .input-box:focus-within {
      border-color: rgba(45,212,191,0.35);
      box-shadow: 0 0 0 3px rgba(45,212,191,0.07), 0 0 50px rgba(45,212,191,0.07);
    }
    .input-ta {
      flex: 1; background: none; border: none; outline: none;
      color: var(--c-text); font-family: var(--f-sans);
      font-size: 14.5px; line-height: 1.6; resize: none;
    }
    .input-ta::placeholder { color: var(--c-text4); }
    .input-ta:disabled { opacity: 0.35; }
    @media (max-width: 640px) { .input-ta { font-size: 16px; } }
    .send-btn {
      width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      border: none; color: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 0 20px rgba(45,212,191,0.30), 0 2px 8px rgba(0,0,0,0.3);
    }
    .send-btn:hover:not(:disabled) {
      box-shadow: 0 0 32px rgba(45,212,191,0.50), 0 2px 12px rgba(0,0,0,0.3);
      transform: scale(1.06);
    }
    .send-btn:disabled { opacity: 0.2; cursor: not-allowed; transform: none; box-shadow: none; }
    .input-hint { text-align: center; font-size: 10.5px; color: var(--c-text4); margin-top: 9px; }

    /* ── Share Modal ── */
    .modal-bg {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center; padding: 16px;
      background: rgba(0,0,0,0.88);
      backdrop-filter: blur(12px);
      animation: fadein 0.15s ease;
    }
    @keyframes fadein { from{opacity:0} to{opacity:1} }
    .modal {
      width: 100%; max-width: 410px;
      background: var(--c-s1);
      border: 1px solid var(--c-border2);
      border-radius: 22px; overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(45,212,191,0.07);
      animation: slideup 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes slideup { from{transform:translateY(18px) scale(0.97);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }

    .modal-head {
      padding: 22px 22px 18px;
      border-bottom: 1px solid var(--c-border);
      display: flex; align-items: flex-start; justify-content: space-between;
    }
    .modal-icon-wrap {
      width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
      background: var(--c-glow2); border: 1px solid rgba(45,212,191,0.2);
      display: flex; align-items: center; justify-content: center;
      color: var(--c-teal);
    }
    .modal-title { font-size: 15px; font-weight: 600; color: var(--c-text); margin-bottom: 3px; }
    .modal-sub { font-size: 12px; color: var(--c-text3); line-height: 1.5; }
    .close-btn {
      width: 30px; height: 30px; border-radius: 8px; border: none;
      background: none; color: var(--c-text3); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .close-btn:hover { background: var(--c-s3); color: var(--c-text); }

    .modal-body { padding: 20px 22px 22px; }

    .live-status {
      display: flex; align-items: center; gap: 9px;
      padding: 11px 14px; border-radius: 11px;
      background: var(--c-glow3); border: 1px solid rgba(45,212,191,0.12);
      margin-bottom: 14px;
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 99px; flex-shrink: 0;
      background: var(--c-teal); box-shadow: 0 0 10px var(--c-teal);
      animation: pipPulse 2s infinite;
    }
    .live-text { font-size: 12.5px; color: var(--c-text2); }

    .url-box {
      display: flex; align-items: center; gap: 8px;
      background: var(--c-bg); border: 1px solid var(--c-border2);
      border-radius: 12px; padding: 11px 13px;
      margin-bottom: 10px;
    }
    .url-text {
      flex: 1; font-size: 11.5px; font-family: var(--f-mono);
      color: var(--c-text3); overflow: hidden;
      text-overflow: ellipsis; white-space: nowrap;
    }
    .copy-link-btn {
      flex-shrink: 0; display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: 7px;
      border: 1px solid var(--c-border2);
      background: var(--c-s2);
      font-family: var(--f-sans); font-size: 11.5px; font-weight: 500;
      color: var(--c-text3); cursor: pointer; transition: all 0.15s;
      white-space: nowrap;
    }
    .copy-link-btn:hover { border-color: var(--c-teal); color: var(--c-teal); background: var(--c-glow3); }
    .copy-link-btn.done { border-color: var(--c-teal); color: var(--c-teal); background: var(--c-glow3); }

    .generate-btn {
      width: 100%; padding: 13px;
      border-radius: 13px; border: none;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      color: #fff; font-family: var(--f-sans); font-size: 13.5px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      box-shadow: 0 0 28px rgba(45,212,191,0.25), 0 4px 14px rgba(0,0,0,0.3);
    }
    .generate-btn:hover:not(:disabled) {
      box-shadow: 0 0 40px rgba(45,212,191,0.40), 0 4px 18px rgba(0,0,0,0.35);
      transform: translateY(-1px);
    }
    .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    .revoke-btn {
      width: 100%; padding: 10px;
      border-radius: 11px;
      border: 1px solid rgba(248,113,113,0.18);
      background: none;
      font-family: var(--f-sans); font-size: 12.5px;
      color: rgba(248,113,113,0.55); cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: all 0.18s;
    }
    .revoke-btn:hover:not(:disabled) { border-color: rgba(248,113,113,0.45); color: var(--c-red); background: rgba(248,113,113,0.06); }
    .revoke-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    .share-info-box {
      padding: 13px 15px; border-radius: 12px;
      background: var(--c-bg); border: 1px solid var(--c-border);
      font-size: 13px; color: var(--c-text3); line-height: 1.65;
      margin-bottom: 14px;
    }

    .spin { animation: spin 0.75s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* dots menu */
    .dots-menu {
      position: absolute; right: 0; top: calc(100% + 4px); z-index: 30;
      background: var(--c-s2); border: 1px solid var(--c-border2);
      border-radius: 13px; overflow: hidden; min-width: 148px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      animation: fadein 0.12s ease;
    }
    .dots-menu-item {
      width: 100%; display: flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      background: none; border: none; border-bottom: 1px solid var(--c-border);
      font-family: var(--f-sans); font-size: 12.5px;
      color: var(--c-text3); cursor: pointer; transition: all 0.12s;
      text-align: left;
    }
    .dots-menu-item:last-child { border-bottom: none; }
    .dots-menu-item:hover { background: var(--c-s3); color: var(--c-text); }
    .dots-menu-item.red:hover { background: rgba(248,113,113,0.08); color: var(--c-red); }
  `}</style>
);

/* ─── SVG ICONS ─────────────────────────────────────────────────────────────── */
const Ic = {
  Share: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Trash: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  ),
  Copy: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Globe: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
  Logout: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Link: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Spin: ({ s = 14 }) => (
    <svg className="spin" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
      <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
    </svg>
  ),
};

/* ─── SOURCES ────────────────────────────────────────────────────────────────── */
const SourcesPanel = ({ sources }) => {
  if (!sources) return null;
  let blocks = [];
  if (typeof sources === "string") blocks = sources.split("\n\n").filter(Boolean);
  else if (Array.isArray(sources)) blocks = sources.map((s, i) => `[${i + 1}] ${s.title}\n${s.content}\nSource: ${s.url}`);
  else return null;
  const parsed = blocks.map((b, i) => {
    const u = b.match(/Source:\s*(https?:\/\/[^\s]+)/);
    const t = b.match(/^\[(\d+)\]\s(.+)/);
    return { url: u?.[1], title: t?.[2]?.split("\n")[0] || `Source ${i + 1}`, index: i + 1 };
  }).filter((s) => s.url);
  if (!parsed.length) return null;
  return (
    <div className="sources">
      <div className="sources-label"><Ic.Globe /> Sources</div>
      <div className="source-chips">
        {parsed.map((s) => (
          <a key={s.index} href={s.url} target="_blank" rel="noopener noreferrer" className="source-chip">
            <span style={{ color: "var(--c-text4)" }}>[{s.index}]</span>
            {s.title.slice(0, 28)}{s.title.length > 28 ? "…" : ""}
          </a>
        ))}
      </div>
    </div>
  );
};

/* ─── MESSAGE BUBBLE ─────────────────────────────────────────────────────────── */
const components = {
  p: ({ children }) => <p>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ inline, children }) => <code>{children}</code>,
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

const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(msg.content); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  if (msg.role === "user")
    return (
      <div className="msg-user">
        <div className="msg-user-bubble">{msg.content}</div>
      </div>
    );

  return (
    <div className="msg-ai">
      <div className="ai-avatar"><LogoIcon /></div>
      <div className="ai-body">
        <div className="ai-header">
          <span className="ai-label">Perplexity</span>
          {msg.searched && <span className="searched-badge"><Ic.Globe /> searched web</span>}
        </div>
        <div className="md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{msg.content}</ReactMarkdown>
        </div>
        <SourcesPanel sources={msg.sources} />
        <button className="copy-btn" onClick={copy}>
          {copied ? <><Ic.Check /> Copied</> : <><Ic.Copy /> Copy</>}
        </button>
      </div>
    </div>
  );
};

/* ─── SHARE MODAL ────────────────────────────────────────────────────────────── */
const ShareModal = ({ chat, onShare, onUnshare, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sharedUrl, setSharedUrl] = useState(chat.shareUrl || null);
  const [isShared, setIsShared] = useState(chat.isShared || false);

  const copy = () => { navigator.clipboard.writeText(sharedUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const doShare = async () => { setLoading(true); const url = await onShare(chat.id); if (url) { setSharedUrl(url); setIsShared(true); } setLoading(false); };
  const doUnshare = async () => { setLoading(true); await onUnshare(chat.id); setSharedUrl(null); setIsShared(false); setLoading(false); };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div className="modal-icon-wrap"><Ic.Share /></div>
            <div>
              <div className="modal-title">Share conversation</div>
              <div className="modal-sub">Anyone with the link can view — not reply</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><Ic.X /></button>
        </div>
        <div className="modal-body">
          {isShared && sharedUrl ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="live-status">
                <div className="live-dot" />
                <span className="live-text">Link is live — anyone can read this chat</span>
              </div>
              <div className="url-box">
                <Ic.Link />
                <span className="url-text">{sharedUrl}</span>
                <button className={`copy-link-btn ${copied ? "done" : ""}`} onClick={copy}>
                  {copied ? <><Ic.Check /> Copied!</> : <><Ic.Copy /> Copy</>}
                </button>
              </div>
              <button className="revoke-btn" onClick={doUnshare} disabled={loading}>
                {loading ? <Ic.Spin s={12} /> : <Ic.X />}
                {loading ? "Revoking…" : "Revoke link"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="share-info-box">Create a public link for this conversation. Anyone with the link can read without logging in.</div>
              <button className="generate-btn" onClick={doShare} disabled={loading}>
                {loading ? <><Ic.Spin s={14} /> Generating…</> : <><Ic.Share /> Generate share link</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── CHAT ITEM ──────────────────────────────────────────────────────────────── */
const ChatItem = ({ chat, isActive, onOpen, onDelete, onShare }) => {
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className={`chat-item ${isActive ? "active" : ""}`} onClick={() => onOpen(chat.id)}>
      <span className="chat-title">{chat.title}</span>
      {chat.isShared && <div className="shared-pip" title="Shared" />}
      <div className="chat-item-actions" ref={ref} style={{ position: "relative" }}>
        <button className="icon-btn-sm" title="More" onClick={(e) => { e.stopPropagation(); setMenu(!menu); }}>
          <DotsIcon />
        </button>
        {menu && (
          <div className="dots-menu" onClick={(e) => e.stopPropagation()}>
            <button className="dots-menu-item" onClick={() => { setMenu(false); onShare(chat); }}>
              <Ic.Share /> {chat.isShared ? "Manage share" : "Share"}
            </button>
            <button className="dots-menu-item red" onClick={() => { setMenu(false); onDelete(chat.id); }}>
              <Ic.Trash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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
      <div className="welcome-glow"><LogoIcon /></div>
      <div className="welcome-title">Ask anything</div>
      <div className="welcome-sub">Powered by Gemini · searches the web when needed</div>
      <div className="suggestions">
        {prompts.map((p, i) => (
          <button key={i} className="suggestion" onClick={() => onPrompt(p)}>{p}</button>
        ))}
      </div>
    </div>
  );
};

/* ─── DASHBOARD ──────────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const { initializeSocketConnection, handleSendMessage, handleGetChats, handleOpenChat, handleDeleteChat, handleShareChat, handleUnshareChat } = useChat();
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
  const taRef = useRef(null);

  const currentChat = currentId ? chats[currentId] : null;
  const currentMessages = currentChat?.messages || [];
  const sortedChats = Object.values(chats).filter((c) => !c.id?.startsWith("temp-")).sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  useEffect(() => { initializeSocketConnection(); handleGetChats(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [currentMessages, isLoading]);
  useEffect(() => { if (shareTarget && chats[shareTarget.id]) setShareTarget(chats[shareTarget.id]); }, [chats]);

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    const t = chatInput.trim();
    if (!t || isLoading) return;
    setChatInput("");
    if (taRef.current) taRef.current.style.height = "24px";
    await handleSendMessage({ message: t, chatId: currentId });
  }, [chatInput, currentId, isLoading]);

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };
  const handleTaChange = (e) => { setChatInput(e.target.value); e.target.style.height = "24px"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; };
  const handleNewChat = () => { dispatch(setCurrentChatId(null)); setSidebarOpen(false); setTimeout(() => inputRef.current?.focus(), 60); };
  const doLogout = async () => { await handleLogout(); navigate("/login"); };
  const openShare = (chat) => { setShareTarget(chat); setSidebarOpen(false); };

  return (
    <>
      <G />
      <div className="root">
        <div className="ambient" />

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-brand">
            <div className="brand-logo"><LogoIcon /></div>
            <span className="brand-name">Perplexity</span>
          </div>
          <button className="new-chat" onClick={handleNewChat}>
            <PlusIcon /> New chat
          </button>
          <div className="chat-section-label">Recent</div>
          <div className="chat-list">
            {sortedChats.length === 0 ? (
              <p style={{ fontSize: 11, color: "var(--c-text4)", textAlign: "center", marginTop: 32, lineHeight: 1.7 }}>
                No chats yet.<br />Start a conversation.
              </p>
            ) : (
              sortedChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} isActive={chat.id === currentId}
                  onOpen={(id) => { handleOpenChat(id); setSidebarOpen(false); }}
                  onDelete={handleDeleteChat} onShare={openShare}
                />
              ))
            )}
          </div>
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">{user?.username?.[0]?.toUpperCase()}</div>
              <span className="user-name">{user?.username}</span>
              <button className="logout-btn" title="Logout" onClick={doLogout}><Ic.Logout /></button>
            </div>
          </div>
        </aside>

        <div className={`backdrop ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

        {/* ── MAIN ── */}
        <main className="main">
          <header className="topbar">
            <button className="menu-toggle" onClick={() => setSidebarOpen(true)}><Ic.Menu /></button>
            <span className="topbar-title">{currentChat?.title || (currentId ? "Chat" : "New conversation")}</span>
            {currentChat && (
              <button className={`share-btn ${currentChat.isShared ? "is-shared" : ""}`} onClick={() => openShare(currentChat)}>
                <Ic.Share />
                <span>{currentChat.isShared ? "Shared" : "Share"}</span>
                {currentChat.isShared && <div className="share-live-dot" />}
              </button>
            )}
          </header>

          <div className="messages-wrap">
            <div className="messages-inner">
              {currentMessages.length === 0 && !isLoading ? (
                <EmptyState onPrompt={(s) => { setChatInput(s); setTimeout(() => inputRef.current?.focus(), 60); }} />
              ) : (
                <>
                  {currentMessages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
                  {isLoading && (
                    <div className="typing-wrap">
                      <div className="ai-avatar"><LogoIcon /></div>
                      <div className="typing-dots">
                        <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
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
                  ref={(el) => { inputRef.current = el; taRef.current = el; }}
                  className="input-ta" value={chatInput}
                  onChange={handleTaChange} onKeyDown={handleKeyDown}
                  placeholder="Ask anything…" rows={1} disabled={isLoading}
                  style={{ minHeight: 24, maxHeight: 140 }}
                />
                <button className="send-btn" onClick={handleSubmit} disabled={!chatInput.trim() || isLoading}>
                  {isLoading ? <Ic.Spin s={14} /> : <SendIcon />}
                </button>
              </div>
              <div className="input-hint">Enter to send · Shift+Enter for new line</div>
            </div>
          </div>
        </main>

        {shareTarget && (
          <ShareModal chat={shareTarget} onShare={handleShareChat} onUnshare={handleUnshareChat} onClose={() => setShareTarget(null)} />
        )}
      </div>
    </>
  );
};

export default Dashboard;