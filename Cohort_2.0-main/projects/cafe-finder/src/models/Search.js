import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    occasion: String,
    budget: Number,
    peopleCount: Number,

    location: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  },
);

const searchModel =
  mongoose.models.Search || mongoose.model("Search", searchSchema);

export default searchModel;
