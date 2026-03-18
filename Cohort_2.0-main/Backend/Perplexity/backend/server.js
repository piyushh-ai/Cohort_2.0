import app from "./src/app.js";
import dotenv from "dotenv";
import { conntectToDb } from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/socket/server.socket.js";

dotenv.config();

conntectToDb();

const httpServer = http.createServer(app);

initSocket(httpServer)

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Server Running http://localhost:${port}`);
});
