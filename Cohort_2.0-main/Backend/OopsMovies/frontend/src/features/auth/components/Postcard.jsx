import React from "react";

const PosterCard = ({ movie, IMG, delay }) => {
  return (
    <div className={`pm-card${movie ? "" : " pm-loading"}`}>
      {movie && (
        <img
          src={`${IMG}${movie.poster_path}`}
          alt=""
          style={{ transitionDelay: `${delay}ms` }}
          onLoad={(e) => e.currentTarget.classList.add("pm-visible")}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default React.memo(PosterCard);
