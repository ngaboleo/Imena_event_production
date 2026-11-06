import { siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/**
 * Builds a WhatsApp link. Works as soon as a real number is set in
 * config/site.ts. Until then it opens WhatsApp without a recipient,
 * so the button never breaks.
 */
export function whatsappUrl(message: string = siteConfig.whatsappMessage): string {
  const number = isPlaceholder(siteConfig.contact.whatsapp)
    ? ""
    : digitsOnly(siteConfig.contact.whatsapp);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function phoneUrl(): string {
  const { phone } = siteConfig.contact;
  return isPlaceholder(phone) ? "#" : `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function emailUrl(subject?: string): string {
  const { email } = siteConfig.contact;
  if (isPlaceholder(email)) return "#";
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

export function socialUrl(url: string): string {
  return isPlaceholder(url) ? "#" : url;
}
