import React, { useEffect, useState, useContext } from "react";
import FaceExpression from "../../expressions/components/FaceExpression";
import { useSong } from "../hook/song.hook";
import Player from "../components/Player";
import { SongContext } from "../songContext";
import "../styles/home.scss";

const MOOD_META = {
  happy:     { emoji: "😄", label: "Happy",     color: "#f6c94e" },
  sad:       { emoji: "😢", label: "Sad",        color: "#6eb5ff" },
  surprised: { emoji: "😲", label: "Surprised",  color: "#c87bff" },
  neutral:   { emoji: "😐", label: "Neutral",    color: "#b8f256" },
};

const MOOD_COLORS = {
  happy: "#f6c94e", sad: "#6eb5ff", surprised: "#c87bff", neutral: "#b8f256",
};

const TICKER_ITEMS = [
  "Face Detection Active", "AI Mood Analysis", "Curated Playlists",
  "Real-time Detection", "4 Mood Profiles", "Personalized Sound",
];

const fmt = (s) => {
  if (!s || !isFinite(s) || isNaN(s)) return null;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const Home = () => {
  const { handleGetSong, allSong, handleGetAllSongs } = useSong();
  const { setSong, song: currentSong } = useContext(SongContext);

  const [detected,  setDetected]  = useState(null);
  const [scanning,  setScanning]  = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [filter,    setFilter]    = useState("all");

  const handleDetect = async (expression) => {
    setDetected(expression);
    setScanning(true);
    setScanCount((c) => c + 1);
    await handleGetSong({ mood: expression });
    setScanning(false);
  };

  const handlePlayFromLibrary = (songItem) => {
    setSong(songItem);
  };

  useEffect(() => {
    handleGetAllSongs();
  }, []);

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const moods = ["all", "happy", "sad", "neutral", "surprised"];
  const filteredSongs = !allSong ? [] : filter === "all"
    ? allSong
    : allSong.filter((s) => s.mood === filter);

  return (
    <div className="home-root">
      <div className="home-orb home-orb--gold" />
      <div className="home-orb home-orb--purple" />
      <div className="home-orb home-orb--lime" />
      <div className="home-grid" />

      {/* ── Header ── */}
      <header className="home-header">
        <div className="header-left">
          <div className="header-logo-mark">
            {[...Array(4)].map((_, i) => <div key={i} className="bar" />)}
          </div>
          <h1 className="header-title">MOODIFY</h1>
        </div>
        <div className="header-center">
          <div className="header-pill">
            <div className="pill-dot" />
            AI Music Engine
          </div>
        </div>
        <div className="header-right">
          <span className="header-tag">v2.0 · BETA</span>
          <div className="header-avatar">M</div>
        </div>
      </header>

      {/* ── Ticker ── */}
      <div className="home-ticker" aria-hidden="true">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" />{item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Camera + Player ── */}
      <main className="home-main">
        <section className="home-section home-section--camera">
          <div className="section-label">
            <span className="label-dot" />Face Detection
          </div>

          <div className="camera-wrapper">
            <FaceExpression onClick={handleDetect} />
          </div>

          {detected && (
            <div
              className="detected-badge"
              style={{ "--mood-color": MOOD_META[detected]?.color ?? "#b8f256" }}
            >
              <span className="detected-emoji">{MOOD_META[detected]?.emoji}</span>
              <div className="detected-info">
                <span className="detected-label">Detected mood</span>
                <strong className="detected-name">{MOOD_META[detected]?.label ?? detected}</strong>
              </div>
              {scanning && <div className="scanning-ring" />}
            </div>
          )}

          <p className="camera-hint">
            Look at the camera and click <em>Detect Expression</em> — Moodify will find the perfect soundtrack for your mood.
          </p>

          <div className="camera-stats">
            <div className="camera-stat">
              <span className="stat-value">{scanCount}</span>
              <span className="stat-label">Scans</span>
            </div>
            <div className="camera-stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Moods</span>
            </div>
            <div className="camera-stat">
              <span className="stat-value">{allSong?.length ?? 0}</span>
              <span className="stat-label">Tracks</span>
            </div>
          </div>
        </section>

        <div className="home-divider" />

        <section className="home-section home-section--player">
          <div className="section-label">
            <span className="label-dot label-dot--lime" />Now Playing
          </div>
          <Player />
        </section>
      </main>

      {/* ── Song Library ── */}
      <section className="home-library">
        {/* Library header */}
        <div className="library-header">
          <div className="library-title-row">
            <div className="library-heading">
              <span className="label-dot label-dot--lime" />
              <span className="library-heading-text">Song Library</span>
              <span className="library-count">{allSong?.length ?? 0} tracks</span>
            </div>

            {/* Mood filter pills */}
            <div className="library-filters">
              {moods.map((m) => (
                <button
                  key={m}
                  className={`filter-btn ${filter === m ? "active" : ""}`}
                  style={filter === m && m !== "all"
                    ? { "--tab-color": MOOD_COLORS[m] }
                    : {}
                  }
                  onClick={() => setFilter(m)}
                >
                  {m === "all" ? "✦ All" : `${MOOD_META[m]?.emoji} ${MOOD_META[m]?.label}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {!allSong ? (
          /* Loading skeletons */
          <div className="song-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="song-card song-card--skeleton">
                <div className="song-card-art skeleton-box" />
                <div className="song-card-info">
                  <span className="skeleton-line" style={{ width: "65%" }} />
                  <span className="skeleton-line" style={{ width: "42%", marginTop: 6 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="library-empty">
            <span className="library-empty-icon">🎵</span>
            <p>No songs for this mood yet.</p>
          </div>
        ) : (
          <div className="song-grid">
            {filteredSongs.map((s, i) => {
              const isActive = currentSong && (currentSong?._id === s._id || currentSong?.url === s.url);
              const art    = s.posterUrl || s.albumArt || s.image || s.cover || null;
              const title  = s.title  || s.name       || "Unknown Title";
              const artist = s.artist || s.artistName || s.by || "Unknown Artist";
              const moodColor = MOOD_COLORS[s.mood] || "#b8f256";
              const duration  = fmt(s.duration);

              return (
                <div
                  key={s._id || i}
                  className={`song-card ${isActive ? "song-card--active" : ""}`}
                  style={{ "--song-color": moodColor }}
                  onClick={() => handlePlayFromLibrary(s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handlePlayFromLibrary(s)}
                  aria-label={`Play ${title} by ${artist}`}
                >
                  {/* Active left bar */}
                  {isActive && <div className="song-card-active-bar" />}

                  {/* Album art */}
                  <div className="song-card-art">
                    {art ? (
                      <img src={art} alt={title} />
                    ) : (
                      <div className="song-card-art-fallback">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </div>
                    )}

                    {/* Hover/active overlay */}
                    <div className="song-card-overlay">
                      {isActive ? (
                        <div className="mini-wave">
                          <span /><span /><span />
                        </div>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Song info */}
                  <div className="song-card-info">
                    <span className="song-card-title">{title}</span>
                    <span className="song-card-artist">{artist}</span>
                  </div>

                  {/* Right side: mood + duration */}
                  <div className="song-card-meta">
                    {s.mood && (
                      <span className="song-card-mood-badge" style={{ "--m": moodColor }}>
                        {MOOD_META[s.mood]?.emoji}
                      </span>
                    )}
                    {duration && <span className="song-card-dur">{duration}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;