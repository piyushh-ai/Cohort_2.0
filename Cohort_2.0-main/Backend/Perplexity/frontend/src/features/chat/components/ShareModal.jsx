import { useState } from "react";
import { Ic } from "../../shared/icons.jsx";

/* ─── SHARE MODAL ────────────────────────────────────────────────────────────── */
export const ShareModal = ({ chat, onShare, onUnshare, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sharedUrl, setSharedUrl] = useState(chat.shareUrl || null);
  const [isShared, setIsShared] = useState(chat.isShared || false);

  const copy = () => {
    navigator.clipboard.writeText(sharedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const doShare = async () => {
    setLoading(true);
    const url = await onShare(chat.id);
    if (url) {
      setSharedUrl(url);
      setIsShared(true);
    }
    setLoading(false);
  };
  const doUnshare = async () => {
    setLoading(true);
    await onUnshare(chat.id);
    setSharedUrl(null);
    setIsShared(false);
    setLoading(false);
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div className="modal-icon-wrap">
              <Ic.Share />
            </div>
            <div>
              <div className="modal-title">Share conversation</div>
              <div className="modal-sub">
                Anyone with the link can view — not reply
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <Ic.X />
          </button>
        </div>
        <div className="modal-body">
          {isShared && sharedUrl ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="live-status">
                <div className="live-dot" />
                <span className="live-text">
                  Link is live — anyone can read this chat
                </span>
              </div>
              <div className="url-box">
                <Ic.Link />
                <span className="url-text">{sharedUrl}</span>
                <button
                  className={`copy-link-btn ${copied ? "done" : ""}`}
                  onClick={copy}
                >
                  {copied ? (
                    <>
                      <Ic.Check /> Copied!
                    </>
                  ) : (
                    <>
                      <Ic.Copy /> Copy
                    </>
                  )}
                </button>
              </div>
              <button
                className="revoke-btn"
                onClick={doUnshare}
                disabled={loading}
              >
                {loading ? <Ic.Spin s={12} /> : <Ic.X />}
                {loading ? "Revoking…" : "Revoke link"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="share-info-box">
                Create a public link for this conversation. Anyone with the link
                can read without logging in.
              </div>
              <button
                className="generate-btn"
                onClick={doShare}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Ic.Spin s={14} /> Generating…
                  </>
                ) : (
                  <>
                    <Ic.Share /> Generate share link
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
