import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/pages/MovieCard";
import Navbar from "../components/pages/Navbar";
import { useMovies } from "../hooks/useMovies";
import "../styles/Home.scss";

function Home() {
  const {
    trending, popular,
    setTrendingPage, setPopularPage,
    trendingDone, popularDone,
    loading,
  } = useMovies();

  const [activeTab, setActiveTab] = useState("trending");
  const [heroList, setHeroList] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPrev, setHeroPrev] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const loaderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    if (trending.length === 0) return;
    const withBackdrop = trending.filter((m) => m.backdrop_path);
    if (withBackdrop.length === 0) return;
    setHeroList(withBackdrop.slice(0, 8));
    setHeroIndex(0);
  }, [trending]);

  const currentHero = heroList[heroIndex] || null;

  // ── Navigation ────────────────────────────────────
  const goTo = useCallback((nextIdx, dir) => {
    setHeroPrev(heroIndex);
    setDirection(dir);
    setHeroIndex(nextIdx);
  }, [heroIndex]);

  const goNext = useCallback(() => {
    if (heroList.length === 0) return;
    goTo((heroIndex + 1) % heroList.length, 1);
  }, [heroList.length, heroIndex, goTo]);

  const goPrev = useCallback(() => {
    if (heroList.length === 0) return;
    goTo((heroIndex - 1 + heroList.length) % heroList.length, -1);
  }, [heroList.length, heroIndex, goTo]);

  // ── Auto-slide ────────────────────────────────────
  const resetAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    if (heroList.length <= 1) return;
    autoSlideRef.current = setInterval(goNext, 6000);
  }, [heroList.length, goNext]);

  useEffect(() => {
    resetAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, [resetAutoSlide]);

  // ── Touch swipe ───────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
      if (dx < 0) goNext();
      else goPrev();
      resetAutoSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [goNext, goPrev, resetAutoSlide]);

  // ── Infinite scroll ───────────────────────────────
  useEffect(() => {
    const isDone = activeTab === "trending" ? trendingDone : popularDone;
    if (isDone) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || loading) return;
        if (activeTab === "trending") setTrendingPage((p) => p + 1);
        else setPopularPage((p) => p + 1);
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [activeTab, trendingDone, popularDone, loading]);

  const displayMovies = activeTab === "trending" ? trending : popular;
  const isDone = activeTab === "trending" ? trendingDone : popularDone;

  return (
    <div className="home-page">
      <Navbar />

      {/* ── Hero Slider ── */}
      {heroList.length > 0 && (
        <section
          className="hh"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Background slides — all rendered, only active visible */}
          <div className="hh__slides">
            {heroList.map((m, idx) => (
              <div
                key={m.id}
                className={`hh__slide${
                  idx === heroIndex
                    ? " hh__slide--active"
                    : idx === heroPrev
                    ? " hh__slide--prev"
                    : ""
                }`}
                style={{
                  backgroundImage: m.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/w1280${m.backdrop_path})`
                    : "none",
                }}
              />
            ))}
          </div>

          <div className="hh__overlay" />
          <div className="hh__mesh" />

          {/* Dots */}
          {heroList.length > 1 && (
            <div className="hh__dots">
              {heroList.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  className={`hh__dot${idx === heroIndex ? " hh__dot--active" : ""}`}
                  onClick={() => {
                    goTo(idx, idx > heroIndex ? 1 : -1);
                    resetAutoSlide();
                  }}
                />
              ))}
            </div>
          )}

          {/* Content */}
          {currentHero && (
            <div className="hh__body" key={heroIndex}>
              {currentHero.poster_path && (
                <Link to={`/movie/${currentHero.id}`} className="hh__poster-wrap">
                  <img
                    className="hh__poster"
                    src={`https://image.tmdb.org/t/p/w500${currentHero.poster_path}`}
                    alt={currentHero.title}
                  />
                  <div className="hh__poster-glow" />
                </Link>
              )}

              <div className="hh__info">
                <div className="hh__badge">
                  <span className="hh__badge-dot" />
                  <span>Featured Film</span>
                </div>
                <h1 className="hh__title">{currentHero.title}</h1>
                <div className="hh__meta">
                  <span className="hh__rating">
                    <span className="hh__star">★</span>
                    {currentHero.vote_average?.toFixed(1)}
                  </span>
                  {currentHero.release_date && (
                    <span className="hh__year">{currentHero.release_date.slice(0, 4)}</span>
                  )}
                  {currentHero.vote_count && (
                    <span className="hh__votes">
                      {(currentHero.vote_count / 1000).toFixed(0)}K votes
                    </span>
                  )}
                </div>
                <p className="hh__overview">
                  {currentHero.overview?.length > 200
                    ? currentHero.overview.slice(0, 200) + "…"
                    : currentHero.overview}
                </p>
                <div className="hh__actions">
                  <Link to={`/movie/${currentHero.id}`} className="hh__btn-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Progress bar */}
          {heroList.length > 1 && (
            <div className="hh__progress">
              <div className="hh__progress-bar" key={heroIndex} />
            </div>
          )}
        </section>
      )}

      {/* ── Section ── */}
      <section className="home-section">
        <div className="home-tabs">
          <div className="home-tabs__left">
            <button
              className={`home-tab${activeTab === "trending" ? " home-tab--active" : ""}`}
              onClick={() => setActiveTab("trending")}
            >
              🔥 Trending
            </button>
            <button
              className={`home-tab${activeTab === "popular" ? " home-tab--active" : ""}`}
              onClick={() => setActiveTab("popular")}
            >
              ⭐ Popular
            </button>
          </div>
          <div className="home-tabs__count">{displayMovies.length} titles</div>
        </div>

        <div className="home-grid">
          {displayMovies.map((movie, i) => (
            <div
              key={movie.id}
              className="home-grid__item"
              style={i < 20 ? { animationDelay: `${(i % 20) * 0.04}s` } : undefined}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {!isDone ? (
          <div ref={loaderRef} className="home-loader">
            <div className="home-loader__dots">
              <span /><span /><span />
            </div>
          </div>
        ) : (
          <div className="home-end"><span>You've seen it all ✨</span></div>
        )}
      </section>
    </div>
  );
}

export default Home;