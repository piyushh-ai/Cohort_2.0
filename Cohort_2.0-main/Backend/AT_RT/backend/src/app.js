import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// health route
app.get("/health", (req,res) => {
  res.status(200).json("server running perfectly");
});

app.use("/api/auth", authRouter)



export default app;
