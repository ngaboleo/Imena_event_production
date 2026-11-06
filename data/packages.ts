import type { ServicePackage } from "@/types";

/** Sample package structures. No prices are shown — every event is quoted. */
export const packages: ServicePackage[] = [
  {
    id: "essential",
    name: "Essential",
    summary: "Suitable for smaller events.",
    features: ["Sound system", "Microphone", "Basic setup", "Technical setup"],
  },
  {
    id: "standard",
    name: "Standard",
    summary: "Suitable for medium-size weddings and events.",
    features: [
      "Enhanced sound setup",
      "Multiple microphones",
      "Additional speakers where required",
      "Technical setup",
      "Event support",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    summary: "Suitable for larger or more demanding events.",
    features: [
      "Customised audio setup",
      "Expanded speaker system",
      "Multiple microphones",
      "Professional setup",
      "Technical support",
      "Customised requirements",
    ],
  },
];

export const PRICING_NOTE =
  "Pricing depends on event size, venue, equipment and technical requirements.";
