import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import "./Player.scss";
import { SongContext } from "../../home/songContext";

// ── Icons ─────────────────────────────────────────────────
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M6 19h4V5H6zm8-14v14h4V5z" />
  </svg>
);
const IconSkipPrev = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
);
const IconSkipNext = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8l-5.5 4zM16 6h2v12h-2z" />
  </svg>
);
const IconShuffle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17zm4.76-.18.56.56L4 21.41 5.41 22.83 17.5 10.74l.56.56L21 8l-3-3-2.65 2.99zm.29 5.42-1.41 1.41 1.8 1.8-2.65 2.99L21 16.84V13l-5.36 1.41z" />
  </svg>
);
const IconRepeat = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    width="16" height="16"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const IconVolumeUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
  </svg>
);
const IconVolumeMute = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────
const fmt = (s) => {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const MOOD_LABELS = {
  happy:     "😄 Happy",
  sad:       "😢 Sad",
  surprised: "😲 Surprised",
  neutral:   "😐 Neutral",
};

// ── Component ─────────────────────────────────────────────
const Player = () => {
  const { song, loading } = useContext(SongContext);
  const audioRef = useRef(null);

  const [isPlaying,   setIsPlaying]   = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(0.7);
  const [isMuted,     setIsMuted]     = useState(false);
  const [liked,       setLiked]       = useState(false);
  const [shuffleOn,   setShuffleOn]   = useState(false);
  const [repeatOn,    setRepeatOn]    = useState(false);

  useEffect(() => {
    if (!song?.url) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = song.url;
    audio.load();
    audio.volume = volume;
    const onLoaded = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => audio.removeEventListener("loadedmetadata", onLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime  = () => setCurrentTime(audio.currentTime);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
  }, [isPlaying, song]);

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const handleVolume = useCallback((e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) { audioRef.current.volume = val; audioRef.current.muted = false; }
    setIsMuted(val === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const volPct      = isMuted ? 0 : volume * 100;

  const albumArt  = song?.posterUrl || song?.albumArt || song?.image || song?.cover || null;
  const songTitle = song?.title     || song?.name     || "Unknown Title";
  const artist    = song?.artist    || song?.artistName || song?.by || "Unknown Artist";
  const mood      = song?.mood      || null;

  return (
    <div className="player-wrapper">
      <audio ref={audioRef} preload="auto" />

      <div className={`player-card ${loading ? "player-loading" : ""}`}>

        {/* ── Album art hero ── */}
        <div className={`player-album-art ${isPlaying ? "is-playing" : ""} ${song ? "has-song" : ""}`}>

          {/* Blurred background image — does NOT rotate */}
          {albumArt && (
            <img className="art-bg-img" src={albumArt} alt="" aria-hidden="true" />
          )}

          {/* Placeholder when no song */}
          {!song && !loading && (
            <div className="art-placeholder">
              <div className="placeholder-rings">
                <div className="ring" /><div className="ring" />
                <div className="ring" /><div className="ring" />
                <div className="center-dot" />
              </div>
              <span className="placeholder-label">No track loaded</span>
            </div>
          )}

          {/* Vinyl disc container — centered, does NOT rotate */}
          {(song || loading) && (
            <div className="vinyl-disc-wrap">
              {/* Only THIS div rotates */}
              <div className="vinyl-disc">
                <div className="disc-label">
                  {albumArt
                    ? <img src={albumArt} alt="" />
                    : <div className="disc-label-fallback"><span>Moodify</span></div>
                  }
                </div>
                <div className="disc-pin" />
              </div>
            </div>
          )}

          {/* Wave bars */}
          <div className="wave-bars" aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          {/* Song info — floated bottom, does NOT rotate */}
          {(song || loading) && (
            <div className="art-song-info">
              <div className="art-text">
                <h2 className="art-title">{loading ? "\u00A0" : songTitle}</h2>
                <p className="art-artist">{loading ? "\u00A0" : artist}</p>
              </div>
              <button
                className={`like-btn ${liked ? "liked" : ""}`}
                onClick={() => setLiked(p => !p)}
                aria-label={liked ? "Unlike" : "Like"}
              >
                <IconHeart filled={liked} />
              </button>
            </div>
          )}
        </div>

        {/* ── Controls area ── */}
        {!song && !loading ? (
          <div className="player-empty">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <strong>No track loaded</strong>
            <p>Detect your mood to get a personalised recommendation.</p>
          </div>
        ) : (
          <div className="player-controls-area">

            {/* Mood tag */}
            {mood && (
              <div className="player-mood-tag">
                <span className="mood-dot" />
                {MOOD_LABELS[mood] ?? mood}
              </div>
            )}

            {/* Progress */}
            <div className="player-progress">
              <div
                className="progress-track"
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
                onClick={handleSeek}
              >
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                <div className="progress-thumb" style={{ left: `${progressPct}%` }} />
              </div>
              <div className="time-labels">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="player-controls">
              <button
                className={`ctrl-btn ctrl-btn--secondary ${shuffleOn ? "active" : ""}`}
                onClick={() => setShuffleOn(p => !p)}
                aria-label="Shuffle"
              >
                <IconShuffle />
              </button>

              <button
                className="ctrl-btn ctrl-btn--secondary"
                onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10); }}
                aria-label="Rewind 10s"
              >
                <IconSkipPrev />
              </button>

              <button
                className="ctrl-btn ctrl-btn--primary"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={!song?.url && !loading}
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              <button
                className="ctrl-btn ctrl-btn--secondary"
                onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10); }}
                aria-label="Skip 10s"
              >
                <IconSkipNext />
              </button>

              <button
                className={`ctrl-btn ctrl-btn--secondary ${repeatOn ? "active" : ""}`}
                onClick={() => setRepeatOn(p => !p)}
                aria-label="Repeat"
              >
                <IconRepeat />
              </button>
            </div>

            {/* Volume */}
            <div className="player-volume">
              <button
                className="vol-icon-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <IconVolumeMute /> : <IconVolumeUp />}
              </button>
              <input
                type="range"
                className="volume-slider"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                aria-label="Volume"
                style={{ "--vol-pct": `${volPct}%` }}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Player;