import { Resend } from "resend";
import { config } from "../config/config.js";

const resend = new Resend(config.resendApiKey);

export async function sendEmail({ to, subject, html, text }) {
  try {
    const data = await resend.emails.send({
      from: "Collectra <noreply@collectra.online>",
      to,
      subject,
      html: html || `<p>${text}</p>`,
    });

    console.log("✅ Email sent:", data);
    return data; // 👈 return karna important hai
  } catch (err) {
    console.error("❌ Email error:", err);
    throw err; // 👈 error propagate karo
  }
}
