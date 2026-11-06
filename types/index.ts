import type { LucideIcon } from "lucide-react";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/**
 * "available" services are promoted across the site.
 * "planned" services are future expansion and are only shown as upcoming.
 */
export type ServiceStatus = "available" | "planned";

export type ServiceCategory =
  | "sound"
  | "planning"
  | "decor"
  | "lighting"
  | "entertainment"
  | "rentals"
  | "media"
  | "catering";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  status: ServiceStatus;
  category: ServiceCategory;
  image?: ImageAsset;
  features?: string[];
  idealFor?: string[];
  /** Pre-selected event type in the quote form when coming from this service. */
  quoteEventType?: EventType;
  /** Title shown in the footer's service list (shorter version). */
  footerLabel?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  image: ImageAsset;
}

export type GalleryCategory = "weddings" | "corporate" | "private" | "outdoor";

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  title: string;
  category: GalleryCategory;
  location: string;
  /** Optional, ISO format: "2026-05-14" */
  date?: string;
  /** Image proportions help the gallery layout; defaults to landscape. */
  orientation?: "landscape" | "portrait";
}

export interface Testimonial {
  id: string;
  name: string;
  /** Optional path in /public, e.g. "/images/testimonials/jane.jpg" */
  photo?: string;
  eventType: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Keep true until replaced with a real, approved customer review. */
  isPlaceholder?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  summary: string;
  features: string[];
  highlighted?: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Conference",
  "Private Party",
  "Outdoor Event",
  "Other",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const SERVICE_OPTIONS = [
  "Sound System",
  "Microphones",
  "Full Audio Setup",
  "Other",
] as const;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface QuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  eventType: EventType | "";
  eventDate: string;
  location: string;
  guests: string;
  service: ServiceOption | "";
  message: string;
  contactViaWhatsApp: boolean;
}
