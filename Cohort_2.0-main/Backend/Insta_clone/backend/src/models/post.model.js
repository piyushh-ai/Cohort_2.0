const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is require for creating an post"],
  },
  user: {
    type: String,
    required: [true, "Username is required to create a post"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
