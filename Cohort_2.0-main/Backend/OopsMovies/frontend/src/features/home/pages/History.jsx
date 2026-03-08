import { useState } from "react";
import { clearHistoryApi } from "../api/movie.api";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/pages/MovieCard";
import Navbar from "../components/pages/Navbar";
import "../styles/History.scss";

function History() {
  // ✅ Context se directly data lo — no API call, no reload needed
  const { historyMovies, historyLoaded, setHistoryMovies } = useMovies();
  const [clearing, setClearing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const loading = !historyLoaded;
  const history = historyMovies;

  const handleClearHistory = async () => {
    setClearing(true);
    setShowConfirm(false);
    try {
      await clearHistoryApi();
      setHistoryMovies([]); // context update karo
    } catch (err) {
      console.log("Clear history error", err);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="hist-page">
      <Navbar />

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <div className="hist-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="hist-modal" onClick={e => e.stopPropagation()}>
            <div className="hist-modal__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="hist-modal__title">Clear Watch History?</h3>
            <p className="hist-modal__sub">
              This will permanently delete all your watched movies. This action cannot be undone.
            </p>
            <div className="hist-modal__actions">
              <button
                className="hist-modal__btn hist-modal__btn--cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="hist-modal__btn hist-modal__btn--confirm"
                onClick={handleClearHistory}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Hero Header ── */}
      <div className="hist-header">
        <div className="hist-header__glow" />
        <div className="hist-header__mesh" />
        <div className="hist-header__content">
          <div className="hist-header__badge">
            <span className="hist-header__badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span>Watch History</span>
          </div>
          <h1 className="hist-header__title">Recently Watched</h1>
          <p className="hist-header__sub">
            {loading
              ? "Loading your history…"
              : history.length > 0
              ? `${history.length} film${history.length !== 1 ? "s" : ""} in your watch history`
              : "No films watched yet — start exploring"}
          </p>
        </div>
        <div className="hist-header__line" />
      </div>

      {/* ── Content ── */}
      <section className="hist-section">

        {/* Clear History Button */}
        {!loading && history.length > 0 && (
          <div className="hist-actions">
            <button
              className={`hist-clear-btn${clearing ? " hist-clear-btn--loading" : ""}`}
              onClick={() => setShowConfirm(true)}
              disabled={clearing}
            >
              {clearing ? (
                <span className="hist-clear-btn__spinner" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Clear History
                </>
              )}
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="hist-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="hist-skel" style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && history.length === 0 && (
          <div className="hist-empty">
            <div className="hist-empty__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="hist-empty__title">No watch history yet</p>
            <p className="hist-empty__sub">
              Movies you view will appear here automatically
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && history.length > 0 && (
          <div className="hist-grid">
            {history.map((movie, i) => (
              <div
                key={movie.id}
                className="hist-grid__item"
                style={{ animationDelay: `${(i % 20) * 0.05}s` }}
              >
                {i < 3 && (
                  <div className={`hist-badge hist-badge--${i === 0 ? "latest" : "recent"}`}>
                    {i === 0 ? "Latest" : `#${i + 1}`}
                  </div>
                )}
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default History;