const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register to register user
 * @access Public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login to login user
 * @access Public
 */
authRouter.post("/login", loginUser);

/**
 * @route GET /api/auth/logout to logout user
 * @access Public
 */
authRouter.get("/logout", logoutUser);

/**
 * @route POST /api/auth/get-me to get user
 * @access Public
 */
authRouter.post("/get-me", identifyUser, getMe);

module.exports = authRouter;
