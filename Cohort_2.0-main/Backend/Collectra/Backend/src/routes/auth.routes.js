import { Router } from "express";
import {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
} from "../validators/auth.validator.js";
import {
  forgotPasswordController,
  getMeController,
  googleSuccess,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetPasswordController,
} from "../controllers/auth.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import passport from "passport";

const authRouter = Router();

/**
 * POST - /api/auth/register to register a user
 */

authRouter.post("/register", registerValidator, registerUserController);

/**
 * POST - /api/auth/login to login a user
 */
authRouter.post("/login", loginValidator, loginUserController);

/**
 * GET - /api/auth/me to get the current user
 */
authRouter.get("/me", userMiddleware, getMeController);

/**
 * POST - /api/auth/logout to logout a user
 */
authRouter.post("/logout", userMiddleware, logoutUserController);

/**
 * GET - /api/auth/google to login with google
 */
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * GET - /api/auth/google/callback to handle the callback from google
 */
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleSuccess,
);

/**
 * POST - /api/auth/forgot-password to forgot password
 */
authRouter.post("/forgot-password", forgotPasswordController);

/**
 * POST - /api/auth/reset-password to reset password
 */
authRouter.post(
  "/reset-password/:id/:token",
  resetPasswordValidator,
  resetPasswordController,
);

export default authRouter;
