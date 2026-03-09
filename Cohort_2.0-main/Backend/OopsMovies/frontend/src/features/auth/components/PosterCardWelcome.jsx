import React, { useState } from "react";

const PosterCardWelcome = ({ movie, posClass }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`pc ${posClass}`}>
      {movie?.poster_path ? (
        <img
          className={`pc__img${loaded ? " pc__img--on" : ""}`}
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          loading="lazy"
          alt={movie.title ?? ""}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="pc__skel" />
      )}
      <div className="pc__grad" />
    </div>
  );
};

export default React.memo(PosterCardWelcome);
