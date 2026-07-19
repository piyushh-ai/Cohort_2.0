import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized reguest",
      });
    }

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

    if (!decoded) {
      res.status(401).json({
        message: "Unauthorized reguest",
      });
    }

    const user = await userModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    throw Error(error);
  }
};
