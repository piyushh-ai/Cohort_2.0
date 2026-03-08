import tmdb from "../services/tmdb.service.js";

const MAX_PAGE = 5;
export const getTrendingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    if (page > MAX_PAGE) {
      return res.status(400).json({
        message: "Maximum page limit reached",
      });
    }
    const { data } = await tmdb.get("/trending/movie/day", {
      params: { page },
    });

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trending movies",
    });
  }
};

export const getPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;

    if (page > MAX_PAGE) {
      return res.status(400).json({
        message: "Maximum page limit reached",
      });
    }

    const { data } = await tmdb.get("/movie/popular", {
      params: { page },
    });

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch popular movies",
    });
  }
};

export const searchMovies = async (req, res) => {
  const { query } = req.query;
  const page = req.query.page || 1;

  if (page > MAX_PAGE) {
    return res.status(400).json({
      message: "Maximum page limit reached",
    });
  }

  try {
    const { data } = await tmdb.get("/search/movie", {
      params: { query, page },
    });

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await tmdb.get(`/movie/${id}`);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movie details",
    });
  }
};

export const getMovieTrailer = async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await tmdb.get(`/movie/${id}/videos`);

    const trailer = data.results.find((video) => video.type === "Trailer");

    res.status(200).json({
      trailer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Trailer not found",
    });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await tmdb.get(`/movie/${id}/similar`);

    res.status(200).json({
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch similar movies",
    });
  }
};

export const discoverMovies = async (req, res) => {
  try {
    const {
      genre, // TMDB genre id, e.g. 28
      sort = "popularity.desc",
      year, // release_year
      minRating, // vote_average.gte
      maxRating, // vote_average.lte
      page = 1,
    } = req.query;

    if (page > MAX_PAGE) {
      return res.status(400).json({ message: "Maximum page limit reached" });
    }

    const params = {
      page,
      sort_by: sort,
      ...(genre && { with_genres: genre }),
      ...(year && { primary_release_year: year }),
      ...(minRating && { "vote_average.gte": minRating }),
      ...(maxRating && { "vote_average.lte": maxRating }),
      "vote_count.gte": 50, // garbage results filter out
    };

    const { data } = await tmdb.get("/discover/movie", { params });

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to discover movies" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// movie.controller.js mein ye 2 functions ADD karo (existing functions ke baad)
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/movies/:id/cast
export const getMovieCast = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}/credits`);
    const cast = (data.cast ?? [])
      .filter(m => m.profile_path)   // only members with photo
      .slice(0, 20)                  // top 20
      .map(m => ({
        id:           m.id,
        name:         m.name,
        character:    m.character,
        profile_path: m.profile_path,
        order:        m.order,
      }));
    res.json({ cast });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cast" });
  }
};

// GET /api/movies/:id/images
export const getMovieImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}/images`, {
      params: { include_image_language: "en,null" },
    });
    const backdrops = (data.backdrops ?? [])
      .slice(0, 12)
      .map(img => ({
        file_path:   img.file_path,
        width:       img.width,
        height:      img.height,
        vote_average: img.vote_average,
      }));
    res.json({ backdrops });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};


// ─────────────────────────────────────────────────────────────────────────────
// movie.route.js mein ye 2 routes ADD karo (/:id/similar ke baad)
// ─────────────────────────────────────────────────────────────────────────────

// import { getMovieCast, getMovieImages } from "../controllers/movie.controller.js";
// (existing import mein add karo)

// movieRouter.get("/:id/cast",   getMovieCast);
// movieRouter.get("/:id/images", getMovieImages);