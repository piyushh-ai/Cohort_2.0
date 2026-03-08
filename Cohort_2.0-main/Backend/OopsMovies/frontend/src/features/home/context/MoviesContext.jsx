import { createContext, useState, useEffect } from "react";
import {
  getFavoritesApi,
  getHistoryApi,
} from "../api/movie.api";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  /* ---------------- MOVIE LIST ---------------- */
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);

  /* ---------------- MOVIE DETAILS ---------------- */
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  /* ---------------- SEARCH ---------------- */
  const [searchResults, setSearchResults] = useState([]);

  /* ---------------- FAVORITES ---------------- */
  const [favIds, setFavIds] = useState(new Set());
  const [favMovies, setFavMovies] = useState([]);
  const [favLoaded, setFavLoaded] = useState(false);

  /* ---------------- HISTORY ---------------- */
  const [historyMovies, setHistoryMovies] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(false);

  /* ── Fetch Favorites ONCE at context level ── */
  const fetchFavMovies = async () => {
    try {
      const res = await getFavoritesApi();
      const raw =
        res.data?.movies ??
        res.data?.favorites ??
        res.data?.data ??
        res.data ??
        [];
      const list = Array.isArray(raw) ? raw : [];
      setFavMovies(list);
      setFavIds(new Set(list.map((m) => (typeof m === "object" ? m.id : m))));
    } catch (err) {
      console.log("fetchFavMovies error", err);
    } finally {
      setFavLoaded(true);
    }
  };

  /* ── Fetch History ONCE at context level ── */
  const fetchHistoryMovies = async () => {
    try {
      const res = await getHistoryApi();
      const raw =
        res.data?.movies ?? res.data?.data ?? res.data ?? [];
      const list = Array.isArray(raw) ? raw : [];
      setHistoryMovies(list);
    } catch (err) {
      console.log("fetchHistoryMovies error", err);
    } finally {
      setHistoryLoaded(true);
    }
  };

  useEffect(() => {
    fetchFavMovies();
    fetchHistoryMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trending,
        setTrending,
        popular,
        setPopular,
        trendingPage,
        setTrendingPage,
        popularPage,
        setPopularPage,
        movieDetails,
        setMovieDetails,
        trailer,
        setTrailer,
        similarMovies,
        setSimilarMovies,
        searchResults,
        setSearchResults,
        favIds,
        setFavIds,
        favMovies,
        setFavMovies,
        favLoaded,
        historyMovies,
        setHistoryMovies,
        historyLoaded,
        fetchFavMovies,
        fetchHistoryMovies,
        loading,
        setLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};