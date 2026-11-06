import {
  Award,
  Briefcase,
  Church,
  GraduationCap,
  Heart,
  Megaphone,
  MicVocal,
  PartyPopper,
  Presentation,
  Rocket,
  Truck,
} from "lucide-react";
import type { EventCategory } from "@/types";

/** Event types we support. `audience` shows who typically books them. */
export const eventCategories: EventCategory[] = [
  { title: "Weddings", icon: Heart, audience: ["Private"] },
  { title: "Corporate Events", icon: Briefcase, audience: ["Corporate"] },
  { title: "Conferences & Seminars", icon: Presentation, audience: ["Corporate"] },
  { title: "Graduations", icon: GraduationCap, audience: ["Private", "Community"] },
  { title: "Roadshows", icon: Truck, audience: ["Corporate"] },
  { title: "Concerts & Live Performances", icon: MicVocal, audience: ["Corporate", "Community"] },
  { title: "Product Launches", icon: Rocket, audience: ["Corporate"] },
  { title: "Church & Community Events", icon: Church, audience: ["Community"] },
  { title: "Private Celebrations", icon: PartyPopper, audience: ["Private"] },
  { title: "Awards & Ceremonies", icon: Award, audience: ["Corporate", "Community"] },
  { title: "Brand Activations", icon: Megaphone, audience: ["Corporate"] },
];
