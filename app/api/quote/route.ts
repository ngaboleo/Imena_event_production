import { NextResponse } from "next/server";
import { validateQuote } from "@/lib/quote";
import type { QuoteRequest } from "@/types";

/**
 * Receives quotation requests from the contact form.
 *
 * Right now it validates the request and logs it (visible in Vercel → Logs).
 * To receive requests by email, connect an email service here, e.g. Resend:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ from, to, subject, text });
 *
 * Later this is also where requests can be saved to a database for the
 * planned admin dashboard / CRM.
 */
export async function POST(request: Request) {
  let body: Partial<QuoteRequest> & { company_website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (body.company_website) return NextResponse.json({ ok: true });

  const quote: QuoteRequest = {
    fullName: String(body.fullName ?? "").slice(0, 200),
    phone: String(body.phone ?? "").slice(0, 50),
    email: String(body.email ?? "").slice(0, 200),
    eventType: (body.eventType ?? "") as QuoteRequest["eventType"],
    eventDate: String(body.eventDate ?? "").slice(0, 10),
    location: String(body.location ?? "").slice(0, 300),
    guests: String(body.guests ?? "").slice(0, 10),
    service: (body.service ?? "") as QuoteRequest["service"],
    message: String(body.message ?? "").slice(0, 2000),
    contactViaWhatsApp: Boolean(body.contactViaWhatsApp),
  };

  const errors = validateQuote(quote);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  console.info("[quote-request]", JSON.stringify({ ...quote, receivedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
