import {
  Armchair,
  Briefcase,
  Camera,
  ClipboardList,
  Disc3,
  Drama,
  Flower2,
  Heart,
  Lightbulb,
  PartyPopper,
  Presentation,
  Sparkles,
  Speaker,
  Tent,
  Trees,
  UtensilsCrossed,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES
 *  To add a service: copy one object, give it a unique `slug`,
 *  and it appears automatically on the home page, services page,
 *  footer, sitemap and gets its own page at /services/<slug>.
 *
 *  Set status: "planned" for services you don't offer yet — they
 *  are shown only as "coming later", never as bookable.
 *  When you launch one, change it to "available" and add an image.
 * ─────────────────────────────────────────────────────────────
 */
export const services: Service[] = [
  {
    slug: "wedding-sound-systems",
    title: "Wedding Sound Systems",
    footerLabel: "Wedding Sound",
    shortDescription:
      "Professional audio solutions for wedding ceremonies, receptions and celebrations.",
    description:
      "Your vows, speeches and first dance deserve to be heard clearly by every guest. We plan the sound for each part of the day — ceremony, speeches and reception — and set everything up before guests arrive, so the couple and family can focus on the celebration.",
    icon: Heart,
    status: "available",
    category: "sound",
    image: { src: "/images/services/Wedd sound.jpg", alt: "Sound system set up at a wedding reception" },
    features: [
      "Clear microphones for vows, speeches and the MC",
      "Speakers positioned for ceremony and reception areas",
      "Background music playback between programme moments",
      "Setup and sound check before guests arrive",
      "Technical support available during the event",
    ],
    idealFor: ["Church and garden ceremonies", "Receptions", "Traditional ceremonies", "Engagement parties"],
    quoteEventType: "Wedding",
  },
  {
    slug: "corporate-event-sound",
    title: "Corporate Event Sound",
    footerLabel: "Corporate Events",
    shortDescription:
      "Professional audio systems for company meetings, presentations, launches and corporate events.",
    description:
      "When your organisation is speaking to staff, partners or the public, the audio has to be dependable. We provide clean, well-balanced sound for presentations, product launches, award ceremonies and company celebrations, and we work to your programme and timings.",
    icon: Briefcase,
    status: "available",
    category: "sound",
    image: { src: "/images/services/Corporate event.jpg", alt: "Audio setup for a corporate event" },
    features: [
      "Lectern and wireless microphones for speakers",
      "Audio connection for laptops and presentations",
      "Background music for arrivals and breaks",
      "Setup completed before your programme starts",
      "Technician available for the event",
    ],
    idealFor: ["Product launches", "Award ceremonies", "Staff events", "End-of-year functions"],
    quoteEventType: "Corporate Event",
  },
  {
    slug: "conference-meeting-audio",
    title: "Conference & Meeting Audio",
    footerLabel: "Conference Audio",
    shortDescription:
      "Clear microphone and speaker systems designed for speeches, meetings and presentations.",
    description:
      "In a conference, every word matters. We set up microphones and speakers so that speakers, panels and questions from the floor are heard clearly across the room, without feedback or dead spots.",
    icon: Presentation,
    status: "available",
    category: "sound",
    image: { src: "/images/services/Hybrid-Meeting-Audio-System.png", alt: "Microphones and speakers in a conference room" },
    features: [
      "Lectern, handheld and lapel microphones",
      "Microphones for panel discussions",
      "Audience microphones for questions",
      "Speaker placement for even coverage of the room",
      "Sound check with speakers before the session",
    ],
    idealFor: ["Conferences", "Workshops", "Board and general meetings", "Panel discussions"],
    quoteEventType: "Conference",
  },
  {
    slug: "private-events",
    title: "Private Events",
    footerLabel: "Private Events",
    shortDescription:
      "Reliable sound systems for birthdays, family celebrations and private gatherings.",
    description:
      "From a birthday dinner to a large family celebration, we provide a sound setup sized to your space and guest list — good for music, speeches and announcements, without overwhelming the room.",
    icon: PartyPopper,
    status: "available",
    category: "sound",
    image: { src: "/images/services/sound for private event.jpeg", alt: "Sound system at a private celebration" },
    features: [
      "Speakers sized to your venue and guest count",
      "Microphone for speeches and announcements",
      "Music playback from your phone or playlist",
      "Setup and pack-down handled by our team",
    ],
    idealFor: ["Birthdays", "Anniversaries", "Graduations", "Family gatherings"],
    quoteEventType: "Private Party",
  },
  {
    slug: "outdoor-events",
    title: "Outdoor Events",
    footerLabel: "Outdoor Events",
    shortDescription: "Audio solutions suitable for outdoor gatherings and larger audiences.",
    description:
      "Sound behaves differently outdoors. We plan speaker positions and power for open spaces so that your audience hears clearly from the front to the back, whether it is a garden party or a large public gathering.",
    icon: Trees,
    status: "available",
    category: "sound",
    image: { src: "/images/services/outdoor sound system.jpeg", alt: "Outdoor event with a professional sound system" },
    features: [
      "Speaker systems for open spaces and larger crowds",
      "Subwoofers for music and entertainment",
      "Wireless microphones with outdoor range",
      "Planning for power and cable routing",
      "Technical support throughout the event",
    ],
    idealFor: ["Garden parties", "Community events", "Festivals", "Sports and school events"],
    quoteEventType: "Outdoor Event",
  },
  {
    slug: "audio-equipment",
    title: "Audio Equipment",
    footerLabel: "Audio Equipment",
    shortDescription:
      "Professional speakers, mixers, microphones, subwoofers and related equipment.",
    description:
      "Need specific equipment for your event? We supply professional speakers, subwoofers, microphones, mixers and accessories, with setup by our team so that everything is connected and tested before you begin.",
    icon: Speaker,
    status: "available",
    category: "sound",
    image: { src: "/images/services/auditorium sound system.jpg", alt: "Professional audio equipment ready for an event" },
    features: [
      "Professional speakers and subwoofers",
      "Wired and wireless microphones",
      "Audio mixers",
      "Speaker stands, cables and accessories",
      "Delivery, setup and testing",
    ],
    idealFor: ["Venues needing extra equipment", "Event organisers", "Churches and schools", "Live performances"],
    quoteEventType: "Other",
  },

  /* ── Future services (not bookable yet) ────────────────────── */
  { slug: "event-planning", title: "Event Planning", shortDescription: "Help planning and coordinating your event from start to finish.", description: "", icon: ClipboardList, status: "planned", category: "planning" },
  { slug: "decoration", title: "Decoration", shortDescription: "Decor for ceremonies, receptions and corporate spaces.", description: "", icon: Flower2, status: "planned", category: "decor" },
  { slug: "lighting", title: "Lighting", shortDescription: "Event and stage lighting.", description: "", icon: Lightbulb, status: "planned", category: "lighting" },
  { slug: "dj-services", title: "DJ Services", shortDescription: "Music programming for receptions and parties.", description: "", icon: Disc3, status: "planned", category: "entertainment" },
  { slug: "tents", title: "Tents", shortDescription: "Tents for outdoor events.", description: "", icon: Tent, status: "planned", category: "rentals" },
  { slug: "chairs-and-tables", title: "Chairs & Tables", shortDescription: "Seating and table rentals.", description: "", icon: Armchair, status: "planned", category: "rentals" },
  { slug: "photography-videography", title: "Photography & Video", shortDescription: "Photo and video coverage of your event.", description: "", icon: Camera, status: "planned", category: "media" },
  { slug: "stage-setup", title: "Stage Setup", shortDescription: "Stages and platforms for speakers and performers.", description: "", icon: Sparkles, status: "planned", category: "rentals" },
  { slug: "entertainment", title: "Entertainment", shortDescription: "Performers and entertainment for your guests.", description: "", icon: Drama, status: "planned", category: "entertainment" },
  { slug: "catering", title: "Catering", shortDescription: "Food and drinks for your event.", description: "", icon: UtensilsCrossed, status: "planned", category: "catering" },
];

export const availableServices = services.filter((s) => s.status === "available");
export const plannedServices = services.filter((s) => s.status === "planned");

export function getServiceBySlug(slug: string): Service | undefined {
  return availableServices.find((s) => s.slug === slug);
}
