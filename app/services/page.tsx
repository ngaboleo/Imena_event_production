import Link from "next/link";
import { Process } from "@/components/home/Process";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QUOTE_HREF } from "@/data/navigation";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Event planning & management, audio-visual production, sound systems, lighting, LED screens, videography, live streaming and complete event production in Kigali, Rwanda.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Planning and production, delivered by one team"
        intro="From coordination to sound, lighting, LED screens, video and live streaming, we bring every part of your event together."
        image={{ src: "/images/services/ourservice.jpg", alt: "" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={QUOTE_HREF} size="lg">
            Request a Quote
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Quick navigation between services */}
      <nav aria-label="Services on this page" className="sticky top-[calc(5rem+env(safe-area-inset-top))] z-30 border-y border-edge bg-night-950/90 backdrop-blur-xl">
        <Container>
          <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {services.map((s) => (
              <li key={s.slug} className="shrink-0">
                <Link
                  href={`#${s.slug}`}
                  className="block rounded-full px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <section aria-label="Services" className="py-16 sm:py-24">
        <Container>
          <ServicesGrid />
          <p className="mt-10 text-center text-fog">
            Every event is quoted individually, based on the venue, audience, program and technical requirements.
          </p>
        </Container>
      </section>

      <div className="border-t border-edge bg-night-900">
        <Process />
      </div>
      <CallToAction
        title="Discuss Your Event"
        text="Not sure exactly what you need? Describe your event and we'll recommend the right production solution."
        primaryLabel="Request a Quote"
      />
    </>
  );
}
