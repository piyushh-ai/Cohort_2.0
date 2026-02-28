const express = require("express");
const {
  createPost,
  getPostController,
  getPostDetail,
  likePostController,
  getAllPostController,
  unLikePostController,
  commentPostController,
  getCommentPostController,
} = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRoute = express.Router();

/**
 * @route POST /api/posts to create a post
 * @access Public
 */
postRoute.post("/", upload.single("postImage"), identifyUser, createPost);

/**
 * @route GET /api/posts to get a post
 * @access Public
 */
postRoute.get("/", identifyUser, getPostController);

/**
 * @route GET /api/posts/detail/:post to get a post details
 * @access Public
 */
postRoute.get("/detail/:post", identifyUser, getPostDetail);

/**
 * @route POST /api/posts/like/:postId to like  post
 * @access Public
 */
postRoute.post("/like/:postId", identifyUser, likePostController);

/**
 * @route POST /api/posts/unlike/:postId to unlike  post
 * @access Public
 */
postRoute.post("/unlike/:postId", identifyUser, unLikePostController);

/**
 * @route POST /api/posts/comment/:postId to comment a post
 * @access Public
 */
postRoute.post("/comment/:postId", identifyUser, commentPostController);

/**
 * @route GET /api/posts/comment/:postId to get comments of a perticular post
 * @access Public
 */
postRoute.get("/comment/:postId", identifyUser, getCommentPostController);

/**
 * @route GET /api/posts/feed to get full fedd
 * @access Public
 */
postRoute.get("/feed", identifyUser, getAllPostController);

module.exports = postRoute;
