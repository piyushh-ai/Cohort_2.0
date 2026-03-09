// controllers/admin.controller.js

import UserModel from "../models/user.model.js";
import MovieModel from "../models/movie.model.js";
import tmdb from "../services/tmdb.service.js";

// Helper: map TMDB movie response to our MovieModel shape
const mapTmdbMovieToDoc = (movie) => {
  if (!movie || typeof movie !== "object") {
    return {
      title: "",
      posterUrl: "",
      description: "",
      releaseDate: "",
      genre: "",
    };
  }

  const title = movie.title || movie.name || "";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";
  const description = movie.overview || "";
  const releaseDate = movie.release_date || movie.first_air_date || "";

  let genre = "";
  if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    genre = movie.genres.map((g) => g.name).join(", ");
  } else if (Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
    genre = movie.genre_ids.join(",");
  }

  return {
    title,
    posterUrl,
    description,
    releaseDate,
    genre,
  };
};

// Helper: fetch TMDB details + trailer for a movie id
const fetchTmdbMovieAndTrailer = async (tmdbId) => {
  const [detailsRes, videosRes] = await Promise.all([
    tmdb.get(`/movie/${tmdbId}`),
    tmdb.get(`/movie/${tmdbId}/videos`),
  ]);

  const mapped = mapTmdbMovieToDoc(detailsRes.data);
  const trailer = videosRes.data.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const trailerUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : "";

  return { ...mapped, trailerUrl };
};

// ── USERS ─────────────────────────────────────────────────────

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// PATCH /api/admin/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Use 'user' or 'admin'." });
    }

    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot change your own role." });
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `Role updated to ${role}`, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

// PATCH /api/admin/users/:id/ban
export const toggleBanUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot ban yourself." });
    }

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({
      message: user.isBanned ? "User banned" : "User unbanned",
      user: { id: user._id, name: user.name, isBanned: user.isBanned },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update ban status" });
  }
};

// ── MOVIES ────────────────────────────────────────────────────

// GET /api/admin/movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find({}).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// POST /api/admin/movies
// NOTE: Admin sirf TMDB se data pick karega.
// Body allowed: { tmdbId, category }
export const uploadMovie = async (req, res) => {
  try {
    const allowedFields = ["tmdbId", "category"];
    const extraKeys = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key),
    );

    if (extraKeys.length > 0) {
      return res.status(400).json({
        message:
          "Only tmdbId and category are allowed. All other fields come directly from TMDB.",
      });
    }

    const { tmdbId, category } = req.body;

    if (!tmdbId) {
      return res.status(400).json({ message: "tmdbId is required." });
    }

    const tmdbIdNum = Number(tmdbId);
    if (Number.isNaN(tmdbIdNum)) {
      return res
        .status(400)
        .json({ message: "tmdbId must be a valid numeric TMDB id." });
    }

    // Duplicate check (same tmdbId)
    const existing = await MovieModel.findOne({ tmdbId: tmdbIdNum });
    if (existing) {
      return res.status(400).json({ message: "This movie is already uploaded." });
    }

    // Fetch full details + trailer from TMDB
    const tmdbData = await fetchTmdbMovieAndTrailer(tmdbIdNum);

    const movie = await MovieModel.create({
      ...tmdbData,
      tmdbId: tmdbIdNum,
      category: category || "movie",
    });

    res.status(201).json({ message: "Movie uploaded successfully", movie });
  } catch (error) {
    // Helpful TMDB / validation error message
    const tmdbMsg =
      error?.response?.data?.status_message || error?.message || null;
    if (tmdbMsg) {
      return res
        .status(400)
        .json({ message: `Failed to upload movie: ${tmdbMsg}` });
    }
    res.status(500).json({ message: "Failed to upload movie" });
  }
};

// PUT /api/admin/movies/:id
// NOTE:
// - tmdbId change karoge to saara data TMDB se re-sync hoga (title, poster, trailer, etc.)
// - description / genre ko admin custom value se override kar sakta hai
// - URLs (posterUrl, trailerUrl) hamesha TMDB se hi aayenge
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ["tmdbId", "category", "description", "genre"];
    const extraKeys = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key),
    );

    if (extraKeys.length > 0) {
      return res.status(400).json({
        message:
          "You can only update tmdbId or category. Other fields always come from TMDB.",
      });
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let tmdbIdToUse = movie.tmdbId;

    if (req.body.tmdbId) {
      const tmdbIdNum = Number(req.body.tmdbId);
      if (Number.isNaN(tmdbIdNum)) {
        return res
          .status(400)
          .json({ message: "tmdbId must be a valid numeric TMDB id." });
      }
      tmdbIdToUse = tmdbIdNum;
    }

    // Agar tmdbId hai (purana ya naya), toh details dobara TMDB se sync karo
    if (tmdbIdToUse) {
      const tmdbData = await fetchTmdbMovieAndTrailer(tmdbIdToUse);
      movie.title = tmdbData.title;
      movie.posterUrl = tmdbData.posterUrl;
      movie.description = tmdbData.description;
      movie.releaseDate = tmdbData.releaseDate;
      movie.genre = tmdbData.genre;
      movie.trailerUrl = tmdbData.trailerUrl;
      movie.tmdbId = tmdbIdToUse;
    }

    // Admin overrides (non-URL fields only)
    if (typeof req.body.description === "string") {
      movie.description = req.body.description;
    }
    if (typeof req.body.genre === "string") {
      movie.genre = req.body.genre;
    }
    if (req.body.category) {
      movie.category = req.body.category;
    }

    await movie.save();

    res.json({ message: "Movie updated successfully", movie });
  } catch (error) {
    const tmdbMsg =
      error?.response?.data?.status_message || error?.message || null;
    if (tmdbMsg) {
      return res
        .status(400)
        .json({ message: `Failed to update movie: ${tmdbMsg}` });
    }
    res.status(500).json({ message: "Failed to update movie" });
  }
};

// DELETE /api/admin/movies/:id
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndDelete(id);

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
};

// ── TMDB AUTO-FILL ────────────────────────────────────────────

// GET /api/admin/tmdb-search?query=Inception
export const tmdbSearch = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const { data } = await tmdb.get("/search/movie", {
      params: { query, page: 1 },
    });

    const results = (data.results || []).slice(0, 8).map((m) => ({
      tmdbId:      m.id,
      title:       m.title,
      posterUrl:   m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : "",
      description: m.overview,
      releaseDate: m.release_date,
      genre:       m.genre_ids?.join(","),
    }));

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: "TMDB search failed" });
  }
};

// GET /api/admin/tmdb-trailer/:tmdbId
export const tmdbTrailer = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const { data } = await tmdb.get(`/movie/${tmdbId}/videos`);
    const trailer = data.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");

    res.json({
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trailer" });
  }
};