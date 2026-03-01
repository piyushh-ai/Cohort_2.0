const express = require("express");
const authRouter = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const cookie = require("cookie-parser");
const followRoute = require("./routes/follow.routes");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
app.use("/api/follow", followRoute);


const distPath = path.join(__dirname, "../dist");

/**
 * frontend linking
 */
app.use(express.static(distPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
module.exports = app;
