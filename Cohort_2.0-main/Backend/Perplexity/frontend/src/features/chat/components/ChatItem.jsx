import { useEffect, useRef, useState } from "react";
import { DotsIcon, Ic } from "../../shared/icons.jsx";

/* ─── CHAT ITEM ──────────────────────────────────────────────────────────────── */
export const ChatItem = ({ chat, isActive, onOpen, onDelete, onShare }) => {
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div
      className={`chat-item ${isActive ? "active" : ""}`}
      onClick={() => onOpen(chat.id)}
    >
      <span className="chat-title">{chat.title}</span>
      {chat.isShared && <div className="shared-pip" title="Shared" />}
      <div
        className="chat-item-actions"
        ref={ref}
        style={{ position: "relative" }}
      >
        <button
          className="icon-btn-sm"
          title="More"
          onClick={(e) => {
            e.stopPropagation();
            setMenu(!menu);
          }}
        >
          <DotsIcon />
        </button>
        {menu && (
          <div className="dots-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="dots-menu-item"
              onClick={() => {
                setMenu(false);
                onShare(chat);
              }}
            >
              <Ic.Share /> {chat.isShared ? "Manage share" : "Share"}
            </button>
            <button
              className="dots-menu-item red"
              onClick={() => {
                setMenu(false);
                onDelete(chat.id);
              }}
            >
              <Ic.Trash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
