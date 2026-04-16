import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function sendTokenRes(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwtSecret,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

export const register = async (req, res) => {
  const { email, contact, password, fullname, isSeller } = req.body;

  try {
    const isAlreadyExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .json({ message: "User with this email or contact already exist" });
    }

    const user = await userModel.create({
      email,
      password,
      contact,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenRes(user, res, "user registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await sendTokenRes(user, res, "User loged in successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const googleCallback = async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  let user = await userModel.findOne({ email });

  if (!user) {
    user = await userModel.create({
      email: email,
      fullname: displayName,
      googleId: id,
      profilePic: profilePic,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwtSecret,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.redirect("http://localhost:5173/");
};
