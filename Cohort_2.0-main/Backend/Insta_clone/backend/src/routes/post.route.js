const express = require("express");
const {
  createPost,
  getPostController,
  getPostDetail,
  likePostController
} = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRoute = express.Router();

postRoute.post("/", upload.single("postImage"), identifyUser, createPost);

postRoute.get("/", identifyUser, getPostController);

postRoute.get("/detail/:post", identifyUser, getPostDetail)

postRoute.post("/like/:postId", identifyUser, likePostController);

module.exports = postRoute;
