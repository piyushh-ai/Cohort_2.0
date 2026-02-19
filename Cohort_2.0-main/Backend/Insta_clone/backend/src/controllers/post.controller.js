const postModel = require("../models/post.model");
const imageKit = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources/index.js");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const client = new imageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPost(req, res) {
  const file = await client.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
    folder: "insta_clone/posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.username,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const posts = await postModel.find({
    user: req.user.id,
  });

  if (posts.length === 0) {
    return res.status(400).json({
      message: "you don't have any post",
    });
  }

  res.status(201).json({
    message: "posts fetched successfully",
    posts,
  });
}

async function getPostDetail(req, res) {
  const userId = req.user.id;
  const postId = req.params.post;
  let post;

  try {
    post = await postModel.findById(postId);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Post ID",
    });
  }

  if (!post) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  const isValidUser = userId === post.user._id.toString();

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  res.status(200).json({
    message: "Post fetched Successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

module.exports = {
  createPost,
  getPostController,
  getPostDetail,
  likePostController,
};
