import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDB = () => {
  try {
    mongoose.connect(config.mongo_uri).then(() => {
      console.log("connected to db");
    });
  } catch (error) {
    console.log("error connecting database:", error.message);
    throw error
  }
};
