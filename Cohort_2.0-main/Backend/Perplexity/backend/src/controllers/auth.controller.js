import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";
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

    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity!",
      html: getVerificationEmailHtml(username, emailVerificationToken),
    });

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

// ─── Email HTML Template ────────────────────────────────────────────────────
// Usage: paste this html string into your mailer's html field
// Variables: ${username}, ${emailVerificationToken}

const getVerificationEmailHtml = (username, emailVerificationToken) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Verify your Perplexity account</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #06060a; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { width: 100% !important; }
      .email-body { padding: 24px 16px !important; }
      .hero-pad { padding: 36px 24px 32px !important; }
      .btn-td { display: block !important; width: 100% !important; }
      .btn-a { display: block !important; width: 100% !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#06060a;font-family:'DM Sans',Georgia,sans-serif;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#06060a;line-height:1px;">
    Verify your email to start using Perplexity — your AI-powered search companion.&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;&nbsp;&#847;
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#06060a;min-width:100%;">
    <tr>
      <td align="center" style="padding:40px 16px 48px;">

        <!-- Email card -->
        <table class="email-wrapper" role="presentation" width="560" cellpadding="0" cellspacing="0"
          style="max-width:560px;width:100%;border-radius:20px;overflow:hidden;background-color:#0c0c12;border:1px solid rgba(255,255,255,0.07);">

          <!-- ── HEADER HERO ── -->
          <tr>
            <td class="hero-pad" align="center"
              style="padding:48px 40px 40px;background:linear-gradient(160deg,#0c1a1a 0%,#0c0c12 60%);border-bottom:1px solid rgba(255,255,255,0.06);position:relative;">

              <!-- Glow circle (decorative) -->
              <div style="position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,0.12) 0%,transparent 70%);pointer-events:none;"></div>

              <!-- Logo mark -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                <tr>
                  <td align="center" style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#0d9488,#2dd4bf);box-shadow:0 0 32px rgba(45,212,191,0.35),0 4px 12px rgba(0,0,0,0.5);">
                    <!-- Logo SVG -->
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkwyIDdsIDEwIDUgMTAgNS0xMC01ek0yIDE3bDEwIDUgMTAtNU0yIDEybDEwIDUgMTAtNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4="
                      width="24" height="24" alt="Perplexity" style="display:block;margin:auto;margin-top:14px;" />
                  </td>
                </tr>
              </table>

              <!-- Brand name -->
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(45,212,191,0.7);margin-bottom:16px;">
                Perplexity
              </p>

              <!-- Headline -->
              <h1 style="font-family:'DM Sans',Georgia,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.03em;color:#f0f0f5;line-height:1.25;margin:0;">
                Verify your email
              </h1>
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;color:rgba(255,255,255,0.35);margin-top:8px;line-height:1.5;">
                One click and you're in.
              </p>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td class="email-body" style="padding:36px 40px;">

              <!-- Greeting -->
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;color:rgba(240,240,245,0.75);line-height:1.7;margin-bottom:20px;">
                Hey <strong style="color:#f0f0f5;font-weight:600;">${username}</strong> 👋
              </p>

              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;color:rgba(240,240,245,0.6);line-height:1.75;margin-bottom:32px;">
                Thanks for signing up for Perplexity — your AI-powered search companion.
                Just hit the button below to verify your email address and activate your account.
              </p>

              <!-- ── CTA BUTTON ── -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td class="btn-td" align="center"
                    style="border-radius:12px;background:linear-gradient(135deg,#0d9488,#2dd4bf);box-shadow:0 0 28px rgba(45,212,191,0.25),0 4px 14px rgba(0,0,0,0.4);">
                    <a class="btn-a" href="https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
                      target="_blank"
                      style="display:inline-block;padding:14px 36px;font-family:'DM Sans',Georgia,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.01em;color:#ffffff;text-decoration:none;border-radius:12px;white-space:nowrap;">
                      ✓ &nbsp;Verify my email
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.06);"></td>
                </tr>
              </table>

              <!-- Fallback URL box -->
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:10px;">
                Button not working?
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#080810;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 14px;word-break:break-all;">
                    <a href="https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
                      style="font-family:'Courier New',Courier,monospace;font-size:11.5px;color:rgba(45,212,191,0.6);text-decoration:none;line-height:1.6;">
                      https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.06);"></td>
                </tr>
              </table>

              <!-- Expiry & security note -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Expiry -->
                  <td width="50%" style="padding-right:8px;vertical-align:top;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#080810;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(45,212,191,0.5);margin-bottom:5px;">
                            ⏱ Expires in
                          </p>
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:14px;font-weight:600;color:rgba(240,240,245,0.7);">
                            24 hours
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Security -->
                  <td width="50%" style="padding-left:8px;vertical-align:top;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#080810;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(45,212,191,0.5);margin-bottom:5px;">
                            🔒 Security
                          </p>
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:14px;font-weight:600;color:rgba(240,240,245,0.7);">
                            Single use only
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:12px;color:rgba(255,255,255,0.18);line-height:1.7;text-align:center;margin-bottom:12px;">
                If you didn't create a Perplexity account, you can safely ignore this email —
                no account has been activated.
              </p>
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:11px;color:rgba(255,255,255,0.1);text-align:center;">
                © 2026 Perplexity &nbsp;·&nbsp; Made with ♥
              </p>
            </td>
          </tr>

        </table>
        <!-- /email card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;
