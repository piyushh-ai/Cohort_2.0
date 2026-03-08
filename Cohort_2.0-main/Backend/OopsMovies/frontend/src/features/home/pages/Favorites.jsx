import { useMovies } from "../hooks/useMovies";
import { removeFavoriteApi } from "../api/movie.api";
import { useState } from "react";
import MovieCard from "../components/pages/MovieCard";
import Navbar from "../components/pages/Navbar";
import "../styles/Favorites.scss";

function Favorites() {
  // ✅ Context se directly data lo — no API call, no reload needed
  const { favMovies, favLoaded, removeFavorite } = useMovies();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (movieId) => {
    setRemovingId(movieId);
    try {
      await removeFavorite(movieId); // context + favMovies dono update ho jayenge
    } catch (err) {
      console.log("Remove favorite error", err);
    } finally {
      setRemovingId(null);
    }
  };

  const loading = !favLoaded;
  const favorites = favMovies;

  return (
    <div className="fav-page">
      <Navbar />

      {/* ── Page Hero Header ── */}
      <div className="fav-header">
        <div className="fav-header__glow" />
        <div className="fav-header__mesh" />
        <div className="fav-header__content">
          <div className="fav-header__badge">
            <span className="fav-header__badge-icon">♥</span>
            <span>Your Collection</span>
          </div>
          <h1 className="fav-header__title">My Favorites</h1>
          <p className="fav-header__sub">
            {loading
              ? "Loading your collection…"
              : favorites.length > 0
              ? `${favorites.length} film${favorites.length !== 1 ? "s" : ""} saved to your list`
              : "Your personal watchlist awaits"}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <section className="fav-section">

        {/* Loading skeleton */}
        {loading && (
          <div className="fav-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="fav-skel" style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && favorites.length === 0 && (
          <div className="fav-empty">
            <div className="fav-empty__icon">🎬</div>
            <p className="fav-empty__title">No favorites yet</p>
            <p className="fav-empty__sub">
              Hit the ♥ on any movie card to save it here
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && favorites.length > 0 && (
          <div className="fav-grid">
            {favorites.map((movie, i) => (
              <div
                key={movie.id}
                className={`fav-grid__item${removingId === movie.id ? " fav-grid__item--removing" : ""}`}
                style={{ animationDelay: `${(i % 20) * 0.05}s` }}
              >
                <MovieCard
                  movie={movie}
                  onFavChange={(id, isFav) => {
                    if (!isFav) handleRemove(id);
                  }}
                />
                <button
                  className={`fav-remove-btn${removingId === movie.id ? " fav-remove-btn--loading" : ""}`}
                  onClick={() => handleRemove(movie.id)}
                  disabled={removingId === movie.id}
                >
                  {removingId === movie.id ? (
                    <span className="fav-remove-btn__spinner" />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                      Remove
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Favorites;