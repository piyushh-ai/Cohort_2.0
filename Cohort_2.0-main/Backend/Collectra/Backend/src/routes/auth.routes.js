import { Router } from "express";
import {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
} from "../validators/auth.validator.js";
import {
  forgotPasswordController,
  googleSuccess,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetPasswordController,
} from "../controllers/auth.controller.js";
import {
  getMeController,
  updateProfileController,
  updateProfilePictureController,
  removeProfilePictureController,
  changePasswordController,
} from "../controllers/Profile.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUserController);
authRouter.post("/login", loginValidator, loginUserController);
authRouter.get("/me", userMiddleware, getMeController);
authRouter.post("/logout", userMiddleware, logoutUserController);

// ─── Profile routes ───────────────────────────────────
authRouter.put("/profile", userMiddleware, updateProfileController);
authRouter.post(
  "/profile/picture",
  userMiddleware,
  upload.single("picture"),
  updateProfilePictureController,
);
authRouter.delete(
  "/profile/picture",
  userMiddleware,
  removeProfilePictureController,
);
authRouter.put("/profile/password", userMiddleware, changePasswordController);

// ─── Google OAuth ─────────────────────────────────────
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleSuccess,
);

// ─── Password reset ───────────────────────────────────
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post(
  "/reset-password/:id/:token",
  resetPasswordValidator,
  resetPasswordController,
);

export default authRouter;
