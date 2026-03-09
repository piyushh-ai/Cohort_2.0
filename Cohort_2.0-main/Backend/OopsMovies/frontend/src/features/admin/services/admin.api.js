// src/features/admin/api/admin.api.js

import api from "../../../services/api";

// ✅ original axios error throw karo taaki Admin.jsx mein e.response?.data?.message kaam kare
const handleError = (error) => {
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";
  console.error("API Error:", message);
  throw error;
};

// ── Users ──────────────────────────────────────
// ✅ poora axios response return karo — Admin.jsx mein r.data.users expect hota hai
export const getAllUsersApi = async () => {
  try {
    return await api.get("/admin/users");
  } catch (e) {
    handleError(e);
  }
};
export const updateUserRoleApi = async (id, role) => {
  try {
    return await api.patch(`/admin/users/${id}/role`, { role });
  } catch (e) {
    handleError(e);
  }
};
export const toggleBanUserApi = async (id) => {
  try {
    return await api.patch(`/admin/users/${id}/ban`);
  } catch (e) {
    handleError(e);
  }
};

// ── Movies ─────────────────────────────────────
export const getAllMoviesApi = async () => {
  try {
    return await api.get("/admin/movies");
  } catch (e) {
    handleError(e);
  }
};
export const uploadMovieApi = async (data) => {
  try {
    return await api.post("/admin/movies", data);
  } catch (e) {
    handleError(e);
  }
};
export const updateMovieApi = async (id, data) => {
  try {
    return await api.put(`/admin/movies/${id}`, data);
  } catch (e) {
    handleError(e);
  }
};
export const deleteMovieApi = async (id) => {
  try {
    return await api.delete(`/admin/movies/${id}`);
  } catch (e) {
    handleError(e);
  }
};

// ── TMDB Auto-fill ─────────────────────────────
export const tmdbSearchApi = async (query) => {
  try {
    return await api.get(
      `/admin/tmdb-search?query=${encodeURIComponent(query)}`,
    );
  } catch (e) {
    handleError(e);
  }
};
export const tmdbTrailerApi = async (tmdbId) => {
  try {
    return await api.get(`/admin/tmdb-trailer/${tmdbId}`);
  } catch (e) {
    handleError(e);
  }
};
