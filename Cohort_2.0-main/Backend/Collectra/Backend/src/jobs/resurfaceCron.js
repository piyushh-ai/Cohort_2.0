import cron from "node-cron";
import userModel from "../models/user.model.js";
import { fetchResurfaceItems } from "../services/Item.service.js";
import { sendEmail } from "../services/mail.service.js";
import { config } from "../config/config.js";

// ─── Email HTML builder ───────────────────────────────
const buildResurfaceEmailHtml = (items) => {
  const frontendUrl = config.frontendUrl;

  const itemCards = items
    .map(
      (item) => `
    <tr>
      <td style="padding-bottom:16px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:#1c2128;border:1px solid #30363d;border-radius:10px;padding:20px 24px;">
          <tr>
            <td>
              ${
                item.image
                  ? `<img src="${item.image}" alt="" 
                      style="width:100%;max-height:160px;object-fit:cover;border-radius:6px;margin-bottom:12px;display:block;" />`
                  : ""
              }
              <p style="margin:0 0 4px;color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">
                ${item.type || "article"} · ${item.siteName || ""}
              </p>
              <h3 style="margin:0 0 8px;color:#f0f6fc;font-size:16px;font-weight:600;line-height:1.4;">
                ${item.title || "Untitled"}
              </h3>
              ${
                item.summary || item.description
                  ? `<p style="margin:0 0 16px;color:#8b949e;font-size:13px;line-height:1.6;">
                      ${(item.summary || item.description).slice(0, 160)}${
                        (item.summary || item.description).length > 160
                          ? "..."
                          : ""
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
                            `<span style="display:inline-block;background:#21262d;color:#8b949e;
                              font-size:11px;padding:2px 8px;border-radius:20px;margin-right:4px;">
                              ${tag}
                            </span>`,
                        )
                        .join("")}
                    </p>`
                  : ""
              }
              <a href="${frontendUrl}/item/${item._id}"
                style="display:inline-block;background:#238636;color:#ffffff;
                  text-decoration:none;font-size:13px;font-weight:600;
                  padding:8px 20px;border-radius:6px;">
                View Item →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#238636;border-radius:8px;padding:8px 14px;">
                    <span style="color:#fff;font-size:15px;font-weight:700;">CL</span>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="color:#f0f6fc;font-size:18px;font-weight:700;">Collectra</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Header card -->
          <tr>
            <td style="background:#1c2128;border:1px solid #30363d;border-radius:12px;
              padding:28px 28px 20px;margin-bottom:16px;">
              <h2 style="margin:0 0 8px;color:#f0f6fc;font-size:20px;font-weight:700;">
                🔁 Time to revisit these
              </h2>
              <p style="margin:0;color:#8b949e;font-size:14px;line-height:1.6;">
                You saved these a while ago — they might be worth a second look.
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
              <p style="margin:0;color:#484f58;font-size:12px;">
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

// ─── Main job ─────────────────────────────────────────
const runResurfaceJob = async () => {
  console.log("🕐 Resurface cron started:", new Date().toISOString());

  try {
    const users = await userModel.find({}, "_id email username");

    for (const user of users) {
      try {
        const items = await fetchResurfaceItems(user._id);

        if (items.length === 0) continue; // koi eligible item nahi

        await sendEmail({
          to: user.email,
          subject: `🔁 ${items.length} item${items.length > 1 ? "s" : ""} worth revisiting on Collectra`,
          html: buildResurfaceEmailHtml(items),
        });

        console.log(
          `✅ Resurface email → ${user.email} (${items.length} items)`,
        );
      } catch (userErr) {
        // ek user fail ho to baaki users continue karo
        console.error(`❌ Failed for ${user.email}:`, userErr.message);
      }
    }
  } catch (err) {
    console.error("❌ Resurface cron error:", err.message);
  }

  console.log("✅ Resurface cron done:", new Date().toISOString());
};

// ─── Register cron ────────────────────────────────────
export const startResurfaceCron = () => {
  // Har roz 9 AM IST
  cron.schedule("0 9 * * *", runResurfaceJob, {
    timezone: "Asia/Kolkata",
  });

  console.log("📅 Resurface cron scheduled — daily 9:00 AM IST");
};
