import api from "../../../services/api";

export const getTrendingMoviesApi = (page = 1) => {
  return api.get(`/movies/trending?page=${page}`);
};

export const getPopularMoviesApi = (page = 1) => {
  return api.get(`/movies/popular?page=${page}`);
};

export const searchMoviesApi = (query, page = 1) => {
  return api.get(`/movies/search?query=${query}&page=${page}`);
};

export const getMovieDetailsApi = (id) => {
  return api.get(`/movies/${id}`);
};

export const getMovieTrailerApi = (id) => {
  return api.get(`/movies/${id}/trailer`);
};

export const getSimilarMoviesApi = (id) => {
  return api.get(`/movies/${id}/similar`);
};

export const getMovieCastApi = (id) => {
  return api.get(`/movies/${id}/cast`);
};

export const getMovieImagesApi = (id) => {
  return api.get(`/movies/${id}/images`);
};

export const addFavoriteApi = (movieId) => {
  return api.post(`/auth/favorites/${movieId}`);
};

export const removeFavoriteApi = (movieId) => {
  return api.delete(`/auth/favorites/${movieId}`);
};

export const getFavoritesApi = () => {
  return api.get(`/auth/favorites`);
};

export const addHistoryApi = (movieId) => {
  return api.post(`/auth/history/${movieId}`);
};

export const getHistoryApi = () => {
  return api.get(`/auth/history`);
};

// ── NEW ──
export const clearHistoryApi = () => {
  return api.delete(`/auth/history`);
};

export const discoverMoviesApi = (filters = {}, page = 1) => {
  const params = new URLSearchParams({ page });
  if (filters.genre) params.append("genre", filters.genre);
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.year) params.append("year", filters.year);
  if (filters.minRating) params.append("minRating", filters.minRating);
  if (filters.maxRating) params.append("maxRating", filters.maxRating);
  return api.get(`/movies/discover?${params.toString()}`);
};
