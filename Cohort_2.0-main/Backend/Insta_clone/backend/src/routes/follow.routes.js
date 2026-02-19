const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  followUserController,
  unfollowUserController,
  acceptFollowRequest,
  rejectFollowRequest,
} = require("../controllers/follow.controller");

const followRoute = express.Router();

// /api/follow/followUser/:username

followRoute.post("/followUser/:username", identifyUser, followUserController);

// /api/follow/unfollowUser/:username

followRoute.post(
  "/unfollowUser/:username",
  identifyUser,
  unfollowUserController,
);

// /api/follow/accept/:username

followRoute.post("/accept/:username", identifyUser, acceptFollowRequest);

// /api/follow/reject/:username

followRoute.post("/reject/:username", identifyUser, rejectFollowRequest);

module.exports = followRoute;
