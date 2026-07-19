import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cafe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User ||
  mongoose.model("User", userSchema);

export default userModel