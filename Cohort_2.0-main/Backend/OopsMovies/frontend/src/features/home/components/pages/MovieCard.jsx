import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useMovies } from "../../hooks/useMovies";
import "../styles/MovieCard.scss";

function MovieCard({ movie, onFavChange }) {
  const navigate = useNavigate();
  const { favIds, addFavorite, removeFavorite } = useMovies();
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Derive fav state from global favIds — survives reload
  const fav = favIds.has(movie.id);

  const handleFav = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      if (fav) {
        await removeFavorite(movie.id);
        onFavChange?.(movie.id, false);
      } else {
        // ✅ movie object pass karo — context instantly update hoga
        await addFavorite(movie.id, movie);
        onFavChange?.(movie.id, true);
      }
    } catch (err) {
      console.log("Fav toggle error", err);
    } finally {
      setLoading(false);
    }
  };

  const rating = movie.vote_average?.toFixed(1);
  const year = movie.release_date?.slice(0, 4);
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="mc" onClick={() => navigate(`/movie/${movie.id}`)}>
      {/* Poster */}
      <div className="mc__poster">
        {image ? (
          <img
            src={image}
            alt={movie.title}
            className={`mc__img${imgLoaded ? " mc__img--on" : ""}`}
            onLoad={() => setImgLoaded(true)}
          />
        ) : (
          <div className="mc__no-img">🎬</div>
        )}
        {!imgLoaded && image && <div className="mc__skel" />}

        {/* Gradient overlay */}
        <div className="mc__grad" />

        {/* Rating badge */}
        {rating && (
          <div className="mc__rating">
            <span className="mc__star">★</span>
            {rating}
          </div>
        )}

        {/* Heart button */}
        <button
          className={`mc__heart${fav ? " mc__heart--active" : ""}${loading ? " mc__heart--loading" : ""}`}
          onClick={handleFav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            viewBox="0 0 24 24"
            fill={fav ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="mc__hover-overlay">
          <span className="mc__view-btn">View Details →</span>
        </div>
      </div>

      {/* Info */}
      <div className="mc__info">
        <p className="mc__title">{movie.title}</p>
        {year && <span className="mc__year">{year}</span>}
      </div>
    </div>
  );
}

export default React.memo(MovieCard, (prevProps, nextProps) => {
  return prevProps.movie.id === nextProps.movie.id;
});
