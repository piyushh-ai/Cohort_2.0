import express from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import { getMe, googleCallback, login, register } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

/**
 * POST /api/auth/register register user
 */
authRouter.post("/register", validateRegisterUser, register);

/**
 * POST /api/auth/login login user
 */
authRouter.post("/login", validateLoginUser, login);

/**
 * GET /api/auth/google
 */
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * GET /api/auth/google/callback
 */
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.nodeEnv == "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleCallback
);

/**
 * GET /api/auth/me
 */
authRouter.get("/me", authenticateUser, getMe)
export default authRouter;
