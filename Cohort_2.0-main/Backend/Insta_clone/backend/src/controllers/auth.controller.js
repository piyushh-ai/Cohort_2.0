const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { username, email, password, avatar, bio } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      if (
        isUserAlreadyExist.email === email &&
        isUserAlreadyExist.username === username
      ) {
        return res.status(409).json({
          message: "user already Exist",
        });
      } else if (isUserAlreadyExist.username === username) {
        return res.status(409).json({
          message: "Username already Exist",
        });
      } else if (isUserAlreadyExist.email === email) {
        return res.status(409).json({
          message: "Email already Exist",
        });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      avatar,
      bio,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "user registered successfully",
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    },
  });
}

async function getMe(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    },
  });
}

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // production me true
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
};
