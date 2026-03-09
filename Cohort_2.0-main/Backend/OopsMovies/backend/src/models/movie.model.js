import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    posterUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "Description not available",
    },

    // TMDB movie ID — isse hum TMDB se extra info fetch kar sakte hain
    tmdbId: {
      type: Number,
    },

    releaseDate: {
      type: String,
    },

    trailerUrl: {
      type: String,
    },

    // ✅ NEW: Admin custom streaming video URL (Google Drive, S3, etc.)
    videoUrl: {
      type: String,
      default: "",
    },

    genre: {
      type: String,
    },

    category: {
      type: String,
      enum: ["movie", "tv"],
      default: "movie",
    },
  },
  { timestamps: true },
);

const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;