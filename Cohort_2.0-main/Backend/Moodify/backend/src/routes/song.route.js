const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  uploadSong,
  getSong,
  getAllSongs,
} = require("../controllers/song.controller");

const songRouter = express.Router();

/**
 * POST - /api/song/ to upload a song
 */
songRouter.post("/", upload.single("song"), uploadSong);

/**
 * GET - /api/song/ to get a song by mood
 */
songRouter.get("/", getSong);

/**
 * GET - /api/song/all-songs to get a song by mood
 */
songRouter.get("/all-songs", getAllSongs);

module.exports = songRouter;
