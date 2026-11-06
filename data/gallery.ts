import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "corporate", label: "Corporate Events" },
  { id: "private", label: "Private Events" },
  { id: "outdoor", label: "Outdoor Events" },
];

export const galleryCategoryLabel: Record<GalleryCategory, string> = {
  weddings: "Wedding",
  corporate: "Corporate Event",
  private: "Private Event",
  outdoor: "Outdoor Event",
};

/**
 * ─────────────────────────────────────────────────────────────
 *  GALLERY
 *  1. Put your photo in /public/images/gallery/
 *  2. Add an entry below. `date` is optional.
 *  The first 6 entries are also shown on the home page.
 *  The sample entries are placeholders — replace them with real events.
 * ─────────────────────────────────────────────────────────────
 */
export const gallery: GalleryItem[] = [
  { id: "g1", image: { src: "/images/gallery/wedding-1.jpg", alt: "Sample: wedding reception with sound setup" }, title: "Wedding reception (sample photo)", category: "weddings", location: "[LOCATION]", date: "2026-06-20" },
  { id: "g2", image: { src: "/images/gallery/corporate-1.jpg", alt: "Sample: corporate presentation audio" }, title: "Company conference (sample photo)", category: "corporate", location: "[LOCATION]", orientation: "portrait" },
  { id: "g3", image: { src: "/images/gallery/outdoor-1.jpg", alt: "Sample: outdoor event speakers" }, title: "Outdoor celebration (sample photo)", category: "outdoor", location: "[LOCATION]", date: "2026-04-12" },
  { id: "g4", image: { src: "/images/gallery/private-1.jpg", alt: "Sample: birthday party sound system" }, title: "Birthday celebration (sample photo)", category: "private", location: "[LOCATION]" },
  { id: "g5", image: { src: "/images/gallery/wedding-2.jpg", alt: "Sample: wedding ceremony microphones" }, title: "Garden ceremony (sample photo)", category: "weddings", location: "[LOCATION]", orientation: "portrait" },
  { id: "g6", image: { src: "/images/gallery/corporate-2.jpg", alt: "Sample: product launch sound" }, title: "Product launch (sample photo)", category: "corporate", location: "[LOCATION]", date: "2026-03-05" },
  { id: "g7", image: { src: "/images/gallery/wedding-3.jpg", alt: "Sample: wedding speeches" }, title: "Wedding speeches (sample photo)", category: "weddings", location: "[LOCATION]" },
  { id: "g8", image: { src: "/images/gallery/outdoor-2.jpg", alt: "Sample: community outdoor event" }, title: "Community gathering (sample photo)", category: "outdoor", location: "[LOCATION]", orientation: "portrait" },
  { id: "g9", image: { src: "/images/gallery/private-2.jpg", alt: "Sample: family celebration" }, title: "Family celebration (sample photo)", category: "private", location: "[LOCATION]" },
];
