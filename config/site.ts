/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Edit this one file to update company details everywhere on the
 *  website (header, footer, contact page, WhatsApp, SEO).
 *
 *  Values written as "[LIKE THIS]" are treated as "not configured yet":
 *  the site hides or disables whatever depends on them instead of
 *  showing a broken link.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "IMENA EVENT PRODUCTION",
  tagline: "Plan It. Produce It. Experience It.",
  title: "IMENA EVENT PRODUCTION | Event Planning & Audio-Visual Services in Rwanda",
  description:
    "IMENA EVENT PRODUCTION provides professional event planning, sound systems, lighting, LED screens, videography, live streaming, and event production services in Kigali, Rwanda.",
  summary: "Professional Event Planning, Management & Audio-Visual Production in Kigali, Rwanda.",
  serviceHighlights: ["Sound", "Lighting", "LED Screens", "Videography", "Live Streaming"],

  /** Public URL of the site: NEXT_PUBLIC_SITE_URL if set, otherwise Netlify's built-in `URL` (set at build time). */
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000",

  /**
   * Logo files (generated from the original logo, background removed):
   * - `full`   — complete logo (emblem + IMENA + EVENT PRODUCTION)
   * - `emblem` — the emblem only, used in the compact header lockup
   * The untouched original is kept at /public/images/hero/imena-logo.jpeg.
   */
  logo: {
    full: { src: "/images/brand/imena-logo.png", width: 870, height: 685 },
    emblem: { src: "/images/brand/imena-emblem.png", width: 870, height: 489 },
  },

  contact: {
    phone: "+250 783 229 795",
    /**
     * WhatsApp number. Set to "" to hide every WhatsApp button if this
     * number is not registered on WhatsApp.
     */
    whatsapp: "+250 783 229 795",
    email: "imenaeventproductionltd@gmail.com",
    location: "Kigali, Rwanda",
  },

  /** Default message when someone taps a WhatsApp button. */
  whatsappMessage: "Hello IMENA EVENT PRODUCTION, I would like to discuss an upcoming event.",

  /**
   * Social profiles. Replace the "[...]" values with the full profile URLs
   * (e.g. "https://www.instagram.com/your_handle/"). Until then the icons
   * are shown but not linked.
   */
  social: {
    instagram: { label: "Instagram", handle: "Imena Event Production", url: "[INSTAGRAM_URL]" },
    tiktok: { label: "TikTok", handle: "Imena Event Production", url: "[TIKTOK_URL]" },
  },

  /** Image used when pages are shared on WhatsApp, Facebook, etc. */
  ogImage: "/images/og-image.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
export type SocialNetworkKey = keyof SiteConfig["social"];
