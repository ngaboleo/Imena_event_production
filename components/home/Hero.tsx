import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { QUOTE_HREF } from "@/data/navigation";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night-950">
      {/* Official homepage photo: conference production with LED screens, lighting and mixing consoles. */}
      <Image
        src="/images/hero/imena-homepage-background.jpeg"
        alt="Conference hall produced by IMENA EVENT PRODUCTION, with LED screens, blue stage lighting and sound mixing consoles"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-20 animate-hero-zoom object-cover object-[50%_35%]"
      />
      {/* Overlays keep text readable while leaving the stage and LED screens visible. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/95 via-night-950/70 to-night-950/25" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-night-950/70 to-transparent" />

      <Container className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-3xl">
          <p className="flex animate-fade-up items-center gap-3 text-xs font-semibold tracking-[0.22em] text-electric-300 uppercase sm:text-sm">
            <span aria-hidden className="h-px w-8 bg-electric-400" />
            Event Planning, Management &amp; Audio-Visual Production
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-fade-up text-[2.75rem] leading-[1] font-bold sm:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            We Bring Your Events <span className="text-electric-400">to Life</span>
          </h1>

          <p
            className="mt-7 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/85 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            At {siteConfig.name}, we provide professional event planning, coordination, and audio-visual production
            services designed to make every event memorable and seamless.
          </p>

          <ul
            aria-label="Services"
            className="mt-8 flex animate-fade-up flex-wrap gap-2"
            style={{ animationDelay: "240ms" }}
          >
            {siteConfig.serviceHighlights.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/90 backdrop-blur-sm"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: "320ms" }}>
            <ButtonLink href="/services" size="lg">
              Our Services <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={QUOTE_HREF} variant="outline" size="lg">
              Get a Quote
            </ButtonLink>
          </div>

          <p
            className="mt-12 animate-fade-up text-sm font-medium tracking-[0.3em] text-white/60 uppercase"
            style={{ animationDelay: "400ms" }}
          >
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </section>
  );
}
