const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache")

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not provided",
    });
  }

  const isBlacklisted = await redis.get(token);

  if (isBlacklisted) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return rest.status(401).json({
      message: "invalid token ",
    });
  }
};

module.exports = authUser;
