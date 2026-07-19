import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const registerService = async (data) => {
  try {
    const { name, email, password } = data;

    const alreadyExist = await userModel.findOne({ email });

    if (alreadyExist) {
      throw new Error("User already Exist");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    user.save();

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const { email, password } = data;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found with this email");
    }

    const hashPassword = bcrypt.compareSync(password, user.password);

    if (!hashPassword) {
      throw new Error("Incorrect password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    user.save();

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

export const getAccessTokenService = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

    if (!decoded) throw new Error("Unauthorized");

    let user = await userModel.findById(decoded.id)

    if(refreshToken !== user.refreshToken) throw new Error("Unauthorized")

    const accessToken = generateAccessToken(user._id)

    return accessToken
  } catch (error) {
    throw error;
  }
};
