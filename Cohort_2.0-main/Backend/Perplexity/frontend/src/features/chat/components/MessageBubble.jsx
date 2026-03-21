import { useState } from "react";
import { LogoIcon, Ic } from "../../shared/icons.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { components } from "../components/component.jsx";
import { SourcesPanel } from "./SourcesPanel.jsx";

export const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  /* ── User message ─────────────────────────────────────────────────────── */
  if (msg.role === "user")
    return (
      <div className="msg-user">
        <div className="msg-user-bubble">{msg.content}</div>
      </div>
    );

  /* ── AI message ───────────────────────────────────────────────────────── */
  return (
    <div className="msg-ai">
      {/* Avatar */}
      <div className="ai-avatar">
        <LogoIcon />
      </div>

      {/* Body */}
      <div className="ai-body">
        {/* "Answer" header + web-search badge */}
        <div className="ai-header">
          <span className="ai-label">Answer</span>
          {msg.searched && (
            <span className="searched-badge">
              <Ic.Globe />
              Web search
            </span>
          )}
        </div>

        {/* Markdown prose */}
        <div className="md-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {msg.content}
          </ReactMarkdown>
        </div>

        {/* Sources */}
        <SourcesPanel sources={msg.sources} />

        {/* Action row */}
        <div className="ai-actions">
          <button className="ai-action-btn" onClick={copy}>
            {copied ? (
              <>
                <Ic.Check />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Ic.Copy />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
