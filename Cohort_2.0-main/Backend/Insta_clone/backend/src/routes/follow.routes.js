const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  acceptFollowRequest,
  rejectFollowRequest,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getSuggestions,
} = require("../controllers/follow.controller");

const followRoute = express.Router();

// /api/follow/followUser/:userId

followRoute.post("/followUser/:userId", identifyUser, followUser);

// /api/follow/unfollowUser/:userId

followRoute.post("/unfollowUser/:userId", identifyUser, unfollowUser);

// /api/follow/followers

followRoute.get("/followers", identifyUser, getFollowers);

// /api/follow/following

followRoute.get("/following", identifyUser, getFollowing);

// /api/follow/suggestions
followRoute.get("/suggestions", identifyUser, getSuggestions);

module.exports = followRoute;
