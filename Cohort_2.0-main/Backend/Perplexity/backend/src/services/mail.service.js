import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
  const { data, error } = await resend.emails.send({
    from: "Perplexity <noreply@perplexity-piyush.in>",
    to,
    subject,
    html,
    ...(text && { text }),
  });

  if (error) {
    console.error("Email send failed:", error);
    throw new Error(error.message);
  }

  console.log("Email sent:", data);
  return data;
}
