import React from "react";

const PosterCard = ({ movie, IMG, delay }) => {
  return (
    <div className="pm-card">
      {movie?.poster_path ? (
        <img
          src={`${IMG}${movie.poster_path}`}
          alt=""
          style={{ transitionDelay: `${delay}ms` }}
          onLoad={(e) => e.currentTarget.classList.add("pm-visible")}
          loading="lazy"
        />
      ) : (
        // Placeholder jab movie load nahi hua ya poster nahi hai
        <div className="pm-placeholder" />
      )}
    </div>
  );
};

export default React.memo(PosterCard);