// routes/admin.route.js

import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getAllUsers,
  updateUserRole,
  toggleBanUser,
  getAllMovies,
  uploadMovie,
  updateMovie,   // ✅ NEW
  deleteMovie,
  tmdbSearch,
  tmdbTrailer,
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

// Saare admin routes pe pehle isAuthenticated + isAdmin check hoga
adminRouter.use(isAuthenticated, isAdmin);

// ── Users ──────────────────────────────────────
adminRouter.get("/users",            getAllUsers);
adminRouter.patch("/users/:id/role", updateUserRole);
adminRouter.patch("/users/:id/ban",  toggleBanUser);

// ── Movies ─────────────────────────────────────
adminRouter.get("/movies",         getAllMovies);
adminRouter.post("/movies",        uploadMovie);
adminRouter.put("/movies/:id",     updateMovie);   // ✅ NEW — edit movie + videoUrl
adminRouter.delete("/movies/:id",  deleteMovie);

// ── TMDB Auto-fill ─────────────────────────────
adminRouter.get("/tmdb-search",           tmdbSearch);
adminRouter.get("/tmdb-trailer/:tmdbId",  tmdbTrailer);

export default adminRouter;