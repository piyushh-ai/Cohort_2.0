import { Resend } from "resend";
import { config } from "../config/config.js";

const resend = new Resend(config.resendApiKey);

// ─── Generic email sender with retry ─────────────────────
export async function sendEmail({ to, subject, html, text }) {
  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const data = await resend.emails.send({
        from: "Collectra <noreply@collectra.online>",
        to,
        subject,
        html: html || `<p>${text}</p>`,
      });
      console.log(`✅ Email sent to ${to}:`, data.id);
      return data;
    } catch (err) {
      lastError = err;
      // Don't retry on 4xx (user doesn't exist, bad API key etc.)
      const status = err?.statusCode || err?.status || 0;
      if (status >= 400 && status < 500) {
        console.error(`❌ Email 4xx error (no retry): ${err.message}`);
        throw err;
      }

      if (attempt < maxRetries) {
        console.warn(`⚠️ Email attempt ${attempt + 1} failed, retrying...`);
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  console.error("❌ Email failed after retries:", lastError?.message);
  throw lastError;
}

// ─── Resurface email HTML ────────────────────────────────
export const buildResurfaceEmailHtml = (user, items) => {
  const frontendUrl = config.frontendUrl;
  const displayName = user.displayName || user.username || "there";

  const itemCards = items
    .map(
      (item) => `
    <tr>
      <td style="padding-bottom:16px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:#161b22;border:1px solid #21262d;border-radius:12px;overflow:hidden;">
          ${
            item.image
              ? `<tr><td><img src="${item.image}" alt="" style="width:100%;max-height:150px;object-fit:cover;display:block;" /></td></tr>`
              : ""
          }
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 4px;color:#7d8590;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                ${item.type || "article"}${item.siteName ? ` · ${item.siteName}` : ""}
              </p>
              <h3 style="margin:0 0 8px;color:#e6edf3;font-size:16px;font-weight:600;line-height:1.4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                ${item.title || "Untitled"}
              </h3>
              ${
                item.summary || item.description
                  ? `<p style="margin:0 0 14px;color:#7d8590;font-size:13px;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                      ${(item.summary || item.description).slice(0, 150)}${
                        (item.summary || item.description).length > 150 ? "..." : ""
                      }
                    </p>`
                  : ""
              }
              ${
                item.tags?.length > 0
                  ? `<p style="margin:0 0 16px;">
                      ${item.tags
                        .slice(0, 4)
                        .map(
                          (tag) =>
                            `<span style="display:inline-block;background:#21262d;color:#7d8590;font-size:11px;padding:2px 10px;border-radius:20px;margin-right:5px;margin-bottom:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${tag}</span>`
                        )
                        .join("")}
                    </p>`
                  : ""
              }
              <a href="${frontendUrl}/item/${item._id}"
                style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#38bdf8);color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:8px 20px;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                View Item →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Items worth revisiting — Collectra</title>
</head>
<body style="margin:0;padding:0;background:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#0ea5e9,#38bdf8);border-radius:10px;padding:8px 14px;">
                    <span style="color:#fff;font-size:15px;font-weight:700;letter-spacing:-0.3px;">CL</span>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="color:#e6edf3;font-size:18px;font-weight:700;letter-spacing:-0.3px;">Collectra</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background:#161b22;border:1px solid #21262d;border-radius:12px;padding:28px 28px 20px;margin-bottom:16px;">
              <h2 style="margin:0 0 8px;color:#e6edf3;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
                Hey ${displayName} 👋
              </h2>
              <p style="margin:0;color:#7d8590;font-size:14px;line-height:1.6;">
                You saved ${items.length} item${items.length > 1 ? "s" : ""} a while ago that might be worth revisiting.
              </p>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:16px;"></td></tr>

          <!-- Item cards -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemCards}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;color:#484f58;font-size:12px;line-height:1.6;">
                You're receiving this because you have items saved in Collectra.
              </p>
              <p style="margin:6px 0 0;color:#484f58;font-size:12px;">
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
  `;
};
