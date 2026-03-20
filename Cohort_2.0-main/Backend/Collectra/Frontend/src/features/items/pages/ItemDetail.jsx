import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useItems from "../hooks/useItems";
import useCollections from "../../collections/hooks/useCollections";
import "../styles/ItemDetail.scss";

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
  const [activeTab, setActiveTab] = useState("overview");

  // ─── Edit State ───────────────────────────────────────
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [saving, setSaving] = useState(false);

  // Single item fetch karo
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
    fetchCollections();
  }, [id]);

  // Related items fetch karo
  useEffect(() => {
    if (!item) return;
    const fetchRelated = async () => {
      const related = await getRelatedItems(id);
      setRelatedItems(related);
    };
    fetchRelated();
  }, [item]);

  const handleFavorite = async () => {
    const result = await toggleFavorite(id);
    setItem((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleEditOpen = () => {
    setEditData({
      title: item.title || "",
      description: item.description || "",
      tags: item.tags?.join(", ") || "",
    });
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

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
    if (result) {
      setItem((prev) => ({ ...prev, highlights: result }));
    }
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

  const typeColors = {
    article: { bg: "rgba(56,139,253,0.1)", color: "#388bfd" },
    video: { bg: "rgba(248,81,73,0.1)", color: "#f85149" },
    pdf: { bg: "rgba(210,153,34,0.1)", color: "#d29922" },
    image: { bg: "rgba(63,185,80,0.1)", color: "#3fb950" },
    tweet: { bg: "rgba(29,155,240,0.1)", color: "#1d9bf0" },
    document: { bg: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
  };

  const typeStyle = typeColors[item?.type] || typeColors.article;

  // ─── Loading ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="detail-loading">
        <div className="brain-loader">
          <div className="brain-ring ring-1" />
          <div className="brain-ring ring-2" />
          <div className="brain-ring ring-3" />
          <div className="ring-center" />
        </div>
      </div>
    );
  }

  if (!item) return null;

  const currentCollection = collections.find(
    (c) => c._id === item.collectionId,
  );

  return (
    <>
      <div className="detail-page">
        {/* ─── Header ─────────────────────────────────── */}
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Back
          </button>

          <div className="detail-header-actions">
            {/* Edit */}
            <button className="icon-btn" onClick={handleEditOpen} title="Edit">
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </button>
            <button
              className={`icon-btn ${item.isFavorite ? "active-favorite" : ""}`}
              onClick={handleFavorite}
              title="Favorite"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d={
                    item.isFavorite
                      ? "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                      : "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                  }
                />
              </svg>
            </button>

            {/* Open */}
            <a
              href={getOpenUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              title="Open"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                />
              </svg>
            </a>

            {/* Delete */}
            <button
              className="icon-btn danger-btn"
              onClick={handleDelete}
              disabled={deleting}
              title="Delete"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="detail-body">
          {/* ─── Left Column ────────────────────────────── */}
          <div className="detail-left">
            {/* Image */}
            <div className="detail-image">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <div className="detail-image-placeholder">
                  <span
                    style={{
                      color: typeStyle.color,
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {item.type?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="detail-meta">
              <span
                className="item-type-badge"
                style={{ background: typeStyle.bg, color: typeStyle.color }}
              >
                {item.type}
              </span>
              {item.siteName && (
                <span className="detail-site">{item.siteName}</span>
              )}
              <span className="detail-date">{timeAgo(item.createdAt)}</span>
            </div>

            {/* Title */}
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
                      setEditData((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
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
                  <button
                    className="edit-cancel-btn"
                    onClick={handleEditCancel}
                  >
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
                <h1 className="detail-title">{item.title || "Untitled"}</h1>

                {/* Summary */}
                {item.summary && (
                  <div className="detail-summary">
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
                      <span key={tag} className="item-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Collection */}
            <div className="detail-collection-section">
              <p className="detail-section-label">Collection</p>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  className="collection-select-btn"
                  onClick={() => setShowCollectionDropdown((p) => !p)}
                >
                  {currentCollection ? (
                    <>
                      <span
                        className="collection-dot"
                        style={{ background: currentCollection.color }}
                      />
                      {currentCollection.name}
                    </>
                  ) : (
                    "No Collection"
                  )}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>

                {showCollectionDropdown && (
                  <div className="collection-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => handleAddToCollection("none")}
                    >
                      No Collection
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col._id}
                        className={`dropdown-item ${item.collectionId === col._id ? "active-collection" : ""}`}
                        onClick={() => handleAddToCollection(col._id)}
                      >
                        <span
                          className="collection-dot"
                          style={{ background: col.color }}
                        />
                        {col.name}
                        {item.collectionId === col._id && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            style={{ marginLeft: "auto" }}
                          >
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="detail-stats">
              <div className="stat-item">
                <span className="stat-value">{item.viewCount || 0}</span>
                <span className="stat-label">Views</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {item.highlights?.length || 0}
                </span>
                <span className="stat-label">Highlights</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{item.tags?.length || 0}</span>
                <span className="stat-label">Tags</span>
              </div>
            </div>
          </div>

          {/* ─── Right Column ───────────────────────────── */}
          <div className="detail-right">
            {/* Tabs */}
            <div className="detail-tabs">
              {["highlights", "related"].map((tab) => (
                <button
                  key={tab}
                  className={`detail-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "highlights" && item.highlights?.length > 0 && (
                    <span className="tab-count">{item.highlights.length}</span>
                  )}
                  {tab === "related" && relatedItems.length > 0 && (
                    <span className="tab-count">{relatedItems.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* ─── Highlights Tab ──────────────────────── */}
            {activeTab === "highlights" && (
              <div className="detail-tab-content">
                {/* Saved Highlights */}
                {item.highlights?.length > 0 ? (
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
                          title="Delete highlight"
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
                ) : (
                  <p className="detail-empty-text">No highlights yet</p>
                )}

                {/* AI Generate Button */}
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
                        Generate AI Highlights
                      </>
                    )}
                  </button>
                )}

                {/* AI Suggestions */}
                {aiHighlights.length > 0 && (
                  <div className="ai-suggestions">
                    <p className="ai-suggestions-label">
                      Select a highlight to save:
                    </p>
                    {aiHighlights.map((highlight, i) => (
                      <button
                        key={i}
                        className={`ai-highlight-item ${selectedHighlight === highlight ? "selected" : ""}`}
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
              </div>
            )}

            {/* ─── Related Tab ─────────────────────────── */}
            {activeTab === "related" && (
              <div className="detail-tab-content">
                {relatedItems.length === 0 ? (
                  <p className="detail-empty-text">No related items found</p>
                ) : (
                  <div className="related-list">
                    {relatedItems.map((related) => {
                      const relatedTypeStyle =
                        typeColors[related.type] || typeColors.article;
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
                                style={{ background: relatedTypeStyle.bg }}
                              >
                                <span
                                  style={{
                                    color: relatedTypeStyle.color,
                                    fontSize: "10px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {related.type?.toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="related-info">
                            <p className="related-title">{related.title}</p>
                            <span
                              style={{
                                fontSize: "11px",
                                color: relatedTypeStyle.color,
                                background: relatedTypeStyle.bg,
                                padding: "1px 6px",
                                borderRadius: "8px",
                              }}
                            >
                              {related.type}
                            </span>
                          </div>
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
    </>
  );
};

export default ItemDetail;
