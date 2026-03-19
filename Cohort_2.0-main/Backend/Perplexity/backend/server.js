import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/socket/server.socket.js";

dotenv.config();

connectToDb();

const httpServer = http.createServer(app);

initSocket(httpServer);

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});