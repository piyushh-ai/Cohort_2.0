import { useContext, useEffect } from "react";

import {
  getMovieDetailsApi,
  getMovieTrailerApi,
  getPopularMoviesApi,
  getTrendingMoviesApi,
  getSimilarMoviesApi,
  searchMoviesApi,
  addFavoriteApi,
  removeFavoriteApi,
  addHistoryApi,
} from "../api/movie.api";
import { MovieContext } from "../context/MoviesContext";

const MAX_PAGE = 5;

export const useMovies = () => {
  const {
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
  } = useContext(MovieContext);

  const mergeUnique = (prev, incoming) => {
    const seen = new Set(prev.map((m) => m.id));
    return [...prev, ...incoming.filter((m) => !seen.has(m.id))];
  };

  /* ── Trending ── */
  const fetchTrending = async () => {
    if (trendingPage > MAX_PAGE) return;
    try {
      setLoading(true);
      const res = await getTrendingMoviesApi(trendingPage);
      setTrending((prev) => mergeUnique(prev, res.data.movies));
    } catch (err) {
      console.log("Trending fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Popular ── */
  const fetchPopular = async () => {
    if (popularPage > MAX_PAGE) return;
    try {
      const res = await getPopularMoviesApi(popularPage);
      setPopular((prev) => mergeUnique(prev, res.data.movies));
    } catch (err) {
      console.log("Popular fetch error", err);
    }
  };

  /* ── Movie Details ── */
  // ✅ FIX: setMovieDetails(null) HATAAYA — purana data tab tak dikhta rahe
  // jab tak naya load na ho jaaye. Isse "reload flash" band ho jaayega.
  const fetchMovieDetails = async (id) => {
    try {
      setLoading(true);
      // ❌ setMovieDetails(null)  <-- yahi blank screen ka reason tha, removed
      const [detailsRes, trailerRes] = await Promise.all([
        getMovieDetailsApi(id),
        getMovieTrailerApi(id),
      ]);
      setMovieDetails(detailsRes.data);
      setTrailer(trailerRes.data.trailer);
      try {
        const similarRes = await getSimilarMoviesApi(id);
        setSimilarMovies(similarRes.data.movies);
      } catch {
        setSimilarMovies([]);
      }
    } catch (err) {
      console.log("Movie details error", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Search ── */
  const searchMovies = async (query) => {
    try {
      const res = await searchMoviesApi(query);
      setSearchResults(res.data.movies);
    } catch (err) {
      console.log("Search error", err);
    }
  };

  /* ── Favorites ── */
  // ✅ FIX: movieObject accept karo — favMovies context instantly update hoga
  // Favorites page bina reload ke naya movie dikhayega
  const addFavorite = async (movieId, movieObject) => {
    try {
      await addFavoriteApi(movieId);
      setFavIds((prev) => new Set([...prev, movieId]));
      if (movieObject) {
        setFavMovies((prev) => {
          if (prev.some((m) => m.id === movieId)) return prev;
          return [movieObject, ...prev]; // top pe add karo
        });
      }
    } catch (err) {
      console.log("Add favorite error", err);
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      await removeFavoriteApi(movieId);
      setFavIds((prev) => {
        const next = new Set(prev);
        next.delete(movieId);
        return next;
      });
      // ✅ favMovies se bhi turant hatao
      setFavMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.log("Remove favorite error", err);
    }
  };

  /* ── History ── */
  // ✅ FIX: movieObject accept karo — historyMovies context instantly update hoga
  const addHistory = async (movieId, movieObject) => {
    try {
      await addHistoryApi(movieId);
      // History context mein bhi add karo bina reload ke
      if (movieObject) {
        setHistoryMovies((prev) => {
          if (prev.some((m) => m.id === movieId)) return prev;
          return [movieObject, ...prev];
        });
      }
    } catch (err) {
      console.log("History error", err);
    }
  };

  /* ── Effects ── */
  useEffect(() => {
    fetchTrending();
  }, [trendingPage]);

  useEffect(() => {
    fetchPopular();
  }, [popularPage]);

  return {
    trending,
    popular,
    trendingPage,
    setTrendingPage,
    popularPage,
    setPopularPage,
    movieDetails,
    trailer,
    similarMovies,
    searchResults,
    loading,
    favIds,
    favMovies,
    favLoaded,
    historyMovies,
    setHistoryMovies,
    historyLoaded,
    fetchMovieDetails,
    searchMovies,
    addFavorite,
    removeFavorite,
    addHistory,
    fetchFavMovies,
    fetchHistoryMovies,
    trendingDone: trendingPage >= MAX_PAGE,
    popularDone: popularPage >= MAX_PAGE,
  };
};