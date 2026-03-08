import { Router } from "express";
import {
  addFavorite,
  addToHistory,
  clearWatchHistory,
  getFavorites,
  getMeController,
  getWatchHistory,
  loginUserController,
  logoutController,
  registerUserController,
  removeFavorite,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middleware/validation.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * POST /api/auth/register to register a user
 */
authRouter.post(
  "/register",
  registerValidator,
  validate,
  registerUserController,
);

/**
 * POST /api/auth/login to login a user
 */
authRouter.post("/login", loginValidator, validate, loginUserController);

/**
 * GET /api/auth/me to get a user detailes
 */
authRouter.get("/me", isAuthenticated, getMeController);

/**
 * POST /api/auth/logout to logout a user
 */
authRouter.post("/logout", logoutController);

/**
 * POST /api/auth/favorites/:movieId to add a movie to favorite
 */
authRouter.post("/favorites/:movieId", isAuthenticated, addFavorite);

/**
 * DELETE /api/auth/favorites/:movieId to delete a movie to favorite
 */
authRouter.delete("/favorites/:movieId", isAuthenticated, removeFavorite);

/**
 * GET /api/auth/favorites to get a movie to favorite
 */
authRouter.get("/favorites", isAuthenticated, getFavorites);

/**
 * POST /api/auth/history/:movieId to add a movie to history
 */
authRouter.post("/history/:movieId", isAuthenticated, addToHistory);

/**
 * GET /api/auth/history to get a movie to history
 */
authRouter.get("/history", isAuthenticated, getWatchHistory);

/**
 * DELETE /api/auth/history to delete a movie to history
 */
authRouter.delete("/history", isAuthenticated, clearWatchHistory);

export default authRouter;
