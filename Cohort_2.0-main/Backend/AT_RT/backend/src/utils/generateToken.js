import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, config.JWT_ACCESS_SECRET, { expiresIn: "1m" });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, config.JWT_REFRESH_SECRET, { expiresIn: "1d" });
};
