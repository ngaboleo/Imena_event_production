import {
  AudioLines,
  Clapperboard,
  ClipboardList,
  Layers,
  Lightbulb,
  MonitorPlay,
  Radio,
  Video,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES
 *  Each service appears on the home page and on /services (where it
 *  can be linked directly as /services#<slug>).
 *  `image` is optional; replace stock photos with your own event
 *  photos as they become available.
 *
 *  TEMPORARY PLACEHOLDERS (cards 01, 06, 07): service-event-planning.jpg,
 *  service-videography.jpg and service-live-streaming.jpg in
 *  /public/images/services/ are licensed Wikimedia Commons photos, NOT
 *  IMENA events. To use your own photo, overwrite the file with the same
 *  name (ideally 1600×1000, landscape), update `alt`, and delete `credit`.
 * ─────────────────────────────────────────────────────────────
 */
export const services: Service[] = [
  {
    slug: "event-planning-management",
    title: "Event Planning & Management",
    summary: "Coordination from preparation through execution.",
    description:
      "We help clients organize and coordinate their events from preparation through execution, working with the necessary suppliers and teams to ensure everything comes together smoothly.",
    icon: ClipboardList,
    image: {
      src: "/images/services/service-event-planning.jpg",
      alt: "Reception hall prepared for an event, with decorated tables, draping, a stage and a lighting truss",
      credit: { text: "Photo: Kenogenic, CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Event_management_69.jpg" },
    },
  },
  {
    slug: "audio-visual-production",
    title: "Audio-Visual Production",
    summary: "Sound, lighting, LED screens and video for events.",
    description:
      "We provide professional technical production for events, including sound, lighting, LED screens, video, and other audio-visual requirements.",
    icon: Clapperboard,
    image: { src: "/images/services/Corporate event.jpg", alt: "Production control desk in front of a lit stage" },
  },
  {
    slug: "sound-systems",
    title: "Sound Systems",
    summary: "Professional sound for every type of occasion.",
    description:
      "We deliver professional sound solutions for weddings, conferences, corporate events, parties, graduations, roadshows, and other occasions.",
    icon: AudioLines,
    image: { src: "/images/gallery/imena-line-array.jpg", alt: "Line-array speakers and subwoofers prepared for an event" },
  },
  {
    slug: "lighting",
    title: "Lighting",
    summary: "Atmosphere for stages, venues and performances.",
    description:
      "We provide event lighting solutions designed to create the right atmosphere and enhance stages, venues, performances, and celebrations.",
    icon: Lightbulb,
    image: { src: "/images/hero/lighting.jpg", alt: "Moving-head and wash lights rigged on a stage truss" },
  },
  {
    slug: "led-screens",
    title: "LED Screens",
    summary: "Video walls for presentations, branding and stage visuals.",
    description:
      "We provide LED screens and video walls for presentations, branding, entertainment, stage visuals, conferences, and large events.",
    icon: MonitorPlay,
    image: { src: "/images/hero/CaleboEvent.jpg", alt: "Stage with a large LED backdrop during a live performance" },
  },
  {
    slug: "videography",
    title: "Videography",
    summary: "High-quality coverage of your important moments.",
    description:
      "We provide professional event videography to capture important moments and create high-quality visual content.",
    icon: Video,
    image: {
      src: "/images/services/service-videography.jpg",
      alt: "Videographer operating a professional camera on a tripod during an event",
      credit: { text: "Photo: Benipal hardarshan, CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:A_videographer_at_Access_to_Arts_Conference_Chandigarh.jpg" },
    },
  },
  {
    slug: "live-streaming",
    title: "Live Streaming",
    summary: "Let remote audiences follow your event live.",
    description: "We provide reliable live-streaming solutions that allow audiences to follow events remotely.",
    icon: Radio,
    image: {
      src: "/images/services/service-live-streaming.jpg",
      alt: "Live production switcher in front of a multiview monitor showing several camera feeds of an event audience",
      credit: { text: "Photo: Amuzujoe, CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Video_switcher.jpg" },
    },
  },
  {
    slug: "event-production",
    title: "Event Production",
    summary: "Complete technical production, coordinated as one.",
    description:
      "We provide complete technical production and coordination, bringing together sound, lighting, LED screens, video, and other event production requirements.",
    icon: Layers,
    image: { src: "/images/gallery/imena-mixing-console.jpg", alt: "Digital mixing console set up at an event" },
  },
];

/** Maps a service to the matching option in the inquiry form. */
export const serviceFormOption: Record<string, string> = {
  "event-planning-management": "Event Planning & Management",
  "audio-visual-production": "Audio-Visual Production",
  "sound-systems": "Sound Systems",
  lighting: "Lighting",
  "led-screens": "LED Screens",
  videography: "Videography",
  "live-streaming": "Live Streaming",
  "event-production": "Full Event Production",
};
