import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectToDB } from "./src/config/Database.js";

/**
 * port defined
 */
const port = config.port || 5000;

/**
 * Connect to the database
 */
connectToDB();

/**
 * Start the server
 */
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
