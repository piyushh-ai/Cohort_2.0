import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tmdb from "../services/tmdb.service.js";

// Helper: fetch movie details from TMDB using the shared tmdb axios instance
const fetchMovieFromTMDB = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Register error" });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

export const getMeController = async (req, res) => {
  res.status(200).json({
    message: "User fetched successfully",
    user: req.user,
  });
};

export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const addFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await UserModel.findById(req.user._id);

    if (user.favorites.includes(movieId)) {
      return res.json({ message: "Already in favorites" });
    }

    user.favorites.push(movieId);
    await user.save();

    res.json({ message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await UserModel.findById(req.user._id);

    user.favorites = user.favorites.filter((id) => id != movieId);
    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const movies = await Promise.all(
      user.favorites.map((movieId) =>
        fetchMovieFromTMDB(movieId).catch(() => null),
      ),
    );

    res.json({ movies: movies.filter(Boolean) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

// Same movie dobara aaye → purani entry hata ke updated time ke saath sabse upar le aao
export const addToHistory = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await UserModel.findById(req.user._id);

    const existingIndex = user.watchHistory.findIndex(
      (h) => h.movieId === Number(movieId),
    );

    if (existingIndex !== -1) {
      // Pehle se exist karta hai — hata do
      user.watchHistory.splice(existingIndex, 1);
    }

    // Naya/updated entry sabse upar
    user.watchHistory.unshift({
      movieId: Number(movieId),
      watchedAt: new Date(),
    });

    // Max 20 entries rakhni hain
    user.watchHistory = user.watchHistory.slice(0, 20);

    await user.save();

    res.json({ message: "History updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add history" });
  }
};

export const getWatchHistory = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const movies = await Promise.all(
      user.watchHistory.map((item) =>
        fetchMovieFromTMDB(item.movieId).catch(() => null),
      ),
    );

    res.json({ movies: movies.filter(Boolean) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

// Puri watch history ek baar mein clear karo
export const clearWatchHistory = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.user._id, {
      $set: { watchHistory: [] },
    });

    res.json({ message: "Watch history cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear history" });
  }
};
