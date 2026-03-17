import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "./config/config.js";
import passport from "./config/passport.js";
import cors from "cors";

/**
 * All routes imports are here
 */
import authRouter from "./routes/auth.routes.js";
import itemRouter from "./routes/item.routes.js";
import collectionRouter from "./routes/collection.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(cors({
  origin: true, // Frontend URL
  credentials: true,               // ✅ Cookies allow karo
}));


app.use(passport.initialize());
app.use(passport.session());

// health check
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

/**
 * All routes are define here
 */
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/collections", collectionRouter);

export default app;
