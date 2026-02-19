const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  try {
    const follower = req.user.username;
    const followee = req.params.username;

    if (follower === followee) {
      return res.status(400).json({
        message: "you cannot follow yourself",
      });
    }



    const isAlreadyFollowing = await followModel.findOne({
      follower,
      followee,
    });

    if (isAlreadyFollowing) {
      return res.status(400).json({
        message: `you have already followed ${followee}`,
      });
    }

    const isUserExist = await userModel.findOne({
      username: followee,
    });

    if (!isUserExist) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    followModel.create({
      follower: follower,
      followee: followee,
    });

    res.status(201).json({
      message: `follow request sent to ${followee} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
    console.log(error);
  }
}

async function unfollowUserController(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  const isAlreadyFollowing = await followModel.findOne({
    follower,
    followee,
  });

  if (!isAlreadyFollowing) {
    return res.status(400).json({
      message: `you have not followed ${followee} yet`,
    });
  }

  await followModel.findOneAndDelete({
    follower,
    followee,
  });

  res.status(200).json({
    message: `you have unfollowed ${followee} successfully`,
  });

}

async function acceptFollowRequest(req, res) {
  try {
    const followee = req.user.username; // jisne request receive ki
    const follower = req.params.username; // jisne request bheji

    const request = await followModel.findOne({
      follower,
      followee,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({
        message: "follow request not found",
      });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
      message: "follow request accepted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function rejectFollowRequest(req, res) {
  try {
    const followee = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOne({
      follower,
      followee,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({
        message: "follow request not found",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      message: "follow request rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequest,
  rejectFollowRequest,
};
