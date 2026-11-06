import { siteConfig, type SocialNetworkKey } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

/** True when a real WhatsApp number is configured in config/site.ts. */
export const hasWhatsApp = !isPlaceholder(siteConfig.contact.whatsapp);

/** WhatsApp chat link with a pre-filled message. Only use when `hasWhatsApp`. */
export function whatsappUrl(message: string = siteConfig.whatsappMessage): string {
  return `https://wa.me/${digitsOnly(siteConfig.contact.whatsapp)}?text=${encodeURIComponent(message)}`;
}

export function phoneUrl(): string {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
}

export function emailUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ""}`;
}

/** Opens a pre-filled Gmail compose window (works without a desktop mail app). */
export function gmailComposeUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: siteConfig.contact.email });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** The profile URL, or null while it is still a "[PLACEHOLDER]". */
export function socialUrl(network: SocialNetworkKey): string | null {
  const { url } = siteConfig.social[network];
  return isPlaceholder(url) ? null : url;
}
