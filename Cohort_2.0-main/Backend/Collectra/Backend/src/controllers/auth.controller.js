import { config } from "../config/config.js";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "User with this email or username already exist",
      success: false,
      err: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    config.jwtSecret,
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.jwtSecret,
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

export const getMeController = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated",
      success: false,
    });
  }

  return res.status(200).json({
    message: "User fetched successfully",
    success: true,
    user: req.user,
  });
};

export const logoutUserController = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
};

export const googleSuccess = async (req, res) => {
  if (!req.user) {
    return res.redirect("http://localhost:5173/login?error=auth_failed");
  }

  const token = jwt.sign(
    { id: req.user._id, username: req.user.username },
    config.jwtSecret,
    { expiresIn: "7d" },
  );

  // Cookie set karo
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
  });

  // Frontend dashboard pe redirect karo
  return res.redirect("http://localhost:5173/");
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  if (user.provider === "google") {
    return res.status(400).json({
      message: "This account uses Google login",
    });
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#238636;border-radius:10px;padding:10px 16px;">
                    <span style="color:#ffffff;font-size:16px;font-weight:700;letter-spacing:0.5px;">CL</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="color:#f0f6fc;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Collectra</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#1c2128;border:1px solid #30363d;border-radius:12px;padding:40px 36px;">

              <!-- Title -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:8px;">
                    <h1 style="margin:0;color:#f0f6fc;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Reset your password</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:28px;">
                    <p style="margin:0;color:#8b949e;font-size:14px;line-height:1.6;">
                      We received a request to reset the password for your Collectra account.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <div style="height:1px;background:#30363d;"></div>
                  </td>
                </tr>

                <!-- Body text -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <p style="margin:0;color:#c9d1d9;font-size:14px;line-height:1.7;">
                      Click the button below to set a new password. This link will expire in
                      <strong style="color:#f0f6fc;">15 minutes</strong>.
                    </p>
                  </td>
                </tr>

                <!-- Button -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${resetLink}"
                      style="display:inline-block;background:#238636;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:0.2px;">
                      Reset Password
                    </a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <div style="height:1px;background:#30363d;"></div>
                  </td>
                </tr>

                <!-- Link fallback -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <p style="margin:0 0 8px;color:#8b949e;font-size:12px;">
                      If the button above does not work, copy and paste this link into your browser:
                    </p>
                    <p style="margin:0;word-break:break-all;">
                      <a href="${resetLink}" style="color:#388bfd;font-size:12px;text-decoration:none;">${resetLink}</a>
                    </p>
                  </td>
                </tr>

                <!-- Warning -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:rgba(248,81,73,0.08);border:1px solid rgba(248,81,73,0.2);border-radius:8px;padding:12px 16px;">
                          <p style="margin:0;color:#f85149;font-size:12px;line-height:1.6;">
                            If you did not request a password reset, you can safely ignore this email.
                            Your password will not be changed.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#484f58;font-size:12px;line-height:1.6;">
                This email was sent by Collectra. If you have questions, contact our support team.
              </p>
              <p style="margin:8px 0 0;color:#484f58;font-size:12px;">
                &copy; 2026 Collectra. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`,
  });

  return res.status(200).json({
    message: "Reset link sent to email",
    success: true,
  });
};

export const resetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.id !== id) {
      return res.status(400).json({
        message: "Invalid reset link",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Reset link expired or invalid",
      success: false,
    });
  }
};
