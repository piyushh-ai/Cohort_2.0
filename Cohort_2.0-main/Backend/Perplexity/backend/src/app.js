import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./routes/chat.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// health check
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)

export default app;
