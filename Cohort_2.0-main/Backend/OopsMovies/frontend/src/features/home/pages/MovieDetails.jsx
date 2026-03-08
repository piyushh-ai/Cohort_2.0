import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/pages/MovieCard";
import Navbar from "../components/pages/Navbar";
import { getMovieCastApi, getMovieImagesApi } from "../api/movie.api";
import "../styles/MovieDetails.scss";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const historyLogged = useRef(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const trailerRef = useRef(null);

  // ── Cast & Images state ──
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [lightboxImg, setLightboxImg] = useState(null);

  // ✅ Sirf cast/images ke liye loading — movieDetails ke liye nahi
  const [detailLoading, setDetailLoading] = useState(false);

  const {
    movieDetails,
    trailer,
    similarMovies,
    fetchMovieDetails,
    addFavorite,
    removeFavorite,
    addHistory,
    favIds,
  } = useMovies();

  useEffect(() => {
    // ✅ Reset sirf local states karo, movieDetails null MAT karo
    // Purana movie data tab tak dikhta rahe jab tak naya load ho
    historyLogged.current = false;
    setTrailerOpen(false);
    setImgLoaded(false);
    setCast([]);
    setImages([]);
    setDetailLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchMovieDetails(id).finally(() => setDetailLoading(false));

    // Cast + images parallel fetch
    Promise.all([
      getMovieCastApi(id).then(r => setCast(r.data.cast ?? [])).catch(() => {}),
      getMovieImagesApi(id).then(r => setImages(r.data.backdrops ?? [])).catch(() => {}),
    ]);
  }, [id]);

  useEffect(() => {
    if (movieDetails?.id) {
      setIsFaved(favIds.has(movieDetails.id));
    }
  }, [favIds, movieDetails?.id]);

  const handleOpenTrailer = () => {
    setTrailerOpen(true);
    if (!historyLogged.current && movieDetails?.id) {
      historyLogged.current = true;
      // ✅ movieDetails object pass karo — History page bina reload ke update hoga
      addHistory(movieDetails.id, movieDetails);
    }
  };

  useEffect(() => {
    if (trailerOpen && trailerRef.current) {
      setTimeout(() => {
        trailerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    }
  }, [trailerOpen]);

  const handleFav = async () => {
    if (favLoading || !movieDetails) return;
    setFavLoading(true);
    try {
      if (isFaved) {
        await removeFavorite(movieDetails.id);
      } else {
        // ✅ movieDetails object pass karo — Favorites page bina reload ke update hoga
        await addFavorite(movieDetails.id, movieDetails);
      }
    } finally {
      setFavLoading(false);
    }
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightboxImg(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ✅ Loading skeleton sirf tab dikhao jab pehli baar koi data hi na ho
  // Navigate back karne pe ya same session mein purana data dikha do
  if (!movieDetails) {
    return (
      <div className="md-loading">
        <Navbar />
        <div className="md-loading__inner">
          <div className="md-loading__skel md-loading__skel--poster" />
          <div className="md-loading__info">
            <div className="md-loading__skel md-loading__skel--title" />
            <div className="md-loading__skel md-loading__skel--line" />
            <div className="md-loading__skel md-loading__skel--line md-loading__skel--short" />
          </div>
        </div>
      </div>
    );
  }

  const poster = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : null;
  const backdrop = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
    : null;
  const thumbUrl = trailer?.key
    ? `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`
    : null;

  const rating = movieDetails.vote_average?.toFixed(1);
  const year = movieDetails.release_date?.slice(0, 4);
  const runtime = movieDetails.runtime;
  const genres = movieDetails.genres ?? [];
  const language = movieDetails.original_language?.toUpperCase();
  const voteCount = movieDetails.vote_count
    ? movieDetails.vote_count >= 1000
      ? `${(movieDetails.vote_count / 1000).toFixed(0)}K`
      : movieDetails.vote_count
    : null;

  const ratingColor =
    rating >= 8 ? "#22c55e" : rating >= 6 ? "#f59e0b" : "#ef4444";

  return (
    <div className="md-page">
      <Navbar />

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div className="md-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="md-lightbox__close" onClick={() => setLightboxImg(null)}>✕</button>
          <img
            src={`https://image.tmdb.org/t/p/original${lightboxImg}`}
            alt="Movie still"
            className="md-lightbox__img"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Cinematic backdrop ── */}
      {backdrop && (
        <div
          className="md-backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}
      <div className="md-backdrop-overlay" />
      <div className="md-backdrop-mesh" />

      {/* ✅ Thin top loading bar — page reload feel nahi aayega, sirf ek line dikhegi */}
      {detailLoading && <div className="md-top-loader" />}

      {/* ── Main content ── */}
      <div className="md-wrap">

        {/* Back button */}
        <button className="md-back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        {/* ── Hero row ── */}
        <div className="md-hero">

          {/* Poster */}
          <div className="md-poster-col">
            <div className="md-poster">
              {poster ? (
                <>
                  {!imgLoaded && <div className="md-poster__skel" />}
                  <img
                    src={poster}
                    alt={movieDetails.title}
                    className={`md-poster__img${imgLoaded ? " md-poster__img--on" : ""}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                </>
              ) : (
                <div className="md-poster__fallback">🎬</div>
              )}
              <div className="md-poster__shine" />
            </div>

            {/* Fav + Trailer buttons under poster */}
            <div className="md-poster-actions">
              <button
                className={`md-fav-btn${isFaved ? " md-fav-btn--active" : ""}${favLoading ? " md-fav-btn--loading" : ""}`}
                onClick={handleFav}
                disabled={favLoading}
              >
                <svg viewBox="0 0 24 24" fill={isFaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favLoading ? "..." : isFaved ? "Saved" : "Save"}
              </button>
              {trailer && (
                <button className="md-trailer-pill" onClick={handleOpenTrailer}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="md-info">
            {genres.length > 0 && (
              <div className="md-genres">
                {genres.map((g) => (
                  <span key={g.id} className="md-genre-tag">{g.name}</span>
                ))}
              </div>
            )}

            <h1 className="md-title">{movieDetails.title}</h1>

            <div className="md-meta">
              {rating && (
                <div className="md-rating" style={{ "--rc": ratingColor }}>
                  <span className="md-rating__star">★</span>
                  <span className="md-rating__val">{rating}</span>
                  {voteCount && <span className="md-rating__count">{voteCount} votes</span>}
                </div>
              )}
              {year && <span className="md-meta__pill">{year}</span>}
              {runtime && <span className="md-meta__pill">{runtime} min</span>}
              {language && <span className="md-meta__pill md-meta__pill--lang">{language}</span>}
            </div>

            {movieDetails.overview && (
              <p className="md-overview">{movieDetails.overview}</p>
            )}

            {movieDetails.tagline && (
              <p className="md-tagline">"{movieDetails.tagline}"</p>
            )}

            <div className="md-stats">
              {movieDetails.budget > 0 && (
                <div className="md-stat">
                  <span className="md-stat__label">Budget</span>
                  <span className="md-stat__val">${(movieDetails.budget / 1e6).toFixed(0)}M</span>
                </div>
              )}
              {movieDetails.revenue > 0 && (
                <div className="md-stat">
                  <span className="md-stat__label">Revenue</span>
                  <span className="md-stat__val">${(movieDetails.revenue / 1e6).toFixed(0)}M</span>
                </div>
              )}
              {movieDetails.status && (
                <div className="md-stat">
                  <span className="md-stat__label">Status</span>
                  <span className="md-stat__val">{movieDetails.status}</span>
                </div>
              )}
            </div>

            {trailer && (
              <button className="md-trailer-btn" onClick={handleOpenTrailer}>
                <span className="md-trailer-btn__icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>Watch Trailer</span>
                <span className="md-trailer-btn__shine" />
              </button>
            )}
          </div>
        </div>

        {/* ── Cast Section ── */}
        {cast.length > 0 && (
          <div className="md-cast">
            <div className="md-section-label">
              <span className="md-section-label__dot" />
              Cast
            </div>
            <div className="md-cast-scroll">
              {cast.map((member) => (
                <div key={member.id} className="md-cast-card">
                  <div className="md-cast-card__img-wrap">
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className="md-cast-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="md-cast-card__img md-cast-card__img--fallback">🎭</div>
                    )}
                  </div>
                  <p className="md-cast-card__name">{member.name}</p>
                  {member.character && (
                    <p className="md-cast-card__char">{member.character}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Movie Images / Gallery ── */}
        {images.length > 0 && (
          <div className="md-gallery">
            <div className="md-section-label">
              <span className="md-section-label__dot" />
              Photos
            </div>
            <div className="md-gallery-grid">
              {images.slice(0, 9).map((img, i) => (
                <div
                  key={i}
                  className="md-gallery-item"
                  onClick={() => setLightboxImg(img.file_path)}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                    alt={`Still ${i + 1}`}
                    className="md-gallery-item__img"
                    loading="lazy"
                  />
                  <div className="md-gallery-item__overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Trailer section ── */}
        {trailer && (
          <div className="md-trailer-section" ref={trailerRef}>
            <div className="md-section-label">
              <span className="md-section-label__dot" />
              Official Trailer
            </div>

            {!trailerOpen ? (
              <div
                className="md-trailer-thumb"
                onClick={handleOpenTrailer}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleOpenTrailer()}
                aria-label="Play trailer"
              >
                {thumbUrl && (
                  <img
                    src={thumbUrl}
                    alt={`${movieDetails.title} trailer`}
                    className="md-trailer-thumb__img"
                  />
                )}
                <div className="md-trailer-thumb__overlay" />
                <div className="md-trailer-thumb__play">
                  <div className="md-trailer-thumb__play-ring" />
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="md-trailer-thumb__label">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M21.58 7.19a2.758 2.758 0 0 0-1.94-1.95C18 5 12 5 12 5s-6 0-7.64.24A2.758 2.758 0 0 0 2.42 7.19 28.8 28.8 0 0 0 2.18 12a28.8 28.8 0 0 0 .24 4.81 2.758 2.758 0 0 0 1.94 1.95C6 19 12 19 12 19s6 0 7.64-.24a2.758 2.758 0 0 0 1.94-1.95A28.8 28.8 0 0 0 21.82 12a28.8 28.8 0 0 0-.24-4.81z"/>
                    <polygon fill="#04050a" points="10 15 15.19 12 10 9 10 15"/>
                  </svg>
                  Play on YouTube
                </div>
              </div>
            ) : (
              <div className="md-trailer-player">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1`}
                  title={`${movieDetails.title} trailer`}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
                <button
                  className="md-trailer-close"
                  onClick={() => setTrailerOpen(false)}
                  aria-label="Close trailer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Similar movies ── */}
        {similarMovies.length > 0 && (
          <div className="md-similar">
            <div className="md-section-label">
              <span className="md-section-label__dot" />
              More Like This
            </div>
            <div className="md-similar-grid">
              {similarMovies.slice(0, 12).map((m, i) => (
                <div
                  key={m.id}
                  className="md-similar-grid__item"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;