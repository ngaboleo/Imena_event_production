import type { EquipmentItem } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  EQUIPMENT
 *  Add an item by copying an object below and adding its photo to
 *  /public/images/equipment/. Only list brands or specifications
 *  that you actually own — keep descriptions accurate.
 * ─────────────────────────────────────────────────────────────
 */
export const equipment: EquipmentItem[] = [
  {
    id: "speakers",
    name: "Professional Speakers",
    description: "Main speakers for clear speech and music, positioned to cover your audience evenly.",
    image: { src: "/images/equipment/auditorium sound system.jpg", alt: "Professional event speakers" },
  },
  {
    id: "subwoofers",
    name: "Subwoofers",
    description: "Low-frequency support for music, dancing and entertainment.",
    image: { src: "/images/equipment/soudflow.jpg", alt: "Subwoofers for event sound" },
  },
  {
    id: "wireless-microphones",
    name: "Wireless Microphones",
    description: "Handheld and lapel microphones for speakers, MCs and presenters.",
    image: { src: "/images/equipment/wireless microphones.jpeg", alt: "Wireless microphones" },
  },
  {
    id: "mixers",
    name: "Audio Mixers",
    description: "Mixing consoles to balance microphones, music and other sound sources.",
    image: { src: "/images/equipment/audio mixer.jpg", alt: "Audio mixing console" },
  },
  {
    id: "stands",
    name: "Speaker Stands",
    description: "Sturdy stands that raise speakers for better projection across the room.",
    image: { src: "/images/equipment/sound for private event.jpeg", alt: "Speakers mounted on stands" },
  },
  {
    id: "cables",
    name: "Cables & Accessories",
    description: "Cabling, adaptors and power distribution for a tidy, safe installation.",
    image: { src: "/images/equipment/Cables & Accessories.jpg", alt: "Audio cables and accessories" },
  },
];
