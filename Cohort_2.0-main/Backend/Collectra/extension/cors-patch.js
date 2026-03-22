// ─────────────────────────────────────────────────────────
// server.js / app.js mein CORS wali line ko yeh se replace karo
// ─────────────────────────────────────────────────────────

import cors from "cors";

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:5173",
      "https://your-production-frontend.com", // <- apna domain daalo
    ];

    // No origin (curl/Postman) ya allowed origins ya Chrome extension
    if (!origin || allowed.includes(origin) || origin.startsWith("chrome-extension://")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
