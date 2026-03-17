import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.googleUser,
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
    refreshToken: config.googleRefreshToken,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.error("Email transporter verification failed:", err);
  });

export async function sendEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: config.googleUser,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent:", details);
}
