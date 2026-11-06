import Image from "next/image";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Waveform } from "@/components/ui/Waveform";
import { QUOTE_HREF } from "@/data/navigation";
import { whatsappUrl } from "@/lib/contact";

const trustPoints = ["Professional setup", "Reliable equipment", "Event support"];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-pine-950 text-white">
      {/* REPLACE: /public/images/hero/hero.jpg — your best wide event photo (min. 2000px wide) */}
      <Image
        src="/images/hero/CaleboEvent.jpg"
        alt="Guests at an evening wedding reception with a professional sound setup"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-pine-950/95 via-pine-950/70 to-pine-950/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-pine-950/80 to-transparent" />

      <Container className="pt-32 pb-40 sm:pt-36">
        <div className="max-w-5xl">
          <h1 className="animate-fade-up text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
            Imena Event
            <span className="block text-brass-200">Production</span>
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-white/80 sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {/* Professional sound solutions designed to make weddings, corporate events and special occasions sound
            exceptional. */}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: "220ms" }}>
            <ButtonLink href={QUOTE_HREF} size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="light" size="lg">
              <SocialIcon network="whatsapp" className="size-5" />
              WhatsApp us
            </ButtonLink>
          </div>

          <ul
            className="mt-10 flex animate-fade-up flex-wrap gap-x-6 gap-y-2 text-sm text-white/70"
            style={{ animationDelay: "320ms" }}
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="size-4 text-brass-400" strokeWidth={2.2} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Signature level meter — rises once on load */}
      <Waveform animate bars={48} className="absolute inset-x-0 bottom-0 h-20 text-brass-400/35 sm:hidden" />
      <Waveform animate bars={96} className="absolute inset-x-0 bottom-0 hidden h-28 text-brass-400/35 sm:flex" />
    </section>
  );
}
