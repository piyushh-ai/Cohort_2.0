import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors";
import morgan from "morgan";
import shareRouter from "./routes/share.route.js";
import dotend from "dotenv";

dotend.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Auth routes — stricter limit
app.use("/api/auth", authRouter);

// Chat routes — chatLimiter is applied in chat.route.js directly on /message
app.use("/api/chats", chatRouter);
app.use("/api", shareRouter);

export default app;
