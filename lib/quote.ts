import { siteConfig } from "@/config/site";
import { EVENT_TYPES, SERVICE_OPTIONS, type InquiryRequest, type ServiceOption } from "@/types";

export type InquiryErrors = Partial<Record<keyof InquiryRequest, string>>;

export const emptyInquiry: InquiryRequest = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  services: [],
  budget: "",
  contactViaWhatsApp: false,
};

export const isServiceOption = (value: unknown): value is ServiceOption =>
  SERVICE_OPTIONS.includes(value as ServiceOption);

/**
 * Shared by the form (instant feedback) and the API route (server check).
 * Every field is optional. For online submission we need an email address or
 * a phone number to reply (Gmail/WhatsApp already identify the sender).
 * Anything that is filled in must be valid.
 */
export function validateInquiry(data: InquiryRequest, { requireContact = true } = {}): InquiryErrors {
  const errors: InquiryErrors = {};
  const email = data.email.trim();
  const phone = data.phone.trim();

  if (requireContact && !email && !phone) {
    errors.email = "Add an email address or a phone number so we can reply.";
  } else {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (phone && phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a phone number we can reach you on.";
  }

  if (data.eventType && !EVENT_TYPES.includes(data.eventType as (typeof EVENT_TYPES)[number]))
    errors.eventType = "Choose the type of event from the list.";

  if (data.eventDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.eventDate)) {
      errors.eventDate = "Enter a valid date.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${data.eventDate}T12:00:00`) < today) errors.eventDate = "Choose a date from today onwards.";
    }
  }

  if (data.guests && (!/^\d+$/.test(data.guests) || Number(data.guests) < 1))
    errors.guests = "Enter an approximate number, e.g. 150.";

  if (!data.services.every(isServiceOption)) errors.services = "Choose from the listed services.";

  if (data.budget.length > 100) errors.budget = "Keep the budget range short.";

  return errors;
}

/** Plain-text summary used for emails, the email fallback and WhatsApp. Empty fields are left out. */
export function inquiryToText(q: InquiryRequest): string {
  const rows: [string, string][] = [
    ["Name", q.fullName],
    ["Email", q.email],
    ["Phone", q.phone],
    ["Event type", q.eventType],
    ["Event date", q.eventDate],
    ["Location", q.location],
    ["Expected guests", q.guests],
    ["Services", q.services.join(", ")],
    ["Budget range", q.budget],
  ];
  const lines = rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`);
  lines.push(`Prefers WhatsApp: ${q.contactViaWhatsApp ? "Yes" : "No"}`);
  return lines.join("\n");
}

export function inquirySubject(q: InquiryRequest): string {
  const who = q.fullName.trim() || q.email.trim() || q.phone.trim();
  return `Event inquiry: ${q.eventType || "Event"}${q.eventDate ? ` on ${q.eventDate}` : ""}${who ? ` (${who})` : ""}`;
}

export function inquiryToWhatsApp(q: InquiryRequest): string {
  return `Hello ${siteConfig.name}, I'd like to discuss an event.\n\n${inquiryToText(q)}`;
}
