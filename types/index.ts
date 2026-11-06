import type { LucideIcon } from "lucide-react";

export interface ImageAsset {
  src: string;
  alt: string;
  /** Attribution for licensed placeholder photos (shown small on the image). Omit for your own photos. */
  credit?: { text: string; href: string };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  /** One-line summary used on compact cards (home page). */
  summary: string;
  description: string;
  icon: LucideIcon;
  /** Optional illustrative photo. Cards without one show an icon panel. */
  image?: ImageAsset;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type EventAudience = "Private" | "Corporate" | "Community";

export interface EventCategory {
  title: string;
  icon: LucideIcon;
  audience: EventAudience[];
}

export type ProcessStep = Feature;

export type GalleryCategory =
  | "corporate"
  | "conferences"
  | "weddings"
  | "concerts"
  | "roadshows"
  | "live-productions";

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  /** Image path, or the .mp4 path for videos (both in /public). */
  src: string;
  /** Still image shown before a video plays. Recommended for videos. */
  poster?: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  orientation?: "landscape" | "portrait" | "square";
  /** Optional, ISO format: "2026-05-14" */
  date?: string;
}

/* ── Event inquiry form ─────────────────────────────────────── */

export const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Conference / Seminar",
  "Graduation",
  "Roadshow",
  "Concert / Live Performance",
  "Product Launch",
  "Church / Community Event",
  "Private Celebration",
  "Awards / Ceremony",
  "Brand Activation",
  "Other",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const SERVICE_OPTIONS = [
  "Event Planning & Management",
  "Audio-Visual Production",
  "Sound Systems",
  "Lighting",
  "LED Screens",
  "Videography",
  "Live Streaming",
  "Full Event Production",
  "Not sure yet",
] as const;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface InquiryRequest {
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType | "";
  eventDate: string;
  location: string;
  guests: string;
  services: ServiceOption[];
  budget: string;
  contactViaWhatsApp: boolean;
}
