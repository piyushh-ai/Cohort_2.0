import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const userMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, config.jwtSecret);

  const user = await userModel.findOne({ _id: decoded.id }).select("-password");
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};
