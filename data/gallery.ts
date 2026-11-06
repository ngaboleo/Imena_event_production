import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "corporate", label: "Corporate Events" },
  { id: "conferences", label: "Conferences" },
  { id: "weddings", label: "Weddings" },
  { id: "concerts", label: "Concerts" },
  { id: "roadshows", label: "Roadshows" },
  { id: "live-productions", label: "Live Productions" },
];

export const galleryCategoryLabel: Record<GalleryCategory, string> = {
  corporate: "Corporate Event",
  conferences: "Conference",
  weddings: "Wedding",
  concerts: "Concert",
  roadshows: "Roadshow",
  "live-productions": "Live Production",
};

/**
 * ─────────────────────────────────────────────────────────────
 *  OUR WORK — PHOTOS & VIDEOS
 *
 *  Add a photo:
 *    1. Put the file in /public/images/gallery/  (e.g. wedding-kigali.jpg)
 *    2. Add an entry: { id, type: "image", src, alt, caption, category }
 *
 *  Add a video:
 *    1. Put the .mp4 in /public/videos/ and a still frame (.jpg) next to it
 *    2. Add an entry: { id, type: "video", src, poster, alt, caption, category }
 *       Keep videos short and compressed (ideally under ~10 MB).
 *
 *  The first entries are also shown on the home page.
 *  Only add real IMENA work, and only name clients with their permission.
 * ─────────────────────────────────────────────────────────────
 */
export const gallery: GalleryItem[] = [
  {
    id: "conference-production",
    type: "image",
    src: "/images/hero/imena-homepage-background.jpeg",
    alt: "Conference hall with LED screens, stage lighting and front-of-house mixing consoles",
    caption: "Conference production: LED screens, lighting and sound",
    category: "conferences",
  },
  {
    id: "lighting-video",
    type: "video",
    src: "/videos/imena-lighting.mp4",
    poster: "/videos/imena-lighting-poster.jpg",
    alt: "Close-up video of LED lighting fixtures in operation",
    caption: "LED lighting fixtures in action",
    category: "live-productions",
    orientation: "portrait",
  },
  {
    id: "conference-room",
    type: "image",
    src: "/images/gallery/imena-conference-room.jpg",
    alt: "Meeting room arranged with delegate microphones, a lectern and a display screen",
    caption: "Meeting room setup with delegate microphones",
    category: "conferences",
    orientation: "square",
  },
  {
    id: "mixing-console",
    type: "image",
    src: "/images/gallery/imena-mixing-console.jpg",
    alt: "Digital mixing console set up for an event",
    caption: "Front-of-house mixing console",
    category: "live-productions",
  },
  {
    id: "line-array",
    type: "image",
    src: "/images/gallery/imena-line-array.jpg",
    alt: "Line-array speakers stacked on subwoofers, prepared for an event",
    caption: "Line-array sound system ready for deployment",
    category: "live-productions",
    orientation: "portrait",
  },
];
