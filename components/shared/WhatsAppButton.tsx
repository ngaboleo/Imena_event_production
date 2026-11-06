import { SocialIcon } from "@/components/ui/SocialIcon";
import { hasWhatsApp, whatsappUrl } from "@/lib/contact";

/** Floating WhatsApp button, visible on every page when a number is configured. */
export function WhatsAppButton() {
  if (!hasWhatsApp) return null;
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with IMENA EVENT PRODUCTION on WhatsApp"
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-night-950 opacity-0 shadow-lift transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition-transform duration-200 group-hover:scale-105">
        <SocialIcon network="whatsapp" className="size-7" />
      </span>
    </a>
  );
}
