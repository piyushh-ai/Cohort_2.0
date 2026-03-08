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
} from "../controllers/movie.controller.js";

const movieRouter = Router();

/**
 * GET /api/movies/trending to get trending movies
 */
movieRouter.get("/trending", getTrendingMovies);

/**
 * GET /api/movies/popular to get popular movies
 */
movieRouter.get("/popular", getPopularMovies);

/**
 * GET /api/movies/search to search movies
 */
movieRouter.get("/search", searchMovies);

/**
 * GET /api/movies/discover to discover movies by filters
 * ⚠️ IMPORTANT: Ye /:id se UPAR hona chahiye — warna Express
 * "discover" string ko movie ID samajh leta hai
 */
movieRouter.get("/discover", discoverMovies);

/**
 * GET /api/movies/:id to get movie detail
 */
movieRouter.get("/:id", getMovieDetails);

/**
 * GET /api/movies/:id/trailer to get movie trailer
 */
movieRouter.get("/:id/trailer", getMovieTrailer);

/**
 * GET /api/movies/:id/similar to get similar movie
 */
movieRouter.get("/:id/similar", getSimilarMovies);

movieRouter.get("/:id/cast",   getMovieCast);
movieRouter.get("/:id/images", getMovieImages);

export default movieRouter;