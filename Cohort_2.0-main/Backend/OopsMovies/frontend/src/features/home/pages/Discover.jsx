import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/Discover.scss";
import Navbar from "../components/pages/Navbar";
import MovieCard from "../components/pages/MovieCard";
import { discoverMoviesApi } from "../api/movie.api";

const GENRES = [
  { id: "", name: "All", emoji: "🎬" },
  { id: "28", name: "Action", emoji: "💥" },
  { id: "12", name: "Adventure", emoji: "🗺️" },
  { id: "16", name: "Animation", emoji: "✨" },
  { id: "35", name: "Comedy", emoji: "😂" },
  { id: "80", name: "Crime", emoji: "🔫" },
  { id: "99", name: "Documentary", emoji: "🎥" },
  { id: "18", name: "Drama", emoji: "🎭" },
  { id: "10751", name: "Family", emoji: "👨‍👩‍👧" },
  { id: "14", name: "Fantasy", emoji: "🧙" },
  { id: "36", name: "History", emoji: "📜" },
  { id: "27", name: "Horror", emoji: "👻" },
  { id: "10402", name: "Music", emoji: "🎵" },
  { id: "9648", name: "Mystery", emoji: "🔍" },
  { id: "10749", name: "Romance", emoji: "❤️" },
  { id: "878", name: "Sci-Fi", emoji: "🚀" },
  { id: "53", name: "Thriller", emoji: "😱" },
  { id: "10752", name: "War", emoji: "⚔️" },
  { id: "37", name: "Western", emoji: "🤠" },
];

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "🔥 Most Popular" },
  { value: "vote_average.desc", label: "⭐ Top Rated" },
  { value: "release_date.desc", label: "🆕 Newest First" },
  { value: "release_date.asc", label: "📅 Oldest First" },
  { value: "revenue.desc", label: "💰 Box Office" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [
  "",
  ...Array.from({ length: 35 }, (_, i) => String(CURRENT_YEAR - i)),
];

const RATINGS = [
  { label: "All", min: "", max: "" },
  { label: "9+", min: "9", max: "" },
  { label: "8+", min: "8", max: "" },
  { label: "7+", min: "7", max: "" },
  { label: "6+", min: "6", max: "" },
];

const GENRE_GRADIENTS = {
  "": ["#6366f1", "#8b5cf6"],
  28: ["#ef4444", "#f97316"],
  12: ["#10b981", "#06b6d4"],
  16: ["#f59e0b", "#ef4444"],
  35: ["#ec4899", "#f59e0b"],
  80: ["#374151", "#6b7280"],
  99: ["#64748b", "#94a3b8"],
  18: ["#6366f1", "#a78bfa"],
  10751: ["#22c55e", "#84cc16"],
  14: ["#8b5cf6", "#ec4899"],
  36: ["#b45309", "#92400e"],
  27: ["#dc2626", "#7c3aed"],
  10402: ["#06b6d4", "#6366f1"],
  9648: ["#475569", "#6366f1"],
  10749: ["#f43f5e", "#fb7185"],
  878: ["#0ea5e9", "#6366f1"],
  53: ["#dc2626", "#374151"],
  10752: ["#78716c", "#44403c"],
  37: ["#b45309", "#78350f"],
};

// ── Virtual scroll constants ──────────────────────────────────
const OVERSCAN = 4; // extra rows buffer above/below viewport

export default function Discover() {
  const [activeGenre, setActiveGenre] = useState("");
  const [activeSort, setActiveSort] = useState("popularity.desc");
  const [activeYear, setActiveYear] = useState("");
  const [activeRating, setActiveRating] = useState(0);

  const [allMovies, setAllMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [error, setError] = useState(null);

  // Virtual scroll state
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);
  const [itemHeight, setItemHeight] = useState(320);

  // ✅ FIX 1: cols in state — measured in useEffect after DOM ready
  // Never inside useMemo (DOM not available at render time)
  const [cols, setCols] = useState(6);

  const gridRef = useRef(null);
  const loaderRef = useRef(null);
  const loadingRef = useRef(false);
  const filterKeyRef = useRef(0);
  const containerRef = useRef(null);

  const grad = GENRE_GRADIENTS[activeGenre] ?? ["#6366f1", "#8b5cf6"];

  // ✅ FIX 1: cols measured in useEffect — DOM is ready here
  useEffect(() => {
    const updateCols = () => {
      const gridWidth = gridRef.current?.offsetWidth || 1200;
      const colWidth =
        window.innerWidth < 640 ? 150 : window.innerWidth < 1024 ? 170 : 190;
      setCols(Math.max(1, Math.floor((gridWidth + 16) / (colWidth + 16))));
    };
    updateCols();
    window.addEventListener("resize", updateCols, { passive: true });
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // Measure actual item height after first render
  useEffect(() => {
    if (!gridRef.current) return;
    const firstItem = gridRef.current.querySelector(".disc-grid__item");
    if (firstItem) setItemHeight(firstItem.offsetHeight + 16);
  }, [allMovies.length]);

  // ✅ FIX 2: rAF throttle on scroll
  // Bina iske: har 1px scroll = setState = re-render → CPU 100% → crash
  // Iske saath: sirf 1 frame mein ek setState → smooth
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollTop(container.scrollTop);
          setClientHeight(container.clientHeight);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ FIX 1+3: useMemo ab sirf pure values use karta hai — no gridRef, no DOM
  // startIdx bhi return + destructure kiya (FIX 3)
  const { visibleMovies, paddingTop, paddingBottom, startIdx } = useMemo(() => {
    if (allMovies.length === 0) {
      return {
        visibleMovies: [],
        paddingTop: 0,
        paddingBottom: 0,
        startIdx: 0,
      };
    }

    const rowHeight = itemHeight;
    const totalRows = Math.ceil(allMovies.length / cols);
    const firstRow = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
    const visRows = Math.ceil(clientHeight / rowHeight) + OVERSCAN * 2;
    const lastRow = Math.min(totalRows - 1, firstRow + visRows);
    const start = firstRow * cols;
    const end = Math.min(allMovies.length, (lastRow + 1) * cols);

    return {
      visibleMovies: allMovies.slice(start, end),
      paddingTop: firstRow * rowHeight,
      paddingBottom: Math.max(0, (totalRows - lastRow - 1) * rowHeight),
      startIdx: start,
    };
  }, [scrollTop, clientHeight, allMovies, itemHeight, cols]);

  /* ── Fetch function ── */
  const doFetch = useCallback(async (filters, pg, reset, myFilterKey) => {
    if (myFilterKey !== undefined && myFilterKey !== filterKeyRef.current)
      return;
    if (loadingRef.current && !reset) return;

    loadingRef.current = true;
    reset ? setInitLoad(true) : setLoading(true);
    setError(null);

    try {
      const rating = RATINGS[filters.ratingIdx] ?? RATINGS[0];
      const res = await discoverMoviesApi(
        {
          genre: filters.genre,
          sort: filters.sort,
          year: filters.year,
          minRating: rating.min,
          maxRating: rating.max,
        },
        pg,
      );

      if (myFilterKey !== undefined && myFilterKey !== filterKeyRef.current)
        return;

      console.log("Discover API response:", res.data);

      // Handle all possible response shapes
      const d = res.data;
      const incoming =
        d?.movies ??
        d?.results ??
        d?.data?.movies ??
        d?.data?.results ??
        d?.data ??
        (Array.isArray(d) ? d : []);

      const totalPgs =
        d?.totalPages ??
        d?.total_pages ??
        d?.data?.totalPages ??
        d?.data?.total_pages ??
        1;

      setTotalPages(totalPgs);

      if (reset) {
        setAllMovies(incoming);
        const withBackdrop = incoming.find((m) => m.backdrop_path);
        if (withBackdrop) setHeroMovie(withBackdrop);
        // ✅ FIX 4: smooth scroll conflict hata diya — instant scroll
        window.scrollTo(0, 0);
        setScrollTop(0);
      } else {
        setAllMovies((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          return [...prev, ...incoming.filter((m) => !seen.has(m.id))];
        });
      }
    } catch (err) {
      console.error("Discover fetch error:", err);
      if (myFilterKey === undefined || myFilterKey === filterKeyRef.current) {
        setError("Failed to load movies. Please try again.");
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitLoad(false);
    }
  }, []);

  /* ── Filter change → full reset ── */
  useEffect(() => {
    const key = ++filterKeyRef.current;
    setPage(1);
    setHeroMovie(null);
    setAllMovies([]);
    doFetch(
      {
        genre: activeGenre,
        sort: activeSort,
        year: activeYear,
        ratingIdx: activeRating,
      },
      1,
      true,
      key,
    );
  }, [activeGenre, activeSort, activeYear, activeRating]);

  /* ── Page change → load more ── */
  useEffect(() => {
    if (page === 1) return;
    const key = filterKeyRef.current;
    doFetch(
      {
        genre: activeGenre,
        sort: activeSort,
        year: activeYear,
        ratingIdx: activeRating,
      },
      page,
      false,
      key,
    );
  }, [page]);

  /* ── Infinite scroll sentinel ── */
  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          !initLoad &&
          page < totalPages
        ) {
          setPage((p) => p + 1);
        }
      },
      {
        root: containerRef.current,
        rootMargin: "200px",
      },
    );
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [initLoad, page, totalPages]);

  const isFiltered =
    activeGenre ||
    activeYear ||
    activeRating !== 0 ||
    activeSort !== "popularity.desc";
  const activeGenreData = GENRES.find((g) => g.id === activeGenre);

  return (
    <div className="disc-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="disc-hero">
        {heroMovie?.backdrop_path && (
          <div
            className="disc-hero__bg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path})`,
            }}
          />
        )}
        <div className="disc-hero__overlay" />
        <div
          className="disc-hero__gradient"
          style={{ "--g1": grad[0], "--g2": grad[1] }}
        />
        <div className="disc-hero__noise" />

        {heroMovie ? (
          <div className="disc-hero__body">
            <Link
              to={`/movie/${heroMovie.id}`}
              className="disc-hero__poster-wrap"
            >
              <img
                className="disc-hero__poster"
                src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`}
                alt={heroMovie.title}
              />
              <div className="disc-hero__poster-shine" />
            </Link>
            <div className="disc-hero__info">
              <div className="disc-hero__badge">
                <span className="disc-hero__badge-dot" />
                {activeGenreData?.id
                  ? `${activeGenreData.emoji} ${activeGenreData.name} · Top Pick`
                  : "✦ Top Pick"}
              </div>
              <h2 className="disc-hero__title">{heroMovie.title}</h2>
              <div className="disc-hero__meta">
                <span className="disc-hero__rating">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                    width="14"
                    height="14"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {heroMovie.vote_average?.toFixed(1)}
                </span>
                {heroMovie.release_date && (
                  <span className="disc-hero__year">
                    {heroMovie.release_date.slice(0, 4)}
                  </span>
                )}
                {heroMovie.vote_count && (
                  <span className="disc-hero__votes">
                    {(heroMovie.vote_count / 1000).toFixed(0)}K votes
                  </span>
                )}
              </div>
              <p className="disc-hero__overview">
                {heroMovie.overview?.length > 180
                  ? heroMovie.overview.slice(0, 180) + "…"
                  : heroMovie.overview}
              </p>
              <Link to={`/movie/${heroMovie.id}`} className="disc-hero__btn">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="disc-hero__body disc-hero__body--skel">
            <div className="disc-hero-skel disc-hero-skel--poster" />
            <div className="disc-hero__info">
              <div className="disc-hero-skel disc-hero-skel--badge" />
              <div className="disc-hero-skel disc-hero-skel--title" />
              <div className="disc-hero-skel disc-hero-skel--line" />
              <div className="disc-hero-skel disc-hero-skel--line disc-hero-skel--short" />
            </div>
          </div>
        )}
      </section>

      {/* ── FILTERS ── */}
      <div className="disc-filters" style={{ "--g1": grad[0] }}>
        <div className="disc-genre-wrap">
          <div className="disc-genre-fade disc-genre-fade--left" />
          <div className="disc-genre-scroll">
            {GENRES.map((g) => (
              <button
                key={g.id}
                className={`disc-gchip${activeGenre === g.id ? " disc-gchip--on" : ""}`}
                style={
                  activeGenre === g.id
                    ? {
                        "--c1": GENRE_GRADIENTS[g.id]?.[0],
                        "--c2": GENRE_GRADIENTS[g.id]?.[1],
                      }
                    : {}
                }
                onClick={() => setActiveGenre(g.id)}
              >
                <span>{g.emoji}</span>
                {g.name}
              </button>
            ))}
          </div>
          <div className="disc-genre-fade disc-genre-fade--right" />
        </div>

        <div className="disc-ctrl-bar">
          <div className="disc-field">
            <label className="disc-field__label">Sort</label>
            <div className="disc-sel-wrap">
              <select
                className="disc-sel"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg
                className="disc-sel__arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="disc-field">
            <label className="disc-field__label">Year</label>
            <div className="disc-sel-wrap">
              <select
                className="disc-sel"
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y || "Any"}
                  </option>
                ))}
              </select>
              <svg
                className="disc-sel__arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="disc-field">
            <label className="disc-field__label">Rating ★</label>
            <div className="disc-rchips">
              {RATINGS.map((r, i) => (
                <button
                  key={i}
                  className={`disc-rchip${activeRating === i ? " disc-rchip--on" : ""}`}
                  onClick={() => setActiveRating(i)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {isFiltered && (
            <button
              className="disc-reset-btn"
              onClick={() => {
                setActiveGenre("");
                setActiveSort("popularity.desc");
                setActiveYear("");
                setActiveRating(0);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                width="12"
                height="12"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <section className="disc-section" ref={containerRef}>
        {!initLoad && !error && allMovies.length > 0 && (
          <div className="disc-meta">
            <span className="disc-meta__count">{allMovies.length} titles</span>
            {activeGenreData?.id && (
              <span className="disc-meta__pill">
                {activeGenreData.emoji} {activeGenreData.name}
              </span>
            )}
            {activeYear && (
              <span className="disc-meta__pill">📅 {activeYear}</span>
            )}
            {activeRating !== 0 && (
              <span className="disc-meta__pill">
                ⭐ {RATINGS[activeRating].label}
              </span>
            )}
          </div>
        )}

        {/* Skeleton */}
        {initLoad && (
          <div className="disc-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="disc-skel"
                style={{ animationDelay: `${i * 0.02}s` }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!initLoad && error && (
          <div className="disc-empty">
            <span className="disc-empty__icon">⚠️</span>
            <p className="disc-empty__title">Something went wrong</p>
            <p className="disc-empty__sub">{error}</p>
            <button
              className="disc-empty__btn"
              onClick={() => {
                const key = filterKeyRef.current;
                doFetch(
                  {
                    genre: activeGenre,
                    sort: activeSort,
                    year: activeYear,
                    ratingIdx: activeRating,
                  },
                  1,
                  true,
                  key,
                );
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!initLoad && !error && allMovies.length === 0 && (
          <div className="disc-empty">
            <span className="disc-empty__icon">🎬</span>
            <p className="disc-empty__title">No movies found</p>
            <p className="disc-empty__sub">Try adjusting your filters</p>
          </div>
        )}

        {/* ✅ Virtual Grid — paddingTop/Bottom are spacers for hidden rows */}
        {!initLoad && !error && allMovies.length > 0 && (
          <div
            className="disc-grid-outer"
            style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
          >
            <div className="disc-grid" ref={gridRef}>
              {/* ✅ FIX 3: startIdx offset in animationDelay + key is movie.id (stable) */}
              {visibleMovies.map((movie, i) => (
                <div
                  key={movie.id}
                  className="disc-grid__item"
                  style={{ animationDelay: `${((startIdx + i) % 20) * 0.03}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading dots */}
        {loading && !initLoad && (
          <div className="disc-loader">
            <span />
            <span />
            <span />
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {!initLoad && !error && page < totalPages && (
          <div ref={loaderRef} className="disc-sentinel" />
        )}

        {/* End message */}
        {!initLoad && !error && allMovies.length > 0 && page >= totalPages && (
          <div className="disc-end">You've seen it all ✨</div>
        )}
      </section>
    </div>
  );
}
