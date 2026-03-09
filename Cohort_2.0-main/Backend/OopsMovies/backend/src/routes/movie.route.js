import { Router } from "express";
import {
  getTrendingMovies,
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
  discoverMovies,
  getMovieCast,
  getMovieImages,
  getPlatformMovies, // ✅ NEW
  getPlatformMovieByTmdbId, // ✅ NEW
} from "../controllers/movie.controller.js";

const movieRouter = Router();

// ── Static routes (/:id se UPAR rakhna ZAROORI hai) ──────────
movieRouter.get("/trending", getTrendingMovies);
movieRouter.get("/popular", getPopularMovies);
movieRouter.get("/search", searchMovies);
movieRouter.get("/discover", discoverMovies);

// ✅ NEW: Platform (MongoDB) movie routes
// "platform" static string hai — /:id se upar hona chahiye
movieRouter.get("/platform", getPlatformMovies);
movieRouter.get("/platform/:tmdbId", getPlatformMovieByTmdbId);

// ── Dynamic :id routes (hamesha static routes ke NEECHE) ─────
movieRouter.get("/:id", getMovieDetails);
movieRouter.get("/:id/trailer", getMovieTrailer);
movieRouter.get("/:id/similar", getSimilarMovies);
movieRouter.get("/:id/cast", getMovieCast);
movieRouter.get("/:id/images", getMovieImages);

export default movieRouter;
