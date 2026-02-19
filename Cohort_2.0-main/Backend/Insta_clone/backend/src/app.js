const express = require("express");
const authRouter = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const cookie = require("cookie-parser");
const followRoute = require("./routes/follow.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
app.use("/api/follow", followRoute);

module.exports = app;
