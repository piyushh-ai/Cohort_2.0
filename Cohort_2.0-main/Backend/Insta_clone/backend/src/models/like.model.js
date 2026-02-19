const { default: mongoose } = require("mongoose");

const llikeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post ID is required to like a post"],
    },
    user: {
      type: String,
      required: [true, "User ID is required to like a post"],
    },
  },
  { timestamps: true },
);

const likeModel = mongoose.model("likes", llikeSchema);

module.exports = likeModel;
