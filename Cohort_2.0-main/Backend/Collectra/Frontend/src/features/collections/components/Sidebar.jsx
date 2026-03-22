import { useState, useRef, useEffect } from "react";
import useCollections from "../hooks/useCollections";
import "../../items/styles/Sidebar.scss";
import "../../items/styles/_variables.scss";
import { getTopicClustersAPI } from "../../items/api/items.api";

const NAV_ITEMS = [
  {
    id: "all",
    label: "All Items",
    activeClass: "active--all",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
      </svg>
    ),
  },
  {
    id: "favorites",
    label: "Favorites",
    activeClass: "active--favorites",
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ),
  },
];

const TYPE_ITEMS = [
  { id: "article", label: "Articles" },
  { id: "video", label: "Videos" },
  { id: "pdf", label: "PDFs" },
  { id: "image", label: "Images" },
  { id: "tweet", label: "Tweets" },
  { id: "document", label: "Documents" },
];

const COLLECTION_COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#ec4899",
  "#ef4444", "#3b82f6", "#8b5cf6", "#14b8a6", "#f97316",
];

// ─── Collection Modal ─────────────────────────────────────
const CollectionModal = ({ onClose, onSubmit, initial = null }) => {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name || "");
  const [color, setColor] = useState(initial?.color || COLLECTION_COLORS[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onSubmit({ name: name.trim(), color });
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ maxWidth: "360px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Collection" : "New Collection"}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AI Research"
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {COLLECTION_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-dot ${color === c ? "selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={loading || !name.trim()}
            >
              {loading ? <span className="spinner" /> : isEdit ? "Save changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Collection Item ──────────────────────────────────────
const CollectionItem = ({ col, isActive, onFilterChange, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`sidebar-item-row ${isActive ? "active" : ""}`}>
      <button
        className="sidebar-item-main"
        onClick={() => onFilterChange(col._id)}
      >
        <span
          className="collection-dot"
          style={{ background: col.color || "#6366f1" }}
        />
        <span className="sidebar-item-name">{col.name}</span>
        {col.itemCount !== undefined && (
          <span className="item-count">{col.itemCount}</span>
        )}
      </button>
      <div className="col-menu-wrap" ref={menuRef}>
        <button
          className="col-menu-btn"
          onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        {menuOpen && (
          <div className="col-dropdown">
            <button
              className="col-dropdown-item"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit(col); }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
              Edit
            </button>
            <button
              className="col-dropdown-item danger"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete(col._id); }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Sidebar ─────────────────────────────────────────
const Sidebar = ({ activeFilter, onFilterChange, isOpen, onClose, onTopicsRefresh }) => {
  const { collections, createCollection, updateCollection, deleteCollection } =
    useCollections();
  const [showTypes, setShowTypes] = useState(false);
  const [showTopics, setShowTopics] = useState(true);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);

  // ─── Swipe to close ──────────────────────────────────────
  const sidebarRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isDragging.current = false;
      // Inline style reset — transition temporarily off for smooth drag
      el.style.transition = "none";
    };

    const onTouchMove = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);

      // Sirf horizontal swipe left — vertical scroll allow karo
      if (!isDragging.current && dy > Math.abs(dx)) return;

      if (dx < 0) {
        isDragging.current = true;
        // Sidebar ko finger ke saath drag karo (max 0, min -sidebarWidth)
        const clamp = Math.max(dx, -el.offsetWidth);
        el.style.transform = `translateX(${clamp}px)`;
        e.preventDefault(); // prevent page scroll while dragging sidebar
      }
    };

    const onTouchEnd = (e) => {
      el.style.transition = ""; // restore CSS transition
      if (!isDragging.current) return;

      const dx = e.changedTouches[0].clientX - touchStartX.current;
      // 80px ya 30% — jo bhi pehle ho — close threshold
      const threshold = Math.min(80, el.offsetWidth * 0.3);

      if (dx < -threshold) {
        // Enough swipe — close karo
        el.style.transform = "";
        if (onClose) onClose();
      } else {
        // Not enough — snap back
        el.style.transform = "";
      }

      touchStartX.current = null;
      touchStartY.current = null;
      isDragging.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onClose]);

  const refreshTopics = async () => {
    try {
      const res = await getTopicClustersAPI();
      setTopics(res.data || []);
    } catch {}
    setTopicsLoaded(true);
  };

  useEffect(() => {
    refreshTopics();
    const interval = setInterval(refreshTopics, 10000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onTopicsRefresh) onTopicsRefresh(refreshTopics);
  }, [onTopicsRefresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (filter) => {
    onFilterChange(filter);
    if (onClose) onClose();
  };

  const handleEdit = async (data) => {
    await updateCollection(editingCollection._id, data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this collection? Items will move to uncategorized."))
      return;
    await deleteCollection(id);
    if (activeFilter === id) onFilterChange("all");
  };

  return (
    <>
      {/* Overlay — bahar tap karo to close */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside ref={sidebarRef} className={`sidebar${isOpen ? " sidebar--open" : ""}`}>

        {/* ✅ FIX: Main Nav — dono items */}
        <div className="sidebar-section">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${
                activeFilter === item.id ? item.activeClass || "active" : ""
              }`}
              onClick={() => handleFilterChange(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Types */}
        <div className="sidebar-section">
          <button
            className="sidebar-label-btn"
            onClick={() => setShowTypes((p) => !p)}
          >
            Types
            <svg
              width="10" height="10" viewBox="0 0 16 16" fill="currentColor"
              style={{
                transform: showTypes ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                marginLeft: "auto",
              }}
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          {showTypes &&
            TYPE_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${activeFilter === item.id ? "active" : ""}`}
                onClick={() => handleFilterChange(item.id)}
              >
                <span style={{ width: 14 }} />
                {item.label}
              </button>
            ))}
        </div>

        {/* Topics */}
        <div className="sidebar-section">
          <button
            className="sidebar-label-btn"
            onClick={() => setShowTopics((p) => !p)}
          >
            Topics
            <svg
              width="10" height="10" viewBox="0 0 16 16" fill="currentColor"
              style={{
                transform: showTopics ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                marginLeft: "auto",
              }}
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          {showTopics && (
            <>
              {!topicsLoaded ? (
                <p className="sidebar-empty">Loading...</p>
              ) : topics.length === 0 ? (
                <p className="sidebar-empty">No topics yet</p>
              ) : (
                topics.map((cluster) => (
                  <button
                    key={cluster.topic}
                    className={`sidebar-item ${
                      activeFilter === `topic:${cluster.topic}` ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange(`topic:${cluster.topic}`)}
                  >
                    <span
                      style={{
                        width: 14, height: 14,
                        borderRadius: "50%",
                        background: "#a78bfa20",
                        border: "1px solid #a78bfa60",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "7px",
                        color: "#a78bfa",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        flexShrink: 0,
                      }}
                    >
                      #
                    </span>
                    {cluster.topic}
                    <span className="item-count">{cluster.count}</span>
                  </button>
                ))
              )}
            </>
          )}
        </div>

        {/* Collections */}
        <div className="sidebar-section">
          <div className="sidebar-label">Collections</div>
          {collections.length === 0 ? (
            <p className="sidebar-empty">No collections yet</p>
          ) : (
            collections.map((col) => (
              <CollectionItem
                key={col._id}
                col={col}
                isActive={activeFilter === col._id}
                onFilterChange={handleFilterChange}
                onEdit={(c) => setEditingCollection(c)}
                onDelete={handleDelete}
              />
            ))
          )}
          <button
            className="sidebar-add-collection"
            onClick={() => setShowNewCollection(true)}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z" />
            </svg>
            New Collection
          </button>
        </div>
      </aside>

      {showNewCollection && (
        <CollectionModal
          onClose={() => setShowNewCollection(false)}
          onSubmit={createCollection}
        />
      )}
      {editingCollection && (
        <CollectionModal
          initial={editingCollection}
          onClose={() => setEditingCollection(null)}
          onSubmit={handleEdit}
        />
      )}
    </>
  );
};

export default Sidebar;