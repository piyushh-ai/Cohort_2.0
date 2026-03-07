const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/**
 * All Routes are imports here
 */
const authRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.route");

app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

/**
 * All Routes are define here
 */

app.use("/api/auth", authRouter);
app.use("/api/song", songRouter)

module.exports = app;
