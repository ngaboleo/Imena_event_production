import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { inquirySubject, inquiryToText, isServiceOption, validateInquiry } from "@/lib/quote";
import { env } from "@/lib/delivery";
import type { InquiryRequest } from "@/types";

/**
 * Receives event inquiries from the contact form.
 *
 * Delivery is configured with server-side environment variables (never
 * exposed to the browser). Set ONE of these options in Vercel → Settings →
 * Environment Variables (or in .env.local for local testing):
 *
 *  A) Email via Resend (https://resend.com):
 *       RESEND_API_KEY      = re_...
 *       INQUIRY_TO_EMAIL    = optional, defaults to the email in config/site.ts
 *       INQUIRY_FROM_EMAIL  = optional, an address on a domain verified in Resend.
 *                             Left empty, Resend's test sender is used, which only
 *                             delivers to the email the Resend account belongs to.
 *
 *  B) Any webhook / form service that accepts JSON (Formspree, Make, Zapier…):
 *       INQUIRY_WEBHOOK_URL = https://...
 *
 * If nothing is configured the route answers 503 and the form tells the
 * visitor to contact the team directly — it never pretends to have sent.
 */

const MIN_FILL_MS = 3000;

type DeliveryResult = { status: "sent" | "not-configured" | "failed"; detail?: string };

async function deliver(inquiry: InquiryRequest): Promise<DeliveryResult> {
  const resendKey = env("RESEND_API_KEY");
  const webhookUrl = env("INQUIRY_WEBHOOK_URL");
  const subject = inquirySubject(inquiry);
  const text = `New event inquiry from the ${siteConfig.name} website.\n\n${inquiryToText(inquiry)}`;
  const replyTo = inquiry.email.trim() || undefined;
  const problems: string[] = [];
  let attempted = false;
  let delivered = false;

  if (resendKey) {
    attempted = true;
    // Without a domain verified in Resend, only Resend's test sender works, and it
    // only delivers to the email address the Resend account was created with.
    const to = (env("INQUIRY_TO_EMAIL") || siteConfig.contact.email).split(",").map((s) => s.trim());
    const from = env("INQUIRY_FROM_EMAIL") || `${siteConfig.name} Website <onboarding@resend.dev>`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
      });
      if (res.ok) delivered = true;
      else {
        const body = await res.text().catch(() => "");
        problems.push(`Resend ${res.status}: ${body}`);
        console.error(`[inquiry] Resend rejected the email (from: ${from}, to: ${to.join(", ")})`, res.status, body);
      }
    } catch (error) {
      problems.push(`Resend request failed: ${String(error)}`);
      console.error("[inquiry] Resend request failed", error);
    }
  }

  if (webhookUrl) {
    attempted = true;
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject,
          ...inquiry,
          services: inquiry.services.join(", "),
          ...(replyTo ? { _replyto: replyTo } : {}),
        }),
      });
      if (res.ok) delivered = true;
      else {
        const body = await res.text().catch(() => "");
        problems.push(`Webhook ${res.status}: ${body.slice(0, 500)}`);
        console.error("[inquiry] Webhook error", res.status, body.slice(0, 500));
      }
    } catch (error) {
      problems.push(`Webhook request failed: ${String(error)}`);
      console.error("[inquiry] Webhook request failed", error);
    }
  }

  if (!attempted) {
    console.warn("[inquiry] Not delivered: set RESEND_API_KEY or INQUIRY_WEBHOOK_URL (see .env.example).");
    return { status: "not-configured" };
  }
  return delivered ? { status: "sent" } : { status: "failed", detail: problems.join(" | ") };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Spam protection: a hidden honeypot field, and a minimum time to fill the form.
  // Bots get a generic response and nothing is delivered.
  const startedAt = Number(body.startedAt);
  if (body.company_website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, message: "Your inquiry could not be accepted." }, { status: 400 });
  }

  const str = (key: string, max: number) => String(body[key] ?? "").trim().slice(0, max);
  const inquiry: InquiryRequest = {
    fullName: str("fullName", 200),
    email: str("email", 200),
    phone: str("phone", 50),
    eventType: str("eventType", 60) as InquiryRequest["eventType"],
    eventDate: str("eventDate", 10),
    location: str("location", 300),
    guests: str("guests", 10),
    services: Array.isArray(body.services) ? body.services.filter(isServiceOption).slice(0, 12) : [],
    budget: str("budget", 100),
    contactViaWhatsApp: Boolean(body.contactViaWhatsApp),
  };

  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await deliver(inquiry);
  if (result.status === "sent") return NextResponse.json({ ok: true });
  if (result.status === "not-configured") {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }
  // The provider's error text helps when testing locally; it is never sent in production.
  const detail = process.env.NODE_ENV === "development" ? result.detail : undefined;
  return NextResponse.json({ ok: false, reason: "delivery-failed", detail }, { status: 502 });
}
