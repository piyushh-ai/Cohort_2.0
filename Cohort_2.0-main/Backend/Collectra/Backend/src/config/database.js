import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDb = () => {
  mongoose
    .connect(config.mongoUri)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Error connecting to database", error);
    });
};
