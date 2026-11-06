import {
  ClipboardCheck,
  ClipboardList,
  Layers,
  MessagesSquare,
  PackageCheck,
  PackageOpen,
  PlayCircle,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Wrench,
} from "lucide-react";
import type { Feature, ProcessStep } from "@/types";

export const reasons: Feature[] = [
  {
    icon: ClipboardCheck,
    title: "Professional Execution",
    description: "We approach every event with careful preparation, coordination, and attention to detail.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Equipment",
    description: "We provide professional audio-visual equipment suited to the requirements of each event.",
  },
  {
    icon: Layers,
    title: "One Production Partner",
    description:
      "From planning and coordination to technical production, we bring multiple event requirements together under one team.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Our team works closely with clients, venues, event planners, and other suppliers to ensure smooth event execution.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tailored Solutions",
    description:
      "Every event is different. We develop solutions according to the venue, audience, program, and client's requirements.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    icon: MessagesSquare,
    title: "Consultation",
    description: "We listen to your event concept, requirements, venue, and budget.",
  },
  {
    icon: ClipboardList,
    title: "Planning",
    description: "We develop the event and production plan according to your needs.",
  },
  {
    icon: PackageCheck,
    title: "Preparation",
    description: "Our team coordinates equipment, personnel, logistics, and technical requirements.",
  },
  {
    icon: Wrench,
    title: "Setup",
    description: "We install and test the required sound, lighting, LED screens, and other production equipment.",
  },
  {
    icon: PlayCircle,
    title: "Event Execution",
    description:
      "Our team remains involved throughout the event to ensure smooth technical and operational delivery.",
  },
  {
    icon: PackageOpen,
    title: "Breakdown",
    description: "After the event, we safely dismantle and organize the equipment.",
  },
];
