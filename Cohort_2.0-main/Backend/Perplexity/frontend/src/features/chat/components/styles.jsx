/* ─── GLOBAL STYLES ────────────────────────────────────────────────────────── */
export const G = () => (
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

    /* ════════════════════════════════════════════════════════
       MESSAGES LAYOUT
       ════════════════════════════════════════════════════════ */
    .messages-wrap { flex: 1; overflow-y: auto; overflow-x: hidden; min-height: 0; }
    .messages-inner { max-width: 740px; margin: 0 auto; padding: 36px 24px 160px; }
    @media (max-width: 640px) { .messages-inner { padding: 16px 12px 140px; } }

    /* ── User bubble ─────────────────────────────────────── */
    .msg-user { display: flex; justify-content: flex-end; margin-bottom: 28px; }
    .msg-user-bubble {
      max-width: 75%;
      padding: 13px 18px;
      background: var(--c-s3);
      border: 1px solid rgba(255,255,255,0.11);
      border-radius: 20px 20px 4px 20px;
      font-size: 15px; line-height: 1.65;
      color: rgba(240,240,248,0.93);
      word-break: break-word;
    }
    @media (max-width: 640px) {
      .msg-user-bubble { max-width: 88%; font-size: 14px; padding: 10px 14px; }
    }

    /* ── AI message wrapper ──────────────────────────────── */
    .msg-ai { display: flex; gap: 12px; margin-bottom: 40px; }
    @media (max-width: 640px) { .msg-ai { gap: 8px; } }

    .ai-avatar {
      width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--c-teal3), var(--c-teal));
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 16px rgba(45,212,191,0.30);
      margin-top: 2px;
    }
    .ai-body { flex: 1; min-width: 0; overflow: visible; }

    /* "Answer" label row */
    .ai-header { display: flex; align-items: center; gap: 9px; margin-bottom: 14px; }
    .ai-label { font-size: 13px; font-weight: 700; color: var(--c-text); letter-spacing: -0.01em; }
    .searched-badge {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 11px; font-weight: 500;
      padding: 3px 10px; border-radius: 99px;
      background: rgba(45,212,191,0.07);
      border: 1px solid rgba(45,212,191,0.18);
      color: rgba(45,212,191,0.8);
    }

    /* ════════════════════════════════════════════════════════
       MARKDOWN — scoped via .md-wrap + explicit px-* classes
       ════════════════════════════════════════════════════════ */
    .md-wrap { font-size: 15px; line-height: 1.85; color: #cccce0; word-break: break-word; overflow-wrap: break-word; }
    @media (max-width: 640px) { .md-wrap { font-size: 14.5px; } }

    /* Paragraphs */
    .px-p { margin: 0 0 14px; }
    .px-p:last-child { margin-bottom: 0; }

    /* Inline text */
    .px-strong { color: #eeeef8; font-weight: 650; }
    .px-em     { color: #9898c8; font-style: italic; }
    .px-del    { color: var(--c-text3); text-decoration: line-through; }

    /* Links */
    .px-a { color: #5ac8fa; text-decoration: none; border-bottom: 1px solid rgba(90,200,250,0.28); transition: all 0.12s; }
    .px-a:hover { color: #82d8ff; border-color: rgba(90,200,250,0.6); }

    /* Headings */
    .px-h1 { font-size: 20px; font-weight: 700; color: #eeeef8; margin: 28px 0 12px; letter-spacing: -0.025em; line-height: 1.28; }
    .px-h2 { font-size: 17px; font-weight: 680; color: #e4e4f4; margin: 24px 0 10px; padding-bottom: 9px; letter-spacing: -0.02em; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .px-h3 { font-size: 15.5px; font-weight: 650; color: #d8d8f0; margin: 20px 0 8px; letter-spacing: -0.015em; }
    .px-h4 { font-size: 14px; font-weight: 600; color: #c8c8e8; margin: 16px 0 7px; }

    /* ── Unordered list ── */
    /* ── Unordered list ── */
    .px-ul {
      list-style: none;
      padding: 0; margin: 0 0 16px;
    }
    .px-ul > .px-li {
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      align-items: flex-start;
      margin-bottom: 9px;
      color: #cccce0;
    }
    .px-ul > .px-li::before {
      content: '';
      flex-shrink: 0;
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(45,212,191,0.6);
      margin-top: 8px;
    }

    /* ── Ordered list ── */
    .px-ol {
      list-style: none;
      padding: 0; margin: 0 0 16px;
      counter-reset: pxlist;
    }
    .px-ol > .px-li {
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      align-items: flex-start;
      margin-bottom: 10px;
      color: #cccce0;
      counter-increment: pxlist;
    }
    .px-ol > .px-li::before {
      content: counter(pxlist);
      flex-shrink: 0;
      min-width: 22px; height: 22px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(45,212,191,0.09);
      border: 1px solid rgba(45,212,191,0.2);
      border-radius: 6px;
      color: var(--c-teal); font-size: 11px; font-weight: 700;
      margin-top: 1px;
    }

    /* Content wrapper inside li — takes remaining width, wraps naturally */
    .px-li-content {
      flex: 1;
      min-width: 0;
      line-height: 1.75;
      word-break: break-word;
    }
    .px-li-content > .px-p { margin: 0; }

    /* Nested lists */
    .px-li > .px-li-content > .px-ul,
    .px-li > .px-li-content > .px-ol { margin: 8px 0 4px; }

    /* Blockquote */
    .px-bq {
      margin: 16px 0; padding: 12px 16px;
      border-left: 3px solid rgba(45,212,191,0.45);
      background: rgba(45,212,191,0.04);
      border-radius: 0 10px 10px 0;
      color: #9898b8; font-style: italic; line-height: 1.8;
    }

    /* HR */
    .px-hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 20px 0; }

    /* ── Inline code ── */
    .px-code-inline {
      font-family: var(--f-mono); font-size: 12.5px;
      background: rgba(45,212,191,0.09);
      border: 1px solid rgba(45,212,191,0.2);
      padding: 1px 6px; border-radius: 5px;
      color: #5ee6d0; letter-spacing: -0.01em;
    }

    /* ── Fenced code block ── */
    .px-pre-wrap {
      margin: 16px 0; border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      overflow: hidden; background: #0e0e18;
      max-width: 100%;
    }
    .px-pre-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 14px;
      background: #13131f;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .px-pre-lang {
      font-family: var(--f-mono); font-size: 11px;
      color: var(--c-text3); letter-spacing: 0.05em;
    }
    .px-pre {
      margin: 0; padding: 16px 18px;
      overflow-x: auto;
      background: transparent;
      -webkit-overflow-scrolling: touch;
    }
    .px-code-block {
      font-family: var(--f-mono); font-size: 13px;
      line-height: 1.75; color: #a8b8cc;
      white-space: pre; display: block; background: none;
    }
    @media (max-width: 640px) {
      .px-code-block { font-size: 12px; }
    }

    /* ── Table ── */
    .px-table-wrap {
      width: 100%; overflow-x: auto; margin: 16px 0;
      border-radius: 11px; border: 1px solid rgba(255,255,255,0.08);
    }
    .px-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    .px-th {
      padding: 10px 14px; text-align: left;
      background: #13131f;
      color: var(--c-text2); font-size: 11px;
      font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      white-space: nowrap;
      /* Critical — must not get list styles */
      display: table-cell !important;
    }
    .px-td {
      padding: 10px 14px; color: #a0a0c0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      /* Critical — must not get list styles */
      display: table-cell !important;
    }
    .px-tr:last-child .px-td { border-bottom: none; }
    .px-tr:nth-child(even) { background: rgba(255,255,255,0.015); }

    /* ════════════════════════════════════════════════════════
       SOURCES PANEL
       ════════════════════════════════════════════════════════ */
    .sources { margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); }
    .sources-label {
      display: flex; align-items: center; gap: 6px;
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--c-text4); margin-bottom: 10px;
    }
    .source-chips { display: flex; flex-wrap: wrap; gap: 7px; }
    .source-chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 5px 12px; border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.08);
      background: var(--c-s2);
      font-size: 11.5px; color: var(--c-text3);
      text-decoration: none; transition: all 0.13s;
      max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .source-chip:hover { border-color: rgba(45,212,191,0.28); color: var(--c-text2); background: rgba(45,212,191,0.05); }

    /* ════════════════════════════════════════════════════════
       AI ACTIONS (copy button)
       ════════════════════════════════════════════════════════ */
    .ai-actions { display: flex; gap: 4px; margin-top: 14px; opacity: 0; transition: opacity 0.14s; }
    .msg-ai:hover .ai-actions { opacity: 1; }
    .ai-action-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 11px; border-radius: 8px;
      border: 1px solid transparent; background: none;
      font-family: var(--f-sans); font-size: 12px; font-weight: 500;
      color: var(--c-text3); cursor: pointer; transition: all 0.13s;
    }
    .ai-action-btn:hover { background: var(--c-s2); border-color: var(--c-border); color: var(--c-text2); }

    /* ════════════════════════════════════════════════════════
       TYPING INDICATOR
       ════════════════════════════════════════════════════════ */
    .typing-wrap { display: flex; gap: 14px; margin-bottom: 20px; align-items: center; }
    .typing-dots {
      display: flex; align-items: center; gap: 5px;
      padding: 12px 16px;
      background: var(--c-s2); border: 1px solid var(--c-border2);
      border-radius: 18px;
    }
    .typing-dot { width: 6px; height: 6px; border-radius: 99px; background: var(--c-teal); opacity: 0.5; }
    .typing-dot:nth-child(1) { animation: tdot 1.3s ease-in-out 0s infinite; }
    .typing-dot:nth-child(2) { animation: tdot 1.3s ease-in-out 0.2s infinite; }
    .typing-dot:nth-child(3) { animation: tdot 1.3s ease-in-out 0.4s infinite; }
    @keyframes tdot { 0%,60%,100%{ transform:translateY(0); opacity:0.3; } 30%{ transform:translateY(-5px); opacity:1; } }

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