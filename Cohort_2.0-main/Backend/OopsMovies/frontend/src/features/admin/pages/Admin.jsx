// src/features/admin/pages/Admin.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Admin.scss";
import {
  deleteMovieApi,
  getAllMoviesApi,
  getAllUsersApi,
  tmdbSearchApi,
  tmdbTrailerApi,
  toggleBanUserApi,
  updateMovieApi,
  updateUserRoleApi,
  uploadMovieApi,
} from "../services/admin.api";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../../home/components/pages/Navbar";

// ── Icons ──────────────────────────────────────────────────────
const Icon = {
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Film: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
      <line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon
        points="10 8 16 12 10 16 10 8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Wand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5" />
    </svg>
  ),
  Link: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

// ── Empty form state ───────────────────────────────────────────
// NOTE: Admin sirf TMDB se movie choose karega.
// MongoDB me jo save/update hoga wo TMDB ke data se aayega.
const EMPTY_FORM = {
  title: "",
  posterUrl: "",
  description: "",
  tmdbId: "",
  releaseDate: "",
  trailerUrl: "",
  genre: "",
  category: "movie",
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("users"); // "users" | "movies"

  // ── Users state ───────────────────────────
  const [users, setUsers] = useState([]);
  const [usersLoading, setUL] = useState(true);
  const [roleLoading, setRL] = useState(null);
  const [banLoading, setBL] = useState(null);
  const [userSearch, setUserSearch] = useState("");

  // ── Movies state ──────────────────────────
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setML] = useState(true);
  const [deleteLoading, setDL] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // null = upload mode, id = edit mode
  const [submitLoading, setSL] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // ── TMDB auto-fill state ──────────────────
  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [tmdbSearching, setTmdbSearching] = useState(false);
  const [tmdbDropOpen, setTmdbDropOpen] = useState(false);
  const tmdbDebounce = useRef(null);

  // ── Redirect if not admin ─────────────────
  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user]);

  // ── Fetch data on tab switch ──────────────
  useEffect(() => {
    if (tab === "users") fetchUsers();
    else fetchMovies();
  }, [tab]);

  const fetchUsers = async () => {
    setUL(true);
    try {
      const r = await getAllUsersApi();
      setUsers(r.data.users);
    } catch {
      /* silently fail */
    } finally {
      setUL(false);
    }
  };

  const fetchMovies = async () => {
    setML(true);
    try {
      const r = await getAllMoviesApi();
      setMovies(r.data.movies);
    } catch {
      /* silently fail */
    } finally {
      setML(false);
    }
  };

  // ── Role change ───────────────────────────
  const handleRoleChange = async (userId, newRole) => {
    setRL(userId);
    try {
      const r = await updateUserRoleApi(userId, newRole);
      setUsers((prev) => prev.map((u) => (u._id === userId ? r.data.user : u)));
    } catch (e) {
      alert(e.response?.data?.message || "Role change failed");
    } finally {
      setRL(null);
    }
  };

  // ── Ban toggle ────────────────────────────
  const handleBan = async (userId) => {
    setBL(userId);
    try {
      const r = await toggleBanUserApi(userId);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBanned: r.data.user.isBanned } : u,
        ),
      );
    } catch {
      /* silently fail */
    } finally {
      setBL(null);
    }
  };

  // ── Movie delete ──────────────────────────
  const handleDelete = async (movieId) => {
    if (!window.confirm("Delete this movie?")) return;
    setDL(movieId);
    try {
      await deleteMovieApi(movieId);
      setMovies((prev) => prev.filter((m) => m._id !== movieId));
    } catch {
      /* silently fail */
    } finally {
      setDL(null);
    }
  };

  // Open edit form pre-filled with movie data (read-only TMDB fields)
  const handleEditOpen = (movie) => {
    setEditingId(movie._id);
    setForm({
      title: movie.title || "",
      posterUrl: movie.posterUrl || "",
      description: movie.description || "",
      tmdbId: movie.tmdbId ? String(movie.tmdbId) : "",
      releaseDate: movie.releaseDate || "",
      trailerUrl: movie.trailerUrl || "",
      genre: movie.genre || "",
      category: movie.category || "movie",
    });
    setTmdbQuery("");
    setFormError("");
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── TMDB search (debounced) ───────────────
  const handleTmdbQuery = useCallback((val) => {
    setTmdbQuery(val);
    if (tmdbDebounce.current) clearTimeout(tmdbDebounce.current);
    if (!val.trim()) {
      setTmdbResults([]);
      setTmdbDropOpen(false);
      return;
    }
    tmdbDebounce.current = setTimeout(async () => {
      setTmdbSearching(true);
      try {
        const r = await tmdbSearchApi(val);
        setTmdbResults(r.data.results || []);
        setTmdbDropOpen(true);
      } catch {
        /* silently fail */
      } finally {
        setTmdbSearching(false);
      }
    }, 400);
  }, []);

  // ── TMDB auto-fill ────────────────────────
  const handleTmdbSelect = async (movie) => {
    setTmdbDropOpen(false);
    setTmdbQuery(movie.title);
    setForm((prev) => ({
      ...prev,
      title: movie.title,
      posterUrl: movie.posterUrl,
      description: movie.description,
      tmdbId: String(movie.tmdbId),
      releaseDate: movie.releaseDate,
      genre: movie.genre,
    }));
    try {
      const tr = await tmdbTrailerApi(movie.tmdbId);
      if (tr.data.trailerUrl) {
        setForm((prev) => ({ ...prev, trailerUrl: tr.data.trailerUrl }));
      }
    } catch {
      /* no trailer */
    }
  };

  // ── Form submit (Upload OR Edit) ──────────
  const handleSubmit = async () => {
    // Naya upload ke liye tmdbId required hai
    if (!editingId && !form.tmdbId.trim()) {
      setFormError("Please select a movie from TMDB first.");
      return;
    }
    setSL(true);
    setFormError("");
    setFormSuccess("");

    try {
      const payload = {
        category: form.category,
      };

      if (form.tmdbId.trim()) {
        payload.tmdbId = form.tmdbId.trim();
      }

      if (editingId) {
        // EDIT mode: yahan se description/genre override bhej sakte hain
        if (form.description.trim()) {
          payload.description = form.description.trim();
        }
        if (form.genre.trim()) {
          payload.genre = form.genre.trim();
        }

        const r = await updateMovieApi(editingId, payload);
        setMovies((prev) =>
          prev.map((m) => (m._id === editingId ? r.data.movie : m)),
        );
        setFormSuccess("Movie updated successfully!");
      } else {
        // Upload mode
        const r = await uploadMovieApi(payload);
        setMovies((prev) => [r.data.movie, ...prev]);
        setFormSuccess("Movie uploaded successfully!");
      }

      setForm(EMPTY_FORM);
      setTmdbQuery("");
      setEditingId(null);
      setShowForm(false);
      setTimeout(() => setFormSuccess(""), 3000);
    } catch (e) {
      setFormError(e.response?.data?.message || "Operation failed");
    } finally {
      setSL(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()),
  );

  // ── Render ────────────────────────────────
  return (
    <div className="adm-page">
      <Navbar />

      {/* Header */}
      <div className="adm-header">
        <div className="adm-header__glow" />
        <div className="adm-header__content">
          <div className="adm-header__badge">
            <Icon.Shield />
            <span>Admin Panel</span>
          </div>
          <h1 className="adm-header__title">
            Control <span>Center</span>
          </h1>
          <p className="adm-header__sub">
            Manage users, roles, and movie uploads
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        <button
          className={`adm-tab${tab === "users" ? " adm-tab--active" : ""}`}
          onClick={() => setTab("users")}
        >
          <Icon.Users />
          Users
          {users.length > 0 && (
            <span className="adm-tab__count">{users.length}</span>
          )}
        </button>
        <button
          className={`adm-tab${tab === "movies" ? " adm-tab--active" : ""}`}
          onClick={() => setTab("movies")}
        >
          <Icon.Film /> 
          Movies
          {movies.length > 0 && (
            <span className="adm-tab__count">{movies.length}</span>
          )}
        </button>
      </div>
    

      {tab === "users" && (
        <section className="adm-section">
          <div className="adm-search-wrap">
            <Icon.Search />
            <input
              className="adm-search"
              placeholder="Search users by name or email…"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>

          {usersLoading ? (
            <div className="adm-skels">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="adm-skel" style={{ animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          ) : (
            <>
              {/* ── Desktop Table ── */}
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className={u.isBanned ? "adm-table__row--banned" : ""}>
                        <td>
                          <div className="adm-user-cell">
                            <div className="adm-avatar">{u.name?.[0]?.toUpperCase()}</div>
                            <span className="adm-name">{u.name}</span>
                            {u._id === user?._id && <span className="adm-you-badge">You</span>}
                          </div>
                        </td>
                        <td className="adm-email">{u.email}</td>
                        <td>
                          <span className={`adm-role-badge adm-role-badge--${u.role}`}>
                            {u.role === "admin" && <Icon.Shield />}
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span className={`adm-status-badge ${u.isBanned ? "adm-status-badge--banned" : "adm-status-badge--active"}`}>
                            {u.isBanned ? "Banned" : "Active"}
                          </span>
                        </td>
                        <td className="adm-date">
                          {new Date(u.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </td>
                        <td>
                          {u._id !== user?._id && (
                            <div className="adm-actions">
                              <button
                                className={`adm-btn adm-btn--role ${u.role === "admin" ? "adm-btn--demote" : "adm-btn--promote"}`}
                                onClick={() => handleRoleChange(u._id, u.role === "admin" ? "user" : "admin")}
                                disabled={roleLoading === u._id}
                              >
                                {roleLoading === u._id ? (
                                  <span className="adm-spinner" />
                                ) : u.role === "admin" ? (
                                  <><Icon.X /> Demote</>
                                ) : (
                                  <><Icon.Shield /> Make Admin</>
                                )}
                              </button>
                              <button
                                className={`adm-btn ${u.isBanned ? "adm-btn--unban" : "adm-btn--ban"}`}
                                onClick={() => handleBan(u._id)}
                                disabled={banLoading === u._id}
                              >
                                {banLoading === u._id ? (
                                  <span className="adm-spinner" />
                                ) : u.isBanned ? (
                                  <><Icon.Check /> Unban</>
                                ) : (
                                  <><Icon.X /> Ban</>
                                )}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && <div className="adm-empty">No users found</div>}
              </div>

              {/* ── Mobile Cards ── */}
              <div className="adm-user-cards">
                {filteredUsers.length === 0 && <div className="adm-empty">No users found</div>}
                {filteredUsers.map((u) => (
                  <div key={u._id} className={`adm-user-card${u.isBanned ? " adm-user-card--banned" : ""}`}>
                    {/* Top row: avatar + name/email + role + status */}
                    <div className="adm-user-card__top">
                      <div className="adm-avatar">{u.name?.[0]?.toUpperCase()}</div>
                      <div className="adm-user-card__info">
                        <div className="adm-user-card__name">
                          {u.name}
                          {u._id === user?._id && <span className="adm-you-badge">You</span>}
                        </div>
                        <div className="adm-user-card__email">{u.email}</div>
                      </div>
                      <div className="adm-user-card__badges">
                        <span className={`adm-role-badge adm-role-badge--${u.role}`}>
                          {u.role === "admin" && <Icon.Shield />}
                          {u.role}
                        </span>
                      </div>
                    </div>

                    {/* Bottom row: joined date + status + actions */}
                    <div className="adm-user-card__bottom">
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="adm-user-card__date">
                          {new Date(u.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </span>
                        <span className={`adm-status-badge ${u.isBanned ? "adm-status-badge--banned" : "adm-status-badge--active"}`}>
                          {u.isBanned ? "Banned" : "Active"}
                        </span>
                      </div>

                      {u._id !== user?._id && (
                        <div className="adm-user-card__actions">
                          <button
                            className={`adm-btn ${u.role === "admin" ? "adm-btn--demote" : "adm-btn--promote"}`}
                            onClick={() => handleRoleChange(u._id, u.role === "admin" ? "user" : "admin")}
                            disabled={roleLoading === u._id}
                          >
                            {roleLoading === u._id ? (
                              <span className="adm-spinner" />
                            ) : u.role === "admin" ? (
                              <><Icon.X /> Demote</>
                            ) : (
                              <><Icon.Shield /> Admin</>
                            )}
                          </button>
                          <button
                            className={`adm-btn ${u.isBanned ? "adm-btn--unban" : "adm-btn--ban"}`}
                            onClick={() => handleBan(u._id)}
                            disabled={banLoading === u._id}
                          >
                            {banLoading === u._id ? (
                              <span className="adm-spinner" />
                            ) : u.isBanned ? (
                              <><Icon.Check /> Unban</>
                            ) : (
                              <><Icon.X /> Ban</>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* ── MOVIES TAB ── */}  
      {tab === "movies" && (
        <section className="adm-section">
          {formSuccess && (
            <div className="adm-toast adm-toast--success">
              <Icon.Check /> {formSuccess}
            </div>
          )}

          <div className="adm-movies-header">
            <p className="adm-movies-count">{movies.length} movies uploaded</p>
            <button
              className="adm-upload-btn"
              onClick={() => {
                if (showForm && !editingId) {
                  // Cancel upload
                  setShowForm(false);
                } else {
                  // Open fresh upload form
                  setEditingId(null);
                  setForm(EMPTY_FORM);
                  setTmdbQuery("");
                  setFormError("");
                  setShowForm(true);
                }
              }}
            >
              <Icon.Plus />
              {showForm && !editingId ? "Cancel" : "Upload Movie"}
            </button>
          </div>

          {/* ── Upload / Edit Form ── */}
          {showForm && (
            <div className="adm-form-card">
              <h3 className="adm-form-title">
                {editingId ? (
                  <>
                    <Icon.Edit /> Edit Movie
                  </>
                ) : (
                  <>
                    <Icon.Film /> New Movie
                  </>
                )}
              </h3>

              {/* TMDB Auto-fill — upload + edit dono mein available */}
              <div className="adm-form-group">
                <label className="adm-label">
                  <Icon.Wand /> {editingId ? "Change TMDB movie (optional)" : "Auto-fill from TMDB"}
                </label>
                <div className="adm-tmdb-wrap">
                  <input
                    className="adm-input"
                    placeholder="Search movie name…"
                    value={tmdbQuery}
                    onChange={(e) => handleTmdbQuery(e.target.value)}
                    onFocus={() =>
                      tmdbResults.length > 0 && setTmdbDropOpen(true)
                    }
                  />
                  {tmdbSearching && (
                    <span className="adm-spinner adm-spinner--input" />
                  )}
                  {tmdbDropOpen && tmdbResults.length > 0 && (
                    <div className="adm-tmdb-drop">
                      {tmdbResults.map((m) => (
                        <div
                          key={m.tmdbId}
                          className="adm-tmdb-item"
                          onMouseDown={() => handleTmdbSelect(m)}
                        >
                          {m.posterUrl ? (
                            <img
                              src={m.posterUrl}
                              alt=""
                              className="adm-tmdb-poster"
                            />
                          ) : (
                            <div className="adm-tmdb-poster adm-tmdb-poster--empty">
                              🎬
                            </div>
                          )}
                          <div>
                            <p className="adm-tmdb-title">{m.title}</p>
                            <p className="adm-tmdb-year">
                              {m.releaseDate?.slice(0, 4)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form fields */}
              <div className="adm-form-grid">
                <div className="adm-form-group">
                  <label className="adm-label">Title *</label>
                  <input
                    className="adm-input"
                    placeholder="Movie title (from TMDB)"
                    value={form.title}
                    readOnly
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Category</label>
                  <select
                    className="adm-input adm-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                  </select>
                </div>

                <div className="adm-form-group adm-form-group--full">
                  <label className="adm-label">Poster URL *</label>
                  <div className="adm-poster-row">
                    <input
                      className="adm-input"
                      placeholder="https://image.tmdb.org/… (from TMDB)"
                      value={form.posterUrl}
                      readOnly
                    />
                    {form.posterUrl && (
                      <img
                        src={form.posterUrl}
                        alt=""
                        className="adm-poster-preview"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                  </div>
                </div>

                {/* ✅ NEW: Video URL field — most important */}
                <div className="adm-form-group">
                  <label className="adm-label">Trailer URL (YouTube)</label>
                  <input
                    className="adm-input"
                    placeholder="https://youtube.com/watch?v=… (from TMDB)"
                    value={form.trailerUrl}
                    readOnly
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Release Date</label>
                  <input
                    className="adm-input"
                    placeholder="YYYY-MM-DD"
                    value={form.releaseDate}
                    readOnly
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Genre</label>
                  <input
                    className="adm-input"
                    placeholder={
                      editingId
                        ? "Action, Drama… (you can customize)"
                        : "Action, Drama… (from TMDB)"
                    }
                    value={form.genre}
                    onChange={
                      editingId
                        ? (e) =>
                          setForm((p) => ({ ...p, genre: e.target.value }))
                        : undefined
                    }
                    readOnly={!editingId}
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">TMDB ID</label>
                  <input
                    className="adm-input"
                    placeholder="Filled automatically"
                    value={form.tmdbId}
                    readOnly
                  />
                </div>

                <div className="adm-form-group adm-form-group--full">
                  <label className="adm-label">
                    Description{" "}
                    {editingId && (
                      <span className="adm-label-hint">
                        (you can edit this text)
                      </span>
                    )}
                  </label>
                  <textarea
                    className="adm-input adm-textarea"
                    placeholder={
                      editingId
                        ? "Write your own description for this movie…"
                        : "Movie description… (from TMDB)"
                    }
                    value={form.description}
                    rows={3}
                    onChange={
                      editingId
                        ? (e) =>
                          setForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        : undefined
                    }
                    readOnly={!editingId}
                  />
                </div>
              </div>

              {formError && (
                <p className="adm-form-error">
                  <Icon.X /> {formError}
                </p>
              )}

              <div className="adm-form-actions">
                <button
                  className="adm-cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(EMPTY_FORM);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="adm-submit-btn"
                  onClick={handleSubmit}
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span className="adm-spinner" />{" "}
                      {editingId ? "Saving…" : "Uploading…"}
                    </>
                  ) : (
                    <>
                      <Icon.Check />{" "}
                      {editingId ? "Save Changes" : "Upload Movie"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Movies grid */}
          {moviesLoading ? (
            <div className="adm-skels adm-skels--movies">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="adm-skel adm-skel--movie"
                  style={{ animationDelay: `${i * 0.06}s` }}
                />
              ))}
            </div>
          ) : movies.length === 0 ? (
            <div className="adm-empty">
              <Icon.Film />
              <p>No movies uploaded yet</p>
            </div>
          ) : (
            <div className="adm-movies-grid">
              {movies.map((m) => (
                <div key={m._id} className="adm-movie-card">
                  <div className="adm-movie-card__poster">
                    {m.posterUrl ? (
                      <img src={m.posterUrl} alt={m.title} loading="lazy" />
                    ) : (
                      <div className="adm-movie-card__poster-empty">🎬</div>
                    )}
                    <div className="adm-movie-card__overlay">
                      {/* ✅ Edit button */}
                      <button
                        className="adm-movie-edit-btn"
                        onClick={() => handleEditOpen(m)}
                      >
                        <Icon.Edit />
                      </button>
                      <button
                        className="adm-movie-delete-btn"
                        onClick={() => handleDelete(m._id)}
                        disabled={deleteLoading === m._id}
                      >
                        {deleteLoading === m._id ? (
                          <span className="adm-spinner" />
                        ) : (
                          <Icon.Trash />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="adm-movie-card__info">
                    <p className="adm-movie-card__title">{m.title}</p>
                    <div className="adm-movie-card__meta">
                      {m.releaseDate && (
                        <span>{m.releaseDate.slice(0, 4)}</span>
                      )}
                      {m.category && (
                        <span className="adm-movie-card__cat">
                          {m.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
