import tmdb from "../services/tmdb.service.js";
import MovieModel from "../models/movie.model.js";

const MAX_PAGE = 5;

export const getTrendingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    if (page > MAX_PAGE) return res.status(400).json({ message: "Maximum page limit reached" });
    const { data } = await tmdb.get("/trending/movie/day", { params: { page } });
    res.status(200).json({ page: data.page, totalPages: data.total_pages, totalResults: data.total_results, movies: data.results });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending movies" });
  }
};

export const getPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    if (page > MAX_PAGE) return res.status(400).json({ message: "Maximum page limit reached" });
    const { data } = await tmdb.get("/movie/popular", { params: { page } });
    res.status(200).json({ page: data.page, totalPages: data.total_pages, totalResults: data.total_results, movies: data.results });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular movies" });
  }
};

export const searchMovies = async (req, res) => {
  const { query } = req.query;
  const page = req.query.page || 1;
  if (page > MAX_PAGE) return res.status(400).json({ message: "Maximum page limit reached" });

  try {
    const [tmdbRes, platformMovies] = await Promise.all([
      tmdb.get("/search/movie", { params: { query, page } }),
      MovieModel.find({ title: { $regex: query, $options: "i" } }).lean(),
    ]);

    const tmdbMovies = tmdbRes.data.results ?? [];

    // ✅ MongoDB movies ko TMDB-compatible format mein convert karo
    // id field mein tmdbId prefer karo — agar nahi hai toh mongoId
    // isFromPlatform + _mongoId flag zaroor lagao
    const platformFormatted = platformMovies.map((m) => ({
      id:             m.tmdbId || m._id.toString(),  // navigate ke liye
      _mongoId:       m._id.toString(),              // ✅ hamesha mongoId rakho
      _hasTmdbId:     !!m.tmdbId,                    // ✅ flag — TMDB se data lena hai ya nahi
      title:          m.title,
      poster_path:    null,
      posterUrl:      m.posterUrl,
      overview:       m.description,
      release_date:   m.releaseDate,
      vote_average:   0,
      genre_ids:      [],
      videoUrl:       m.videoUrl || "",
      isFromPlatform: true,
    }));

    // TMDB results mein se platform movies ki duplicate avoid karo
    const platformTmdbIds = new Set(platformMovies.filter(m => m.tmdbId).map(m => m.tmdbId));
    const filteredTmdb = tmdbMovies.filter((m) => !platformTmdbIds.has(m.id));

    // Platform movies sabse upar
    const merged = [...platformFormatted, ...filteredTmdb];

    res.status(200).json({ page: tmdbRes.data.page, totalPages: tmdbRes.data.total_pages, movies: merged });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

// ✅ FIXED: tmdbId nahi hai toh TMDB call mat karo — sirf MongoDB data return karo
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Step 1: MongoDB mein dhundo — pehle mongoId se, phir tmdbId se
    const platformMovie =
      await MovieModel.findById(id).lean().catch(() => null) ??
      await MovieModel.findOne({ tmdbId: Number(id) }).lean().catch(() => null);

    // Step 2: Agar platform movie mili aur tmdbId NAHI hai
    // → sirf MongoDB data return karo, TMDB call mat karo
    if (platformMovie && !platformMovie.tmdbId) {
      return res.status(200).json({
        id:             platformMovie._id.toString(),
        _mongoId:       platformMovie._id.toString(),
        title:          platformMovie.title,
        overview:       platformMovie.description || "",
        poster_path:    null,
        posterUrl:      platformMovie.posterUrl,
        backdrop_path:  null,
        release_date:   platformMovie.releaseDate || "",
        vote_average:   0,
        vote_count:     0,
        runtime:        null,
        genres:         [],
        tagline:        "",
        status:         "Released",
        budget:         0,
        revenue:        0,
        original_language: "",
        videoUrl:       platformMovie.videoUrl || "",
        trailerUrl:     platformMovie.trailerUrl || "",
        isFromPlatform: true,
      });
    }

    // Step 3: TMDB se details fetch karo (sirf tab jab tmdbId available ho)
    const tmdbId = platformMovie?.tmdbId || id;
    const { data } = await tmdb.get(`/movie/${tmdbId}`);

    // Step 4: Platform movie ka data merge karo
    const response = {
      ...data,
      ...(platformMovie && {
        videoUrl:       platformMovie.videoUrl || "",
        trailerUrl:     platformMovie.trailerUrl || "",
        isFromPlatform: true,
        _mongoId:       platformMovie._id.toString(),
      }),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Movie details error:", error);
    res.status(500).json({ message: "Failed to fetch movie details" });
  }
};

// ✅ FIXED: tmdbId nahi hai toh TMDB call mat karo
export const getMovieTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const platformMovie =
      await MovieModel.findById(id).lean().catch(() => null) ??
      await MovieModel.findOne({ tmdbId: Number(id) }).lean().catch(() => null);

    // Platform movie hai aur tmdbId nahi — custom trailerUrl return karo
    if (platformMovie && !platformMovie.tmdbId) {
      return res.status(200).json({
        trailer: null,
        platformTrailerUrl: platformMovie.trailerUrl || null,
      });
    }

    const tmdbId = platformMovie?.tmdbId || id;
    const { data } = await tmdb.get(`/movie/${tmdbId}/videos`);
    const trailer = data.results.find((video) => video.type === "Trailer");
    res.status(200).json({ trailer, platformTrailerUrl: platformMovie?.trailerUrl || null });
  } catch (error) {
    res.status(500).json({ message: "Trailer not found" });
  }
};

// ✅ FIXED: tmdbId nahi toh similar movies empty return karo
export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const platformMovie =
      await MovieModel.findById(id).lean().catch(() => null) ??
      await MovieModel.findOne({ tmdbId: Number(id) }).lean().catch(() => null);

    if (platformMovie && !platformMovie.tmdbId) {
      return res.status(200).json({ movies: [] });
    }

    const tmdbId = platformMovie?.tmdbId || id;
    const { data } = await tmdb.get(`/movie/${tmdbId}/similar`);
    res.status(200).json({ movies: data.results });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch similar movies" });
  }
};

export const discoverMovies = async (req, res) => {
  try {
    const { genre, sort = "popularity.desc", year, minRating, maxRating, page = 1 } = req.query;
    if (page > MAX_PAGE) return res.status(400).json({ message: "Maximum page limit reached" });
    const params = {
      page, sort_by: sort,
      ...(genre     && { with_genres: genre }),
      ...(year      && { primary_release_year: year }),
      ...(minRating && { "vote_average.gte": minRating }),
      ...(maxRating && { "vote_average.lte": maxRating }),
      "vote_count.gte": 50,
    };
    const { data } = await tmdb.get("/discover/movie", { params });
    res.status(200).json({ page: data.page, totalPages: data.total_pages, totalResults: data.total_results, movies: data.results });
  } catch (error) {
    res.status(500).json({ message: "Failed to discover movies" });
  }
};

// ✅ FIXED: tmdbId nahi toh cast empty return karo
export const getMovieCast = async (req, res) => {
  try {
    const { id } = req.params;
    const platformMovie =
      await MovieModel.findById(id).lean().catch(() => null) ??
      await MovieModel.findOne({ tmdbId: Number(id) }).lean().catch(() => null);

    if (platformMovie && !platformMovie.tmdbId) {
      return res.json({ cast: [] });
    }

    const tmdbId = platformMovie?.tmdbId || id;
    const { data } = await tmdb.get(`/movie/${tmdbId}/credits`);
    const cast = (data.cast ?? []).filter((m) => m.profile_path).slice(0, 20).map((m) => ({
      id: m.id, name: m.name, character: m.character, profile_path: m.profile_path, order: m.order,
    }));
    res.json({ cast });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cast" });
  }
};

// ✅ FIXED: tmdbId nahi toh images empty return karo
export const getMovieImages = async (req, res) => {
  try {
    const { id } = req.params;
    const platformMovie =
      await MovieModel.findById(id).lean().catch(() => null) ??
      await MovieModel.findOne({ tmdbId: Number(id) }).lean().catch(() => null);

    if (platformMovie && !platformMovie.tmdbId) {
      return res.json({ backdrops: [] });
    }

    const tmdbId = platformMovie?.tmdbId || id;
    const { data } = await tmdb.get(`/movie/${tmdbId}/images`, { params: { include_image_language: "en,null" } });
    const backdrops = (data.backdrops ?? []).slice(0, 12).map((img) => ({
      file_path: img.file_path, width: img.width, height: img.height, vote_average: img.vote_average,
    }));
    res.json({ backdrops });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

export const getPlatformMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch platform movies" });
  }
};

export const getPlatformMovieByTmdbId = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const movie = await MovieModel.findOne({ tmdbId: Number(tmdbId) });
    if (!movie) return res.status(200).json({ available: false, movie: null });
    res.status(200).json({ available: true, movie });
  } catch (error) {
    res.status(500).json({ message: "Failed to check platform availability" });
  }
};