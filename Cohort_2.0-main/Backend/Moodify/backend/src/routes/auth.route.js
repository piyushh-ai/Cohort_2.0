const { Router } = require("express");
const {
  loginController,
  registerController,
  getMe,
  logoutController,
} = require("../controllers/auth.controller");
const authUser = require("../middleware/auth.middleware");

const authRouter = Router();

/**
 * POST - "/api/auth/login" to login user
 */
authRouter.post("/login", loginController);

/**
 * POST - "/api/auth/register" to register user
 */
authRouter.post("/register", registerController);

/**
 * get - "/api/auth/get-me" to get user details
 */
authRouter.get("/get-me", authUser, getMe);

/**
 * POST - "/api/auth/logout" to logout user
 */
authRouter.get("/logout", logoutController);

module.exports = authRouter;
