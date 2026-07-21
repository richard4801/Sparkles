import "server-only";
import { Resend } from "resend";
import { formatNaira } from "@/lib/utils";

/** Email is "live" when a Resend key is present. Without it, messages are logged
 *  to the server console instead of sent — so nothing breaks before you add a key. */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress(): string {
  // Set EMAIL_FROM to an address on your verified Resend domain in production.
  return process.env.EMAIL_FROM || "Sparklyn <onboarding@resend.dev>";
}

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

function shell(title: string, bodyHtml: string): string {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f4f8;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #ece9f3">
    <div style="background:#5b3df5;padding:20px 28px">
      <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:-0.02em">✦ Sparklyn</span>
    </div>
    <div style="padding:28px">
      <h1 style="margin:0 0 12px;font-size:20px;color:#1a1524">${title}</h1>
      ${bodyHtml}
    </div>
    <div style="padding:18px 28px;border-top:1px solid #ece9f3;color:#8b8698;font-size:12px">
      Sparklyn · Lagos, Nigeria · The academic marketplace for Nigerian students.
    </div>
  </div>
</div>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#5b3df5;color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px;margin:8px 0">${label}</a>`;

/** Low-level send. Never throws — returns whether it was actually sent. */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!emailConfigured()) {
    console.log(`[email:skipped] to=${opts.to} subject="${opts.subject}" (no RESEND_API_KEY)`);
    return false;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return true;
  } catch (e) {
    console.error("[email:error]", e);
    return false;
  }
}

export async function sendReceiptEmail(params: {
  to: string;
  orderId: string;
  items: { title: string; priceNaira: number }[];
  totalNaira: number;
  method: string;
}): Promise<boolean> {
  const rows = params.items
    .map(
      (it) =>
        `<tr><td style="padding:6px 0;color:#4a4557">${it.title}</td><td style="padding:6px 0;text-align:right;color:#1a1524;font-weight:600">${formatNaira(it.priceNaira)}</td></tr>`,
    )
    .join("");
  const html = shell(
    "Payment successful 🎉",
    `<p style="color:#4a4557;line-height:1.6">Thanks for your purchase. Order <strong>${params.orderId}</strong> is complete and your resources are ready in your dashboard.</p>
     <table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}
       <tr><td style="padding:10px 0;border-top:1px solid #ece9f3;font-weight:700">Total paid</td><td style="padding:10px 0;border-top:1px solid #ece9f3;text-align:right;font-weight:800">${formatNaira(params.totalNaira)}</td></tr>
     </table>
     <p style="color:#8b8698;font-size:13px">Paid with ${params.method}.</p>
     ${btn(`${siteUrl()}/dashboard/purchases`, "Go to my purchases")}`,
  );
  return sendEmail({ to: params.to, subject: `Your Sparklyn receipt — ${params.orderId}`, html });
}

export async function sendPasswordResetEmail(to: string, url: string): Promise<boolean> {
  const html = shell(
    "Reset your password",
    `<p style="color:#4a4557;line-height:1.6">We received a request to reset your Sparklyn password. This link expires in 1 hour. If you didn't ask for this, you can ignore this email.</p>
     ${btn(url, "Reset password")}
     <p style="color:#8b8698;font-size:12px;margin-top:12px;word-break:break-all">Or paste this link: ${url}</p>`,
  );
  return sendEmail({ to, subject: "Reset your Sparklyn password", html });
}

export async function sendVerificationEmail(to: string, url: string): Promise<boolean> {
  const html = shell(
    "Confirm your email",
    `<p style="color:#4a4557;line-height:1.6">Welcome to Sparklyn! Confirm your email address to secure your account.</p>
     ${btn(url, "Verify email")}
     <p style="color:#8b8698;font-size:12px;margin-top:12px;word-break:break-all">Or paste this link: ${url}</p>`,
  );
  return sendEmail({ to, subject: "Confirm your Sparklyn email", html });
}
