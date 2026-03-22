import { useState, useRef, useEffect } from "react";
import useItems from "../hooks/useItems";
import useCollections from "../../collections/hooks/useCollections";
import "../styles/ItemCard.scss";
import { useNavigate } from "react-router";

// Welcome screen exact palette — copied from WelcomeHero, FeaturesSection
const TYPE_STYLES = {
  article: {
    bg: "rgba(56,189,248,0.12)",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.07)",
  },
  video: {
    bg: "rgba(251,113,133,0.12)",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.07)",
  },
  pdf: {
    bg: "rgba(251,191,36,0.12)",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.07)",
  },
  image: {
    bg: "rgba(52,211,153,0.12)",
    color: "#34d399",
    glow: "rgba(52,211,153,0.07)",
  },
  tweet: {
    bg: "rgba(29,155,240,0.12)",
    color: "#1d9bf0",
    glow: "rgba(29,155,240,0.07)",
  },
  document: {
    bg: "rgba(167,139,250,0.12)",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.07)",
  },
};

// index prop — used for reliable staggered animation via CSS custom property
const ItemCard = ({ item, index = 0 }) => {
  const { toggleFavorite, deleteItem, addToCollection } = useItems();
  const { collections } = useCollections();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showCollectionPicker, setShowCollectionPicker] = useState(false);
  const [addingToCollection, setAddingToCollection] = useState(false);
  const menuRef = useRef(null);
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setShowCollectionPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const TILT = 5;

  const handleMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      // Real-time tilt — no transition delay while moving
      card.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease";
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const tX = ((y - cy) / cy) * TILT;
      const tY = ((cx - x) / cx) * TILT;
      card.style.transform = `perspective(700px) rotateX(${tX}deg) rotateY(${tY}deg) translateZ(18px) scale(1.04)`;
      card.style.boxShadow = `${-tY * 2}px ${tX * 2}px 50px rgba(0,0,0,0.7), 0 0 0 1px var(--card-accent), 0 8px 40px var(--card-glow)`;
    });
  };

  const handleMouseEnter = () => {
    cardRef.current?.classList.add("is-hovered");
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    // Re-enable spring transition for smooth return to flat
    card.style.transition =
      "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
    card.classList.remove("is-hovered");
    card.style.transform = "";
    card.style.boxShadow = "";
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteItem(item._id);
    setDeleting(false);
    setMenuOpen(false);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(item._id);
  };

  const handleAddToCollection = async (e, collectionId) => {
    e.stopPropagation();
    setAddingToCollection(true);
    await addToCollection(item._id, collectionId);
    setAddingToCollection(false);
    setShowCollectionPicker(false);
    setMenuOpen(false);
  };

  const getOpenUrl = () => {
    if (!item.url) return "#";
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
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  const ts = TYPE_STYLES[item.type] || TYPE_STYLES.article;

  return (
    <div
      className="item-card-wrapper"
      style={{ "--card-delay": `${Math.min(index * 0.065, 0.6)}s` }}
    >
      <div
        className="item-card"
        ref={cardRef}
        onClick={() => navigate(`/item/${item._id}`)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          "--card-accent": ts.color,
          "--card-glow": ts.glow,
        }}
      >
        {/* Shimmer sweep */}
        <div className="item-card-shimmer" />
        {/* Inner clip wrapper — overflow:hidden here, not on card (tilt needs visible overflow) */}
        <div className="item-card-inner">
          {/* ── Image ── */}
          <div className="item-card-image">
            {item.image ? (
              <img src={item.image} alt={item.title} loading="lazy" />
            ) : (
              <div
                className="item-card-image-placeholder"
                style={{
                  background: `linear-gradient(135deg, ${ts.bg}, rgba(6,8,16,0.9))`,
                }}
              >
                <span
                  style={{
                    color: ts.color,
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.07em",
                  }}
                >
                  {item.type?.toUpperCase()}
                </span>
              </div>
            )}
            <span
              className="item-type-badge"
              style={{ background: ts.bg, color: ts.color }}
            >
              {item.type}
            </span>
          </div>

          {/* ── Content ── */}
          <div className="item-card-content">
            {item.siteName && <p className="item-site-name">{item.siteName}</p>}
            <h3 className="item-title">{item.title || "Untitled"}</h3>
            {item.description && (
              <p className="item-description">{item.description}</p>
            )}
            {item.tags?.length > 0 && (
              <div className="item-tags">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="item-tag"
                    style={{
                      color: ts.color,
                      borderColor: `${ts.color}30`,
                      background: ts.bg,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="item-card-footer">
            <span className="item-date">{timeAgo(item.createdAt)}</span>

            <div className="item-actions">
              <button
                className={`icon-btn${item.isFavorite ? " active-favorite" : ""}`}
                onClick={handleFavorite}
                title={item.isFavorite ? "Unfavorite" : "Favorite"}
              >
                <svg
                  width="13"
                  height="13"
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

              <a
                href={getOpenUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                title="Open"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  width="13"
                  height="13"
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

              <div style={{ position: "relative" }} ref={menuRef}>
                <button
                  className="icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((p) => !p);
                    setShowCollectionPicker(false);
                  }}
                  title="More"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>

                {menuOpen && !showCollectionPicker && (
                  <div className="card-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCollectionPicker(true);
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3z" />
                      </svg>
                      Add to Collection
                    </button>
                    <button
                      className="dropdown-item danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      disabled={deleting}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}

                {menuOpen && showCollectionPicker && (
                  <div className="card-dropdown collection-picker">
                    <div
                      className="collection-picker-header"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="collection-picker-back"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCollectionPicker(false);
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                          />
                        </svg>
                      </button>
                      <span>Add to Collection</span>
                    </div>
                    {collections.length === 0 ? (
                      <p className="collection-picker-empty">
                        No collections yet
                      </p>
                    ) : (
                      collections.map((col) => (
                        <button
                          key={col._id}
                          className={`dropdown-item${item.collectionId === col._id ? " active-collection" : ""}`}
                          onClick={(e) => handleAddToCollection(e, col._id)}
                          disabled={addingToCollection}
                        >
                          <span
                            className="collection-dot"
                            style={{
                              background: col.color || "#818cf8",
                              boxShadow: `0 0 6px ${col.color || "#818cf8"}50`,
                            }}
                          />
                          {col.name}
                          {item.collectionId === col._id && (
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              style={{
                                marginLeft: "auto",
                                color: "var(--indigo)",
                              }}
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* /item-card-inner */}
      </div>
    </div>
  );
};

export default ItemCard;
