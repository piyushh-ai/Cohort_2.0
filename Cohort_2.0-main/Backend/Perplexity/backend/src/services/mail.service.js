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

// ─── Email HTML Template ────────────────────────────────────────────────────
// Usage: paste this html string into your mailer's html field
// Variables: ${username}, ${emailVerificationToken}

export const getVerificationEmailHtml = (username, emailVerificationToken) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Verify your Collectra account</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #07070f;
      -webkit-font-smoothing: antialiased;
    }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }

    @media only screen and (max-width: 640px) {
      .outer-pad { padding: 24px 12px 40px !important; }
      .card { border-radius: 16px !important; }
      .hero-pad { padding: 40px 28px 36px !important; }
      .body-pad { padding: 32px 28px !important; }
      .footer-pad { padding: 24px 28px 32px !important; }
      .info-row td { display: block !important; width: 100% !important; }
      .info-row td:first-child { padding-right: 0 !important; padding-bottom: 10px !important; }
      .info-row td:last-child { padding-left: 0 !important; }
      h1 { font-size: 28px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#07070f;">

  <!-- Hidden preheader -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#07070f;line-height:1px;">
    One click to verify your email and activate your Collectra account.&#847;&zwj;&#847;&zwj;&#847;&zwj;&#847;&zwj;&#847;&zwj;&#847;&zwj;
  </div>

  <!-- Outer table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#07070f;">
    <tr>
      <td class="outer-pad" align="center" style="padding:48px 20px 60px;">

        <!-- Top label -->
        <p style="font-family:'Syne',Georgia,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(99,211,188,0.45);margin-bottom:20px;">
          Collectra &nbsp;/&nbsp; Email Verification
        </p>

        <!-- ══ CARD ══ -->
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" class="card"
          style="max-width:620px;width:100%;border-radius:24px;overflow:hidden;background-color:#0d0d1a;border:1px solid rgba(255,255,255,0.06);box-shadow:0 32px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(99,211,188,0.04),inset 0 1px 0 rgba(255,255,255,0.06);">

          <!-- ── HERO ── -->
          <tr>
            <td class="hero-pad" align="center"
              style="padding:56px 48px 48px;background:linear-gradient(170deg,#0a1a16 0%,#0d0d1a 55%);border-bottom:1px solid rgba(255,255,255,0.05);position:relative;overflow:hidden;">

              <!-- Background glow blobs -->
              <div style="position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:360px;height:280px;border-radius:50%;background:radial-gradient(ellipse,rgba(63,207,177,0.08) 0%,transparent 65%);pointer-events:none;"></div>
              <div style="position:absolute;bottom:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(ellipse,rgba(63,150,207,0.06) 0%,transparent 65%);pointer-events:none;"></div>

              <!-- Logo mark -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td align="center"
                    style="width:60px;height:60px;border-radius:18px;background:linear-gradient(145deg,#0d9e84,#3fcfb1);box-shadow:0 0 40px rgba(63,207,177,0.3),0 8px 24px rgba(0,0,0,0.5);">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA5TDE0IDRMMjQgOUwxNCA1TDQgOVoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjkiLz48cGF0aCBkPSJNNCA5VjE5TDE0IDI0VjE0TDQgOVoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjUiLz48cGF0aCBkPSJNMjQgOVYxOUwxNCAyNFYxNEwyNCA5WiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNzUiLz48L3N2Zz4="
                      width="28" height="28" alt="Collectra"
                      style="display:block;margin:16px auto 0;" />
                  </td>
                </tr>
              </table>

              <!-- Brand -->
              <p style="font-family:'Syne',Georgia,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(63,207,177,0.55);margin-bottom:18px;">
                Collectra
              </p>

              <!-- Headline -->
              <h1 style="font-family:'Syne',Georgia,sans-serif;font-size:34px;font-weight:800;letter-spacing:-0.03em;color:#eeeef5;line-height:1.2;margin:0 0 12px;">
                Verify your email
              </h1>

              <!-- Subheadline -->
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:16px;font-weight:300;color:rgba(255,255,255,0.3);line-height:1.55;max-width:360px;margin:0 auto;">
                You're one step away from your personal content hub.
              </p>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td class="body-pad" style="padding:44px 48px;">

              <!-- Greeting -->
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:16px;color:rgba(238,238,245,0.65);line-height:1.75;margin-bottom:12px;">
                Hey <strong style="color:#eeeef5;font-weight:600;">${username}</strong> 👋
              </p>
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;color:rgba(238,238,245,0.45);line-height:1.8;margin-bottom:40px;">
                Thanks for joining Collectra. Hit the button below to confirm your email address and unlock your account — bookmarks, collections, and AI-powered organization await.
              </p>

              <!-- ── CTA BUTTON ── -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 40px;">
                <tr>
                  <td align="center"
                    style="border-radius:14px;background:linear-gradient(135deg,#0d9e84 0%,#3fcfb1 100%);box-shadow:0 0 36px rgba(63,207,177,0.22),0 6px 20px rgba(0,0,0,0.45);">
                    <a href="https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
                      target="_blank"
                      style="display:inline-block;padding:16px 44px;font-family:'Syne',Georgia,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.04em;color:#ffffff;text-decoration:none;border-radius:14px;white-space:nowrap;">
                      Verify My Email &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider with label -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.05);"></td>
                  <td style="padding:0 14px;white-space:nowrap;font-family:'DM Sans',Georgia,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.15);">
                    or copy link
                  </td>
                  <td style="border-top:1px solid rgba(255,255,255,0.05);"></td>
                </tr>
              </table>

              <!-- Fallback URL box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="background:#08080f;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 18px;word-break:break-all;">
                    <a href="https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
                      style="font-family:'Courier New',Courier,monospace;font-size:11.5px;color:rgba(63,207,177,0.5);text-decoration:none;line-height:1.7;">
                      https://perplexity-eeii.onrender.com/api/auth/verify-email?token=${emailVerificationToken}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Info cards row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="info-row">
                <tr>
                  <td width="50%" style="padding-right:8px;vertical-align:top;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#08080f;border:1px solid rgba(255,255,255,0.05);border-left:2px solid rgba(63,207,177,0.35);border-radius:10px;padding:16px 18px;">
                          <p style="font-family:'Syne',Georgia,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(63,207,177,0.45);margin-bottom:6px;">
                            ⏱&nbsp; Expires in
                          </p>
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;font-weight:500;color:rgba(238,238,245,0.65);">
                            24 hours
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding-left:8px;vertical-align:top;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#08080f;border:1px solid rgba(255,255,255,0.05);border-left:2px solid rgba(63,207,177,0.35);border-radius:10px;padding:16px 18px;">
                          <p style="font-family:'Syne',Georgia,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(63,207,177,0.45);margin-bottom:6px;">
                            🔒&nbsp; Security
                          </p>
                          <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:15px;font-weight:500;color:rgba(238,238,245,0.65);">
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
            <td class="footer-pad" style="padding:24px 48px 36px;border-top:1px solid rgba(255,255,255,0.04);">
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:12px;color:rgba(255,255,255,0.16);line-height:1.75;text-align:center;margin-bottom:10px;">
                If you didn't create a Collectra account, you can safely ignore this email —
                no account has been activated and nothing has changed.
              </p>
              <p style="font-family:'DM Sans',Georgia,sans-serif;font-size:11px;color:rgba(255,255,255,0.09);text-align:center;letter-spacing:0.04em;">
                © 2026 Collectra &nbsp;·&nbsp; Made with ♥
              </p>
            </td>
          </tr>

        </table>
        <!-- /card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;

