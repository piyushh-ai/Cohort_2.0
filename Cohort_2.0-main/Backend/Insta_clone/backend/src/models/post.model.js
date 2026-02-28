const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      required: [true, "imgUrl is require for creating an post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required to create a post"],
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
