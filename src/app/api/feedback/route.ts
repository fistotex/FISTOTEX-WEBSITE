import { z } from "zod";
import { siteConfig } from "@/config/site";
import { escapeHtml, rateLimited, sendEmail } from "@/lib/email";

/**
 * Feedback widget endpoint. Emails feedback via Resend (see src/lib/email.ts).
 * Optional env: FEEDBACK_TO_EMAIL - inbox that receives feedback (defaults to CONTACT_EMAIL).
 *
 * Without RESEND_API_KEY this returns 503 and the widget falls back to the
 * visitor's email app, so feedback is never silently dropped.
 */

const schema = z.object({
  message: z.string().trim().min(3, "Tell us a little more").max(2000),
  email: z.union([z.literal(""), z.email("Please enter a valid email address").max(200)]).optional(),
  page: z.string().max(200).optional(),
  // Honeypot: real visitors never see or fill this field
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend success so it doesn't retry
    if ((body as { company?: string })?.company) return Response.json({ ok: true });
    return Response.json(
      { error: "validation", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 400 }
    );
  }

  if (rateLimited(request)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const { message, email, page } = parsed.data;
  return sendEmail("feedback", {
    to: process.env.FEEDBACK_TO_EMAIL || siteConfig.contactEmail,
    replyTo: email || undefined,
    subject: `[${siteConfig.name} feedback] ${page ? `on ${page}` : "site feedback"}`,
    text: `Page: ${page || "unknown"}\nFrom: ${email || "anonymous"}\n\n${message}`,
    html: `<p><strong>Page:</strong> ${escapeHtml(page || "unknown")}<br/><strong>From:</strong> ${escapeHtml(email || "anonymous")}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });
}
