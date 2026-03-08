import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
