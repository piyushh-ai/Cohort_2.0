const id3 = require("node-id3");
const { uploadFile } = require("../services/storage.service");
const songModel = require("../models/songs.model");

const uploadSong = async (req, res) => {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs",
    }),
    uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song created successfully",
    song,
  });
};

const getSong = async (req, res) => {
  const { mood } = req.query;

  const song = await songModel.aggregate([
    { $match: { mood: mood } },
    { $sample: { size: 1 } },
  ]);

  res.status(201).json({
    message: "song fetched successfully",
    song,
  });
};

const getAllSongs = async (req, res) => {
  const songs = await songModel.find();

  if (!songs) {
    return res.statu(404).json({
      message: "songs not found",
    });
  }

  res.status(201).json({
    message: "all songs fetched successfully",
    songs,
  });
};

module.exports = {
  uploadSong,
  getSong,
  getAllSongs
};
