import { siteConfig } from "@/config/site";

/**
 * Shared by /api/contact and /api/feedback: per-IP rate limit, HTML escaping
 * and delivery through Resend's REST API (https://resend.com) - no SDK needed.
 *
 * Env on Vercel: RESEND_API_KEY (required to send), CONTACT_FROM_EMAIL
 * (optional verified sender; without it Resend's test sender is used, which
 * can only deliver to the inbox that owns the Resend account).
 */

// shortcut: per-instance memory, so the limit is best-effort across Vercel instances; add a Vercel WAF rate-limit rule for a hard cap.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

export function rateLimited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  if (hits.size > 10_000) hits.clear(); // bound memory: IPs that never return are otherwise kept forever
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends one email. Returns a Response for the route to return directly. */
export async function sendEmail(
  tag: string,
  mail: { to: string; subject: string; text: string; html: string; replyTo?: string }
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "not_configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`,
      to: [mail.to],
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error(`[${tag}] email delivery failed`, res?.status, res ? await res.text().catch(() => "") : "network");
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
