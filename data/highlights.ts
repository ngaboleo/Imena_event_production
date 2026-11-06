import {
  AudioWaveform,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  FileText,
  Headphones,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
  Speaker,
  Wrench,
} from "lucide-react";
import type { Feature, ProcessStep } from "@/types";

export const reasons: Feature[] = [
  { icon: ShieldCheck, title: "Professional Equipment", description: "We use reliable sound equipment suitable for different types of events." },
  { icon: AudioWaveform, title: "Clear Sound Quality", description: "Our systems are configured to provide clean and balanced audio." },
  { icon: Wrench, title: "Professional Setup", description: "Our team handles equipment setup and preparation before the event." },
  { icon: Clock, title: "Reliable Service", description: "We value punctuality and preparation so customers can focus on their event." },
  { icon: Headphones, title: "Technical Support", description: "Technical assistance can be provided during events when required." },
  { icon: SlidersHorizontal, title: "Flexible Solutions", description: "Equipment and setup can be adapted according to venue size, audience and event requirements." },
];

export const processSteps: ProcessStep[] = [
  { icon: MessageSquareText, title: "Tell Us About Your Event", description: "Send us your event details through the form, WhatsApp or a phone call." },
  { icon: ClipboardCheck, title: "We Review Your Requirements", description: "We look at the venue, audience size and the equipment you'll need." },
  { icon: FileText, title: "Receive Your Quotation", description: "You receive a recommended setup and a clear quotation." },
  { icon: CalendarCheck, title: "Confirm Your Booking", description: "We confirm your event date and the services included." },
  { icon: Speaker, title: "Event Setup & Support", description: "We install and test everything before your event begins." },
];
