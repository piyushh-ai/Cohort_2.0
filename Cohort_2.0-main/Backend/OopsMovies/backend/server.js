import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./src/config/db.js";

dotenv.config();

const PORT = 3000;

connectToDb()

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
});
