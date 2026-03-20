import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { getVerificationEmailHtml, sendEmail } from "../services/mail.service.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * @route POST /api/auth/register
 */
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false,
      });
    }

    const user = await userModel.create({ username, email, password });

    // ✅ Fixed: added expiresIn so token doesn't last forever
    const emailVerificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: getVerificationEmailHtml(username, emailVerificationToken),
      });
    } catch (emailErr) {
      console.error("EMAIL ERROR:", emailErr);
    }

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}

/**
 * @route POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before logging in",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // ✅ Fixed: httpOnly + secure + sameSite for proper security
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ HTTPS required
      sameSite: "none", // ✅ cross-origin ke liye
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}

/**
 * @route GET /api/auth/get-me
 */
export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User fetched", success: true, user });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}

/**
 * @route GET /api/auth/verify-email
 */
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }

    if (user.verified) {
      return res.send(`
        <h1>Already Verified</h1>
        <p>Your email is already verified. <a href="${process.env.FRONTEND_URL}/login">Go to Login</a></p>
      `);
    }

    user.verified = true;
    await user.save();

    return res.send(`
      <h1>Email Verified!</h1>
      <p>Your email has been verified. <a href="${process.env.FRONTEND_URL}/login">Go to Login</a></p>
    `);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

/**
 * @route POST /api/auth/logout
 */
export async function logout(req, res) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // ✅ HTTPS required
    sameSite: "none", // ✅ cross-origin ke liye
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
}


