import mongoose from "mongoose";
import { config } from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

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
