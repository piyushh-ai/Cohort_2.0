const postModel = require("../models/post.model");
const imageKit = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources/index.js");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");
const commentModel = require("../models/comment.model");
const userModel = require("../models/user.model");

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
    user: req.user.id,
  });

  await userModel.findByIdAndUpdate(req.user.id, {
      $inc: { postsCount: 1 },
    });
  const populatedPost = await post.populate("user");
  res.status(201).json({
    message: "post created successfully",
    populatedPost,
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
    return res.status(204).json({
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
  const id = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(204).json({
      message: "post not found.",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: id,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function unLikePostController(req, res) {
  const id = req.user.id;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: id,
  });

  if (!isLiked) {
    res.status(204).json({
      message: "Post didn't liked",
    });
  }

  await likeModel.findByIdAndDelete({ _id: isLiked._id });

  

  res.status(201).json({
    message: "post unlike successfully",
  });
}

async function getAllPostController(req, res) {
  const user = req.user;

  const posts = await postModel
    .find({})
    .sort({ _id: -1 })
    .populate("user")
    .lean();

  const updatePosts = await Promise.all(
    posts.map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.id,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);

      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched successfully",
    updatePosts,
  });
}

async function commentPostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const { userComment } = req.body;

  const comment = await commentModel.create({
    user: userId,
    post: postId,
    comment: userComment,
  });

  res.status(201).json({
    message: "commented successfully",
    comment,
  });
}

async function getCommentPostController(req, res) {
  const postId = req.params.postId;

  const post = await commentModel
    .find({
      post: postId,
    })
    .sort({ _id: -1 })
    .populate("user")
    .lean();

  if (!post) {
    res.status(204).json({
      message: "no comments found",
    });
  }

  res.status(201).json({
    message: "comments fetched successfully",
    post,
  });
}

async function deleteCommentController(req, res) {
  const userId = req.user.id;
  const commentId = req.params.commentId;

  // comment find karo
  const comment = await commentModel.findById(commentId);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  // check karo ki comment jisne delete karna hai wahi owner hai
  if (comment.user.toString() !== userId) {
    return res.status(403).json({
      message: "You are not allowed to delete this comment",
    });
  }

  await commentModel.findByIdAndDelete(commentId);

  res.status(200).json({
    message: "Comment deleted successfully",
  });
}

async function deletePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  // check karo ki comment jisne delete karna hai wahi owner hai
  if (post.user.toString() !== userId) {
    return res.status(403).json({
      message: "You are not allowed to delete this post",
    });
  }

  await postModel.findByIdAndDelete(postId);

  await userModel.findByIdAndUpdate(userId, {
      $inc: { postsCount: -1 },
    });

  res.status(200).json({
    message: "Comment deleted successfully",
  });
}

module.exports = {
  createPost,
  getPostController,
  getPostDetail,
  likePostController,
  getAllPostController,
  unLikePostController,
  commentPostController,
  getCommentPostController,
  deleteCommentController,
  deletePostController
};
