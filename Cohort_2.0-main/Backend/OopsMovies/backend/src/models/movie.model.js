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

    tmdbId: {
      type: Number,
    },

    releaseDate: {
      type: String,
    },

    trailerUrl: {
      type: String,
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