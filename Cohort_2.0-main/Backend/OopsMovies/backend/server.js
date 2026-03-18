import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./src/config/db.js";

dotenv.config();

const port = 5000;

connectToDb()

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}/`);
});
