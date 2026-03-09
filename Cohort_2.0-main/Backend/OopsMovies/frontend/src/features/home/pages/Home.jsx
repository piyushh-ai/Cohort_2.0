import { useEffect, useRef, useState } from "react";
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
  const [heroMovie, setHeroMovie] = useState(null);
  const loaderRef = useRef(null);

  // Random hero — sirf ek baar set hoga
  useEffect(() => {
    if (trending.length > 0 && !heroMovie) {
      setHeroMovie(
        trending[Math.floor(Math.random() * Math.min(5, trending.length))]
      );
    }
  }, [trending]);

  // ── Infinite scroll ─────────────────────────────
  // Sirf active tab ka page badhao, aur max page pe observer disconnect karo
  useEffect(() => {
    const isDone = activeTab === "trending" ? trendingDone : popularDone;

    // Agar max page aa gayi toh observer lagane ki zaroorat nahi
    if (isDone) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || loading) return;

        if (activeTab === "trending") {
          setTrendingPage((prev) => prev + 1);
        } else {
          setPopularPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();

    // activeTab badlne par ya loading khatam hone par observer re-attach ho
  }, [activeTab, trendingDone, popularDone, loading]);

  const displayMovies = activeTab === "trending" ? trending : popular;
  const isDone = activeTab === "trending" ? trendingDone : popularDone;

  return (
    <div className="home-page">
      <Navbar />

      {/* ── Hero ── */}
      {heroMovie && (
        <section className="hh">
          {heroMovie.backdrop_path && (
            <div
              className="hh__bg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path})`,
              }}
            />
          )}
          <div className="hh__overlay" />
          <div className="hh__mesh" />

          <div className="hh__body">
            {heroMovie.poster_path && (
              <Link to={`/movie/${heroMovie.id}`} className="hh__poster-wrap">
                <img
                  className="hh__poster"
                  src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`}
                  alt={heroMovie.title}
                />
                <div className="hh__poster-glow" />
              </Link>
            )}

            <div className="hh__info">
              <div className="hh__badge">
                <span className="hh__badge-dot" />
                <span>Featured Film</span>
              </div>
              <h1 className="hh__title">{heroMovie.title}</h1>
              <div className="hh__meta">
                <span className="hh__rating">
                  <span className="hh__star">★</span>
                  {heroMovie.vote_average?.toFixed(1)}
                </span>
                {heroMovie.release_date && (
                  <span className="hh__year">
                    {heroMovie.release_date.slice(0, 4)}
                  </span>
                )}
                {heroMovie.vote_count && (
                  <span className="hh__votes">
                    {(heroMovie.vote_count / 1000).toFixed(0)}K votes
                  </span>
                )}
              </div>
              <p className="hh__overview">
                {heroMovie.overview?.length > 200
                  ? heroMovie.overview.slice(0, 200) + "…"
                  : heroMovie.overview}
              </p>
              <div className="hh__actions">
                <Link to={`/movie/${heroMovie.id}`} className="hh__btn-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  View Details
                </Link>
              </div>
            </div>
          </div>
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
          <div className="home-tabs__count">
            {displayMovies.length} titles
          </div>
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

        {/* Loader — max page pe "You've seen it all" dikhao */}
        {!isDone ? (
          <div ref={loaderRef} className="home-loader">
            <div className="home-loader__dots">
              <span /><span /><span />
            </div>
          </div>
        ) : (
          <div className="home-end">
            <span>You've seen it all ✨</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;