import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection error:", error);
    process.exit(1);
  }
};
