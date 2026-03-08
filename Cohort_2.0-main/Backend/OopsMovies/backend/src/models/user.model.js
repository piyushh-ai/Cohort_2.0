import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

   favorites: [
      {
        type: Number, // TMDB movie id
      },
    ],

    watchHistory: [
      {
        movieId: Number,
        watchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
