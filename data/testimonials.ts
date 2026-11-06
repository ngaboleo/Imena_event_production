import type { Testimonial } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  TESTIMONIALS — PLACEHOLDERS ONLY
 *  Replace these with real reviews (with the customer's permission).
 *  When you replace one, set isPlaceholder to false (or remove it).
 *  `photo` is optional — initials are shown if it's missing.
 * ─────────────────────────────────────────────────────────────
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "[Customer Name]",
    eventType: "Wedding",
    quote:
      "[Placeholder review] Replace this text with a real review from a wedding customer — for example, what they valued about the setup, the sound during speeches, or the team on the day.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "[Customer Name]",
    eventType: "Corporate Event",
    quote:
      "[Placeholder review] Replace this text with a real review from a corporate client, such as an event coordinator or communications manager.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "[Customer Name]",
    eventType: "Private Party",
    quote:
      "[Placeholder review] Replace this text with a real review from a private event customer — a birthday, anniversary or family celebration.",
    rating: 5,
    isPlaceholder: true,
  },
];
