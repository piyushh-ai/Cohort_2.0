const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // check if already following
    const existingFollow = await followModel.findOne({
      follower: currentUserId,
      following: targetUserId,
    });

    if (existingFollow) {
      return res.status(400).json({ message: "Already following" });
    }

    await followModel.create({
      follower: currentUserId,
      following: targetUserId,
    });

    await userModel.findByIdAndUpdate(targetUserId, {
      $inc: { followersCount: 1 },
    });

    await userModel.findByIdAndUpdate(currentUserId, {
      $inc: { followingCount: 1 },
    });

    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;

    const deleted = await followModel.findOneAndDelete({
      follower: currentUserId,
      following: targetUserId,
    });

    if (!deleted) {
      return res.status(400).json({ message: "Not following this user" });
    }

    await userModel.findByIdAndUpdate(targetUserId, {
      $inc: { followersCount: -1 },
    });

    await userModel.findByIdAndUpdate(currentUserId, {
      $inc: { followingCount: -1 },
    });

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFollowers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const currentUserId = req.user.id;

  const followers = await followModel.find({
    following: currentUserId,
  })
    .populate("follower")
    .skip(skip)
    .limit(limit);

  res.json(followers);
};

const getFollowing = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const currentUserId = req.user.id;

    const following = await followModel.find({
      follower: currentUserId,
    })
      .populate("following", "username avatar bio followersCount")
      .skip(skip)
      .limit(limit);

    const total = await followModel.countDocuments({
      follower: currentUserId,
    });

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      following,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // 1️⃣ Find users current user already follows
    const followingDocs = await followModel.find({
      follower: currentUserId,
    }).select("following");

    const followingIds = followingDocs.map((doc) => doc.following);

    // 2️⃣ Exclude self + already followed users
    const suggestions = await userModel.find({
      _id: { $nin: [...followingIds, currentUserId] },
    })
      .sort({ followersCount: -1 }) // Popular users first
      .skip(skip)   
      .limit(limit)
      .select("username avatar bio followersCount");

    const total = await userModel.countDocuments({
      _id: { $nin: [...followingIds, currentUserId] },
    });

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      suggestions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  unfollowUser,
  followUser,
  getFollowers,
  getFollowing,
  getSuggestions
};
