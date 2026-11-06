import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Waveform } from "@/components/ui/Waveform";
import { siteConfig } from "@/config/site";
import { QUOTE_HREF } from "@/data/navigation";
import { hasWhatsApp, phoneUrl, whatsappUrl } from "@/lib/contact";

interface CallToActionProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CallToAction({
  title = "Let's Make Your Event Happen.",
  text = "Tell us about your event, and our team will help you plan and produce it, from the first idea to the final moment.",
  primaryLabel = "Get a Quote",
  primaryHref = QUOTE_HREF,
}: CallToActionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-night-800 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -top-32 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-electric-600/30 blur-3xl" />
          <div aria-hidden className="bg-grid absolute inset-0 -z-20 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <Waveform className="absolute inset-x-8 bottom-0 -z-10 h-20 text-electric-400/15 sm:h-28" />
          <p className="text-xs font-semibold tracking-[0.22em] text-electric-400 uppercase">{siteConfig.tagline}</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fog">{text}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </ButtonLink>
            {hasWhatsApp ? (
              <ButtonLink href={whatsappUrl()} external variant="outline" size="lg" className="w-full sm:w-auto">
                <SocialIcon network="whatsapp" className="size-5" /> WhatsApp us
              </ButtonLink>
            ) : (
              <ButtonLink href={phoneUrl()} variant="outline" size="lg" className="w-full sm:w-auto">
                <Phone className="size-4" /> {siteConfig.contact.phone}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
