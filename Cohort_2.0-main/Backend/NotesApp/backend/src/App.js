const express = require("express");
const noteModel = require("./models/notes.model");
const path = require("path");
const cors = require("cors")

app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await noteModel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(201).json({
    message: "notes fetched successfully",
    notes,
  });
});

app.delete("/api/notes/:_id", async (req, res) => {
  const id = req.params._id;
  await noteModel.findByIdAndDelete(id);

  res.status(201).json({
    message: "note deletes successfully",
  });
});

app.patch("/api/notes/:_id", async (req, res) => {
  const id = req.params._id;
  const { description } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "note updated successfully",
    note,
  });
});



module.exports = app;
