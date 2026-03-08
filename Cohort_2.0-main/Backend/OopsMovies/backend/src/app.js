import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";   // 👈 add this

/**
 * ES module me __dirname create karna
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * all routes are import here
 */
import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

/**
 * all routes are define here
 */
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

const distPath = path.join(__dirname, "../dist");

/**
 * frontend linking
 */
app.use(express.static(distPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
