/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Edit this one file to update your company details everywhere
 *  on the website (navbar, footer, contact page, WhatsApp, SEO).
 * ─────────────────────────────────────────────────────────────
 *
 *  Replace every value in [SQUARE BRACKETS] with your real details.
 *  Phone / WhatsApp numbers: use international format, e.g. "+250 788 000 000".
 */

export const siteConfig = {
  name: "IMENA EVENT PRODUCTION",
  description:
    "Professional sound systems for weddings, corporate events, conferences, private parties and outdoor events. Reliable equipment, professional setup and event support.",

  /** Public URL of the site. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * [LOGO] — put your logo file in /public/images/ and set its path here,
   * e.g. "/images/logo.svg". Leave empty to show the text wordmark.
   * `lightSrc` is an optional white version used on dark backgrounds.
   */
  logo: {
    src: "/images/hero/Logo.jpeg",
    lightSrc: "",
    width: 160,
    height: 48,
  },

  contact: {
    phone: "[PHONE]",
    whatsapp: "[WHATSAPP]",
    email: "[EMAIL]",
    address: "[ADDRESS]",
    /** Optional Google Maps link for the address. */
    mapUrl: "",
    hours: [
      { days: "Monday – Friday", time: "[OPENING HOURS]" },
      { days: "Saturday", time: "[OPENING HOURS]" },
      { days: "Sunday", time: "Event days only" },
    ],
  },

  /** Default message when someone taps a WhatsApp button. */
  whatsappMessage:
    "Hello, I would like to request information about sound services for my event.",

  social: {
    instagram: "[INSTAGRAM]",
    facebook: "[FACEBOOK]",
    tiktok: "[TIKTOK]",
    youtube: "[YOUTUBE]",
  },

  /** Image used when pages are shared on WhatsApp, Facebook, etc. */
  ogImage: "/images/og-image.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
