import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useItems from "../hooks/useItems";
import useCollections from "../../collections/hooks/useCollections";
import "../styles/ItemDetail.scss";
import { circleLoading } from "../../../shared/components/Loader";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    toggleFavorite,
    deleteItem,
    updateItem,
    addHighlight,
    deleteHighlight,
    generateAIHighlights,
    addToCollection,
    removeFromCollection,
    getRelatedItems,
  } = useItems();

  const { collections, fetchCollections } = useCollections();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);
  const [aiHighlights, setAiHighlights] = useState([]);
  const [generatingHighlights, setGeneratingHighlights] = useState(false);
  const [highlightNote, setHighlightNote] = useState("");
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [savingHighlight, setSavingHighlight] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("highlights");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [saving, setSaving] = useState(false);
  const colDropdownRef = useRef(null);

  // Fetch item
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const { getItemByIdAPI } = await import("../api/items.api");
        const response = await getItemByIdAPI(id);
        setItem(response.data);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (collections.length === 0) fetchCollections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!item) return;
    const fetchRelated = async () => {
      const related = await getRelatedItems(id);
      setRelatedItems(related);
    };
    fetchRelated();
  }, [item]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close collection dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        colDropdownRef.current &&
        !colDropdownRef.current.contains(e.target)
      ) {
        setShowCollectionDropdown(false);
      }
    };
    // mousedown → click use karo outside close ke liye
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const handleFavorite = async () => {
    const result = await toggleFavorite(id);
    if (result !== undefined)
      setItem((prev) => ({ ...prev, isFavorite: result.isFavorite }));
    else setItem((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleEditOpen = () => {
    setEditData({
      title: item.title || "",
      description: item.description || "",
      tags: item.tags?.join(", ") || "",
    });
    setIsEditing(true);
  };

  const handleEditCancel = () => setIsEditing(false);

  const handleSaveEdit = async () => {
    setSaving(true);
    const tagsArray = editData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const result = await updateItem(id, {
      title: editData.title,
      description: editData.description,
      tags: tagsArray,
    });
    if (result) {
      setItem((prev) => ({ ...prev, ...result }));
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this item?")) return;
    setDeleting(true);
    await deleteItem(id);
    navigate("/");
  };

  const handleGenerateHighlights = async () => {
    setGeneratingHighlights(true);
    const highlights = await generateAIHighlights(id);
    setAiHighlights(highlights);
    setGeneratingHighlights(false);
  };

  const handleSaveHighlight = async () => {
    if (!selectedHighlight) return;
    setSavingHighlight(true);
    const result = await addHighlight(id, {
      text: selectedHighlight,
      note: highlightNote,
    });
    if (result) {
      setItem((prev) => ({ ...prev, highlights: result }));
      setSelectedHighlight(null);
      setHighlightNote("");
      setAiHighlights([]);
    }
    setSavingHighlight(false);
  };

  const handleDeleteHighlight = async (highlightId) => {
    const result = await deleteHighlight(id, highlightId);
    if (result) setItem((prev) => ({ ...prev, highlights: result }));
  };

  const handleAddToCollection = async (collectionId) => {
    if (collectionId === "none") {
      await removeFromCollection(id);
      setItem((prev) => ({ ...prev, collectionId: null }));
    } else {
      await addToCollection(id, collectionId);
      setItem((prev) => ({ ...prev, collectionId }));
    }
    setShowCollectionDropdown(false);
  };

  const getOpenUrl = () => {
    if (!item?.url) return "#";
    if (item.type === "pdf" || (item.type === "document" && item.isFile)) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(item.url)}`;
    }
    return item.url;
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  const TYPE_STYLES = {
    article: { bg: "rgba(56,189,248,0.12)", color: "#38bdf8" },
    video: { bg: "rgba(251,113,133,0.12)", color: "#fb7185" },
    pdf: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
    image: { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
    tweet: { bg: "rgba(29,155,240,0.12)", color: "#1d9bf0" },
    document: { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
  };

  const ts = TYPE_STYLES[item?.type] || TYPE_STYLES.article;
  const currentCollection = collections.find(
    (c) => c._id === item?.collectionId,
  );

  // ─── Loading ──────────────────────────────────────────
  if (loading) {
    return circleLoading;
  }

  if (!item) return null;

  return (
    <div className="detail-page">
      {/* ══════════════════════════════════════════════════
          STICKY ACTION BAR — back + all actions in one row
      ══════════════════════════════════════════════════ */}
      <div className="detail-action-bar">
        {/* Back button — prominent, labeled */}
        <button className="detail-back-btn" onClick={() => navigate("/")}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span>Back</span>
        </button>

        {/* Page title — truncated in the middle */}
        <p className="detail-bar-title">{item.title || "Untitled"}</p>

        {/* Action buttons — clearly labeled on desktop, icon-only on mobile */}
        <div className="detail-bar-actions">
          {/* Open original */}
          <a
            href={getOpenUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-action-btn detail-action-btn--open"
            title="Open original"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
              />
              <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
              />
            </svg>
            <span className="action-label">Open</span>
          </a>

          {/* Favorite */}
          <button
            className={`detail-action-btn${item.isFavorite ? " detail-action-btn--active-fav" : ""}`}
            onClick={handleFavorite}
            title={item.isFavorite ? "Unfavorite" : "Favorite"}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path
                d={
                  item.isFavorite
                    ? "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    : "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                }
              />
            </svg>
            <span className="action-label">
              {item.isFavorite ? "Saved" : "Save"}
            </span>
          </button>

          {/* Edit */}
          <button
            className="detail-action-btn"
            onClick={handleEditOpen}
            title="Edit"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
            <span className="action-label">Edit</span>
          </button>

          {/* Delete */}
          <button
            className="detail-action-btn detail-action-btn--danger"
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
            <span className="action-label">Delete</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT AREA
      ══════════════════════════════════════════════════ */}
      <div className="detail-body">
        {/* ─── LEFT / MAIN COLUMN ─── */}
        <div className="detail-left">
          {/* Hero Image */}
          <div
            className="detail-hero"
            style={{ "--type-color": ts.color, "--type-bg": ts.bg }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="detail-hero-img"
              />
            ) : (
              <div className="detail-hero-placeholder">
                <div
                  className="detail-hero-icon-wrap"
                  style={{ background: ts.bg }}
                >
                  <span
                    style={{
                      color: ts.color,
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.type?.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            {/* Type badge over image */}
            <span
              className="detail-type-badge"
              style={{ background: ts.bg, color: ts.color }}
            >
              {item.type}
            </span>
          </div>

          {/* ─── Edit Form (when editing) ─── */}
          {isEditing ? (
            <div className="edit-form">
              <div className="edit-form-group">
                <label className="edit-label">Title</label>
                <input
                  className="edit-input"
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Title"
                />
              </div>
              <div className="edit-form-group">
                <label className="edit-label">Description</label>
                <textarea
                  className="edit-textarea"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Description"
                  rows={4}
                />
              </div>
              <div className="edit-form-group">
                <label className="edit-label">
                  Tags <span className="edit-hint">(comma separated)</span>
                </label>
                <input
                  className="edit-input"
                  type="text"
                  value={editData.tags}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, tags: e.target.value }))
                  }
                  placeholder="e.g. AI, React, Design"
                />
              </div>
              <div className="edit-actions">
                <button className="edit-cancel-btn" onClick={handleEditCancel}>
                  Cancel
                </button>
                <button
                  className="edit-save-btn"
                  onClick={handleSaveEdit}
                  disabled={saving}
                >
                  {saving ? <span className="spinner" /> : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Meta row */}
              <div className="detail-meta-row">
                {item.siteName && (
                  <span className="detail-site">{item.siteName}</span>
                )}
                <span className="detail-date-chip">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>
                  {timeAgo(item.createdAt)}
                </span>
              </div>

              {/* Title */}
              <h1 className="detail-title">{item.title || "Untitled"}</h1>

              {/* AI Summary */}
              {item.summary && (
                <div className="detail-summary">
                  <div className="detail-summary-label">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
                    </svg>
                    AI Summary
                  </div>
                  <p>{item.summary}</p>
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="detail-description">{item.description}</p>
              )}

              {/* Tags */}
              {item.tags?.length > 0 && (
                <div className="detail-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="detail-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ─── Info Cards Row ─── */}
          <div className="detail-info-row">
            {/* Collection picker */}
            <div
              className="detail-info-card"
              ref={colDropdownRef}
              style={{ position: "relative" }}
            >
              <p className="detail-info-label">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                </svg>
                Collection
              </p>
              <button
                className="detail-collection-btn"
                onClick={() => setShowCollectionDropdown((p) => !p)}
              >
                {currentCollection ? (
                  <>
                    <span
                      className="col-dot-sm"
                      style={{
                        background: currentCollection.color,
                        boxShadow: `0 0 6px ${currentCollection.color}60`,
                      }}
                    />
                    {currentCollection.name}
                  </>
                ) : (
                  <span style={{ color: "var(--text-3)" }}>None</span>
                )}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>

              {showCollectionDropdown && (
                <div className="detail-col-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => handleAddToCollection("none")}
                  >
                    <span
                      className="col-dot-sm"
                      style={{ background: "var(--text-3)" }}
                    />
                    No Collection
                  </button>
                  {collections.map((col) => (
                    <button
                      key={col._id}
                      className={`dropdown-item${item.collectionId === col._id ? " active-collection" : ""}`}
                      onClick={() => handleAddToCollection(col._id)}
                    >
                      <span
                        className="col-dot-sm"
                        style={{
                          background: col.color,
                          boxShadow: `0 0 6px ${col.color}50`,
                        }}
                      />
                      {col.name}
                      {item.collectionId === col._id && (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ marginLeft: "auto", color: "var(--cyan)" }}
                        >
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="detail-stats-row">
              <div className="detail-stat">
                <span className="detail-stat-val">{item.viewCount || 0}</span>
                <span className="detail-stat-lbl">Views</span>
              </div>
              <div className="detail-stat-div" />
              <div className="detail-stat">
                <span className="detail-stat-val">
                  {item.highlights?.length || 0}
                </span>
                <span className="detail-stat-lbl">Highlights</span>
              </div>
              <div className="detail-stat-div" />
              <div className="detail-stat">
                <span className="detail-stat-val">
                  {item.tags?.length || 0}
                </span>
                <span className="detail-stat-lbl">Tags</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN — tabs with highlights & related ─── */}
        <div className="detail-right">
          {/* Tab bar */}
          <div className="detail-tabs">
            <button
              className={`detail-tab${activeTab === "highlights" ? " active" : ""}`}
              onClick={() => setActiveTab("highlights")}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
              </svg>
              Highlights
              {item.highlights?.length > 0 && (
                <span className="tab-badge">{item.highlights.length}</span>
              )}
            </button>
            <button
              className={`detail-tab${activeTab === "related" ? " active" : ""}`}
              onClick={() => setActiveTab("related")}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
              </svg>
              Related
              {relatedItems.length > 0 && (
                <span className="tab-badge">{relatedItems.length}</span>
              )}
            </button>
          </div>

          {/* ─── Highlights Tab ─── */}
          {activeTab === "highlights" && (
            <div className="detail-tab-content">
              {/* Saved highlights */}
              {item.highlights?.length > 0 && (
                <div className="highlights-list">
                  {item.highlights.map((h) => (
                    <div key={h._id} className="highlight-item">
                      <div className="highlight-bar" />
                      <div className="highlight-body">
                        <p className="highlight-text">{h.text}</p>
                        {h.note && <p className="highlight-note">{h.note}</p>}
                      </div>
                      <button
                        className="highlight-delete"
                        onClick={() => handleDeleteHighlight(h._id)}
                        title="Delete"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* AI generate button */}
              {aiHighlights.length === 0 && (
                <button
                  className="generate-btn"
                  onClick={handleGenerateHighlights}
                  disabled={generatingHighlights}
                >
                  {generatingHighlights ? (
                    <>
                      <span className="spinner" /> Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
                      </svg>
                      {item.highlights?.length > 0
                        ? "Generate More"
                        : "Generate AI Highlights"}
                    </>
                  )}
                </button>
              )}

              {/* AI suggestions */}
              {aiHighlights.length > 0 && (
                <div className="ai-suggestions">
                  <p className="ai-suggestions-label">
                    Pick highlights to save:
                  </p>
                  {aiHighlights.map((highlight, i) => (
                    <button
                      key={i}
                      className={`ai-highlight-item${selectedHighlight === highlight ? " selected" : ""}`}
                      onClick={() =>
                        setSelectedHighlight(
                          selectedHighlight === highlight ? null : highlight,
                        )
                      }
                    >
                      {highlight}
                    </button>
                  ))}

                  {selectedHighlight && (
                    <div className="highlight-note-input">
                      <input
                        type="text"
                        placeholder="Add a note (optional)"
                        value={highlightNote}
                        onChange={(e) => setHighlightNote(e.target.value)}
                      />
                      <button
                        className="modal-submit-btn"
                        onClick={handleSaveHighlight}
                        disabled={savingHighlight}
                      >
                        {savingHighlight ? (
                          <span className="spinner" />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  )}

                  <button
                    className="modal-cancel-btn"
                    style={{ marginTop: "8px", width: "100%" }}
                    onClick={() => {
                      setAiHighlights([]);
                      setSelectedHighlight(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Empty state */}
              {item.highlights?.length === 0 &&
                aiHighlights.length === 0 &&
                !generatingHighlights && (
                  <p className="detail-empty-text">
                    No highlights yet — generate some with AI above.
                  </p>
                )}
            </div>
          )}

          {/* ─── Related Tab ─── */}
          {activeTab === "related" && (
            <div className="detail-tab-content">
              {relatedItems.length === 0 ? (
                <p className="detail-empty-text">No related items found</p>
              ) : (
                <div className="related-list">
                  {relatedItems.map((related) => {
                    const rts =
                      TYPE_STYLES[related.type] || TYPE_STYLES.article;
                    return (
                      <div
                        key={related._id}
                        className="related-item"
                        onClick={() => navigate(`/item/${related._id}`)}
                      >
                        <div className="related-image">
                          {related.image ? (
                            <img src={related.image} alt={related.title} />
                          ) : (
                            <div
                              className="related-image-placeholder"
                              style={{ background: rts.bg }}
                            >
                              <span
                                style={{
                                  color: rts.color,
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                {related.type?.toUpperCase().slice(0, 3)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="related-info">
                          <p className="related-title">{related.title}</p>
                          <span
                            className="related-type-chip"
                            style={{ color: rts.color, background: rts.bg }}
                          >
                            {related.type}
                          </span>
                        </div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ color: "var(--text-3)", flexShrink: 0 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
