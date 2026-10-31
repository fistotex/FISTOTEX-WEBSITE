import { z } from "zod";
import { siteConfig } from "@/config/site";
import { escapeHtml, rateLimited, sendEmail } from "@/lib/email";

/**
 * Contact form endpoint. Emails the message via Resend (see src/lib/email.ts).
 * Optional env: CONTACT_TO_EMAIL - inbox that receives messages (defaults to CONTACT_EMAIL).
 *
 * Without RESEND_API_KEY this returns 503 and the form falls back to the
 * visitor's email app, so a message is never silently dropped.
 */

const subjects = ["general", "feedback", "bug", "partnership", "press", "other"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Please enter a valid email address").max(200),
  subject: z.enum(subjects),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
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

  const { name, email, subject, message } = parsed.data;
  return sendEmail("contact", {
    to: process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail,
    replyTo: email,
    subject: `[${siteConfig.name} contact] ${subject} — ${name}`,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;<br/><strong>Subject:</strong> ${escapeHtml(subject)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });
}
