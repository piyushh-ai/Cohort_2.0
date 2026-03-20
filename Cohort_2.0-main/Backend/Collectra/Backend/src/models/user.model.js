import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
      sparse: true,
    },

    googleProfilePicture: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
