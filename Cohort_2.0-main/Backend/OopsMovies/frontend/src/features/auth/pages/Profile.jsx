import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useAuth } from "../hooks/useAuth";
import { useMovies } from "../../home/hooks/useMovies";
import MovieCard from "../../home/components/pages/MovieCard";
import Navbar from "../../home/components/pages/Navbar";

export default function Profile() {
  const { user, logout } = useAuth();
  const { favMovies, favLoaded, historyMovies, historyLoaded } = useMovies();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const displayMovies = activeTab === "favorites" ? favMovies : historyMovies;
  const isLoaded = activeTab === "favorites" ? favLoaded : historyLoaded;

  return (
    <div className="prof-page">
      <Navbar />

      {/* ── Header glow bg ── */}
      <div className="prof-hero">
        <div className="prof-hero__glow" />
        <div className="prof-hero__mesh" />

        <div className="prof-hero__inner">
          {/* Avatar */}
          <div className="prof-avatar-wrap">
            <div className="prof-avatar">
              <span>{initials || "?"}</span>
            </div>
            {user?.role === "admin" && (
              <div className="prof-avatar__badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  width="10"
                  height="10"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="prof-hero__info">
            <div className="prof-hero__top">
              <div>
                <h1 className="prof-name">{user?.name}</h1>
                <p className="prof-email">{user?.email}</p>
                {joinDate && (
                  <p className="prof-joined">Member since {joinDate}</p>
                )}
              </div>

              {/* Role badge */}
              <div className="prof-hero__badges">
                <span
                  className={`prof-role-badge prof-role-badge--${user?.role}`}
                >
                  {user?.role === "admin" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="12"
                      height="12"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="prof-stats">
              <div className="prof-stat">
                <span className="prof-stat__val">
                  {favLoaded ? favMovies.length : "—"}
                </span>
                <span className="prof-stat__label">Favorites</span>
              </div>
              <div className="prof-stat__divider" />
              <div className="prof-stat">
                <span className="prof-stat__val">
                  {historyLoaded ? historyMovies.length : "—"}
                </span>
                <span className="prof-stat__label">Watched</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="prof-hero__actions">
          {user?.role === "admin" && (
            <Link to="/admin" className="prof-admin-btn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="16"
                height="16"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Panel
            </Link>
          )}
          <button className="prof-logout-btn" onClick={handleLogout}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="15"
              height="15"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="prof-tabs">
        <button
          className={`prof-tab${activeTab === "favorites" ? " prof-tab--active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          <svg
            viewBox="0 0 24 24"
            fill={activeTab === "favorites" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            width="15"
            height="15"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Favorites
          {favLoaded && favMovies.length > 0 && (
            <span className="prof-tab__count">{favMovies.length}</span>
          )}
        </button>
        <button
          className={`prof-tab${activeTab === "history" ? " prof-tab--active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="15"
            height="15"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Watch History
          {historyLoaded && historyMovies.length > 0 && (
            <span className="prof-tab__count">{historyMovies.length}</span>
          )}
        </button>
      </div>

      {/* ── Content ── */}
      <section className="prof-section">
        {/* Skeleton */}
        {!isLoaded && (
          <div className="prof-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="prof-skel"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {isLoaded && displayMovies.length === 0 && (
          <div className="prof-empty">
            <div className="prof-empty__icon">
              {activeTab === "favorites" ? "♥" : "🕐"}
            </div>
            <p className="prof-empty__title">
              {activeTab === "favorites"
                ? "No favorites yet"
                : "No watch history yet"}
            </p>
            <p className="prof-empty__sub">
              {activeTab === "favorites"
                ? "Save movies you love — they'll appear here"
                : "Movies you open will be saved here automatically"}
            </p>
            <Link to="/" className="prof-empty__btn">
              Browse Movies
            </Link>
          </div>
        )}

        {/* Grid */}
        {isLoaded && displayMovies.length > 0 && (
          <div className="prof-grid">
            {displayMovies.map((movie, i) => (
              <div
                key={movie.id}
                className="prof-grid__item"
                style={{ animationDelay: `${(i % 20) * 0.04}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
