import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./src/config/db.js";

dotenv.config();


connectToDb()

app.listen(3000, () => {
  console.log(`Server running: http://localhost:3000/`);
});
