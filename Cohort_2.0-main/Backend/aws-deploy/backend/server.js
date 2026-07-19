import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/health", (req, res) => {
    res.send("OK");
});

app.get("/api/users", (req, res) => {
    res.json([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
        { id: 3, name: "John Doe" },
        { id: 4, name: "Jane Doe" },
        { id: 5, name: "John Doe" },
        { id: 6, name: "Jane Doe" },
    ]);
});

app.get("/api/data", (req, res) => {
    res.json({
        message: "Data fetched successfully!",
        timestamp: new Date().toISOString(),
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});