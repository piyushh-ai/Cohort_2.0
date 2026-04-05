import cron from "node-cron";
import userModel from "../models/user.model.js";
import { fetchResurfaceItems } from "../services/Item.service.js";
import { sendEmail, buildResurfaceEmailHtml } from "../services/mail.service.js";
import { config } from "../config/config.js";

// ─── Main resurface job ────────────────────────────────────
export const runResurfaceJob = async () => {
  console.log("🕐 Resurface cron started:", new Date().toISOString());

  if (!config.resendApiKey) {
    console.warn("⚠️ RESEND_API_KEY not set — resurface job skipped");
    return;
  }

  let emailsSent = 0;
  let emailsFailed = 0;

  try {
    // Only users who haven't opted out
    const users = await userModel.find(
      { "preferences.resurfaceEnabled": { $ne: false } },
      "_id email username displayName preferences"
    );

    console.log(`👥 Processing ${users.length} users for resurface...`);

    for (const user of users) {
      try {
        const items = await fetchResurfaceItems(user._id);

        if (items.length === 0) {
          console.log(`ℹ️ No eligible items for ${user.email}`);
          continue;
        }

        // ✅ FIX: Send email FIRST, then update lastSurfaced
        // Old code updated lastSurfaced BEFORE sending — if email failed, items never resurfaced again
        await sendEmail({
          to: user.email,
          subject: `🔁 ${items.length} saved item${items.length > 1 ? "s" : ""} worth revisiting`,
          html: buildResurfaceEmailHtml(user, items),
        });

        // ✅ Only update lastSurfaced AFTER successful email delivery
        await import("../models/item.model.js").then(({ default: ItemModel }) =>
          ItemModel.updateMany(
            { _id: { $in: items.map((i) => i._id) } },
            { lastSurfaced: new Date() }
          )
        );

        emailsSent++;
        console.log(`✅ Resurface email → ${user.email} (${items.length} items)`);
      } catch (userErr) {
        emailsFailed++;
        console.error(`❌ Resurface failed for ${user.email}:`, userErr.message);
      }
    }
  } catch (err) {
    console.error("❌ Resurface cron error:", err.message);
  }

  console.log(
    `✅ Resurface cron done: ${emailsSent} sent, ${emailsFailed} failed — ${new Date().toISOString()}`
  );
};

// ─── Register cron schedule ────────────────────────────────
export const startResurfaceCron = () => {
  if (!config.resendApiKey) {
    console.warn("⚠️ RESEND_API_KEY missing — resurface cron not started");
    return;
  }

  // Every day at 9:00 AM IST
  cron.schedule("0 9 * * *", runResurfaceJob, {
    timezone: "Asia/Kolkata",
  });

  console.log("📅 Resurface cron scheduled — daily 9:00 AM IST");
};
