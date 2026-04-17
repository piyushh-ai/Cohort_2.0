import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Unauthorised" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorised",
    });
  }
};

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Unauthorised" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorised",
    });
  }
};
