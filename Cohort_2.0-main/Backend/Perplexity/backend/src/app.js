import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors";
import morgan from "morgan";
import shareRouter from "./routes/share.route.js";
import dotend from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // 👈 add this

/**
 * ES module me __dirname create karna
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotend.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://www.perplexity-piyush.in",
      "https://perplexity-piyush.in",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Auth routes — stricter limit
app.use("/api/auth", authRouter);

// Chat routes — chatLimiter is applied in chat.route.js directly on /message
app.use("/api/chats", chatRouter);
app.use("/api", shareRouter);

const distPath = path.join(__dirname, "../dist");

app.use(express.static(distPath));

app.use("/{*splat}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
