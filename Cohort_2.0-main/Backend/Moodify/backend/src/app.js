const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

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
app.use("/api/song", songRouter);

const distPath = path.join(__dirname, "../dist");

/**
 * frontend linking
 */
app.use(express.static(distPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

module.exports = app;
