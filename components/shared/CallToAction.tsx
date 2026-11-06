import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Waveform } from "@/components/ui/Waveform";
import { QUOTE_HREF } from "@/data/navigation";
import { whatsappUrl } from "@/lib/contact";

interface CallToActionProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Show a secondary WhatsApp button. */
  showWhatsApp?: boolean;
  whatsappMessage?: string;
}

export function CallToAction({
  title = "Planning an event?",
  text = "Tell us about your event and we'll help you find the right sound solution.",
  primaryLabel = "Request a quote",
  primaryHref = QUOTE_HREF,
  showWhatsApp = true,
  whatsappMessage,
}: CallToActionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-panel bg-pine-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <Waveform className="absolute inset-x-8 bottom-0 -z-10 h-24 text-brass-400/15 sm:h-32" />
          <h2 className="mx-auto max-w-2xl text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{text}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} size="lg">
              {primaryLabel}
            </ButtonLink>
            {showWhatsApp && (
              <ButtonLink href={whatsappUrl(whatsappMessage)} external variant="light" size="lg">
                <MessageCircle className="size-4" /> Talk to our team
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
