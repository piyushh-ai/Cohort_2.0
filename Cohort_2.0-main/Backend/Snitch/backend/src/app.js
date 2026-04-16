import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import productRouter from "./routes/product.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

/**
 * Configure Passport to use Google OAuth 2.0 strategy
 */
passport.use(
  new googleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
    },
    (refreshToken, accesstoken, profile, done) => {
      return done(null, profile);
    },
  ),
);

/**
 * all routes
 */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter)

export default app;
