import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "./config/config.js";
import passport from "./config/passport.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    saveUninitialized: false, // ✅ unnecessary sessions avoid karo
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "https://collectra-ae2v.onrender.com",
        "https://collectra.online" // <- apna domain daalo
      ];

      // No origin (curl/Postman) ya allowed origins ya Chrome extension
      if (
        !origin ||
        allowed.includes(origin) ||
        origin.startsWith("chrome-extension://")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());



/**
 * All routes are defined here
 */
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/collections", collectionRouter);

// ✅ Global error handler — unhandled errors ko catch karo
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const distPath = path.join(__dirname, "../dist");

app.use(express.static(distPath));

app.use("/{*splat}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
