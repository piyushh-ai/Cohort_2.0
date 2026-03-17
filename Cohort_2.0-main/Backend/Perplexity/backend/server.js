import app from "./src/app.js";
import dotenv from "dotenv";
import { conntectToDb } from "./src/config/db.js";
import { testAI } from "./src/services/ai.service.js";

dotenv.config();

conntectToDb()
testAI()

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running http://localhost:${port}`);
});
