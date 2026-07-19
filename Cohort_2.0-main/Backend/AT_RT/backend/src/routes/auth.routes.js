import { Router } from "express";
import {
  loginController,
  registerController,
  getAccessTokenController
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-accessToken", getAccessTokenController);

authRouter.get("/home", authMiddleware, (req, res) => {
  res.status(201).json({
    message: "Home fetched",
  });
});

export default authRouter;
