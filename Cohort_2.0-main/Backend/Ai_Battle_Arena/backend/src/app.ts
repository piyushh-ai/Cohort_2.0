import express from "express";
import rungraph from "./services/graph.ai.service.js";
const app = express();

app.use(express.json());

// Define your routes here
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/", async (req, res) => {
  const result = await rungraph(
    "write a detailed plan to solve the problem of climate change",
  );
  res.json(result);
});

export default app;
