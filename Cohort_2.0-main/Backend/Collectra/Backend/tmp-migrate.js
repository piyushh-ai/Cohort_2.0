import mongoose from "mongoose";
import { config } from "./src/config/config.js";
import { migrateEmbeddings } from "./src/services/Embedding.service.js";

async function run() {
  await mongoose.connect(config.mongoUri);
  console.log("Connected to MongoDB via Migration Script");
  await migrateEmbeddings();
  console.log("Database Migration Finished.");
  process.exit(0);
}

run();
