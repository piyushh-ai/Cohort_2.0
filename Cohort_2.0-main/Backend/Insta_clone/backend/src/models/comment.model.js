const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post ID is required to like a post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required to like a post"],
    },
    comment: {
      type: String,
      require: [true, "comment is required"],
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("Comment", commentSchema)

module.exports = commentModel
