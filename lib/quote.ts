import { EVENT_TYPES, SERVICE_OPTIONS, type QuoteRequest } from "@/types";

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

export const emptyQuote: QuoteRequest = {
  fullName: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  service: "",
  message: "",
  contactViaWhatsApp: true,
};

/** Shared by the form (instant feedback) and the API route (server check). */
export function validateQuote(data: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};

  if (data.fullName.trim().length < 2) errors.fullName = "Enter your full name.";

  if (data.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a phone or WhatsApp number we can reach you on.";

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email address, or leave this empty.";

  if (!EVENT_TYPES.includes(data.eventType as (typeof EVENT_TYPES)[number]))
    errors.eventType = "Choose the type of event.";

  if (!data.eventDate) {
    errors.eventDate = "Choose the date of your event.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${data.eventDate}T12:00:00`) < today)
      errors.eventDate = "Choose a date from today onwards.";
  }

  if (data.location.trim().length < 2) errors.location = "Tell us where the event will take place.";

  if (data.guests && (!/^\d+$/.test(data.guests) || Number(data.guests) < 1))
    errors.guests = "Enter an approximate number, e.g. 150.";

  if (data.service && !SERVICE_OPTIONS.includes(data.service as (typeof SERVICE_OPTIONS)[number]))
    errors.service = "Choose one of the listed options.";

  if (data.message.length > 2000) errors.message = "Keep your message under 2,000 characters.";

  return errors;
}

/** Summary text used for the optional WhatsApp follow-up message. */
export function quoteToWhatsAppMessage(q: QuoteRequest): string {
  const lines = [
    "Hello, I just sent a quote request on your website.",
    `Name: ${q.fullName}`,
    `Event: ${q.eventType}${q.eventDate ? ` on ${q.eventDate}` : ""}`,
    `Venue: ${q.location}`,
  ];
  if (q.guests) lines.push(`Guests: about ${q.guests}`);
  if (q.service) lines.push(`Service: ${q.service}`);
  return lines.join("\n");
}
