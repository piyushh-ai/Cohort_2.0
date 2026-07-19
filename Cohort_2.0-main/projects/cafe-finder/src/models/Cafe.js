import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema(
  {
    placeId: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: Number,

    address: String,

    photos: [String],

    source: {
      type: String,
      enum: ["google", "owner"],
      default: "google",
    },

    aiSummary: {
      pros: [String],
      cons: [String],
      bestFor: [String],
    },

    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },

    lastUpdated: Date,
  },
  {
    timestamps: true,
  },
);

cafeSchema.index({ location: "2dsphere" });

const cafeModel = mongoose.models.Cafe || mongoose.model("Cafe", cafeSchema);

export default cafeModel
