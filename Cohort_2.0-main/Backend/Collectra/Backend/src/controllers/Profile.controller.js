import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

// ─── GET /api/auth/me ─────────────────────────────────
export const getMeController = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Not authenticated", success: false });
  }
  return res.status(200).json({
    message: "User fetched successfully",
    success: true,
    user: req.user,
  });
};

// ─── PUT /api/auth/profile ────────────────────────────
// Update displayName, bio, username
export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { displayName, bio, username } = req.body;

    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (bio !== undefined) updateData.bio = bio.slice(0, 160);

    // Username change — uniqueness check karo
    if (username && username !== req.user.username) {
      const existing = await userModel.findOne({ username });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This username is already taken",
        });
      }
      updateData.username = username;
    }

    const user = await userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .select("-password");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/auth/profile/picture ──────────────────
// Upload custom profile picture to Cloudinary
export const updateProfilePictureController = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Cloudinary pe upload karo
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "collectra/avatars",
          resource_type: "image",
          public_id: `avatar-${userId}-${Date.now()}`,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(file.buffer);
    });

    // Purani custom picture delete karo (Google picture nahi)
    if (req.user.profilePicture) {
      try {
        const urlParts = req.user.profilePicture.split("/image/upload/");
        if (urlParts.length > 1) {
          const publicId = urlParts[1]
            .replace(/^v\d+\//, "")
            .replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        }
      } catch {
        // Old picture delete fail — koi baat nahi
      }
    }

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { profilePicture: uploadResult.secure_url },
        { new: true },
      )
      .select("-password");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/auth/profile/picture ────────────────
// Remove custom picture — Google/initials pe wapas jao
export const removeProfilePictureController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.profilePicture) {
      try {
        const urlParts = req.user.profilePicture.split("/image/upload/");
        if (urlParts.length > 1) {
          const publicId = urlParts[1]
            .replace(/^v\d+\//, "")
            .replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        }
      } catch {
        // Ignore
      }
    }

    const user = await userModel
      .findByIdAndUpdate(userId, { profilePicture: null }, { new: true })
      .select("-password");

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PUT /api/auth/profile/password ──────────────────
// Change password (local users only)
export const changePasswordController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (req.user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "Google account — password change not available",
      });
    }

    const user = await userModel.findById(userId);
    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(userId, { password: hashed });

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
