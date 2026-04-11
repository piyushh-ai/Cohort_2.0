import express from "express";
import { validateRegisterUser } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = express.Router()

/**
 * POST /api/auth/register register user 
 */
authRouter.post("/register", validateRegisterUser, register)

export default authRouter