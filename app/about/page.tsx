import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FullLogo } from "@/components/layout/Logo";
import { Process } from "@/components/home/Process";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";
import { QUOTE_HREF } from "@/data/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description: `${siteConfig.name} is a Rwanda-based event production company providing professional event planning, event management, and audio-visual production services.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Who We Are"
        intro={`${siteConfig.name}: professional event planning, event management and audio-visual production from Kigali, Rwanda.`}
        image={{ src: "/images/gallery/imena-mixing-console.jpg", alt: "" }}
      >
        <ButtonLink href={QUOTE_HREF} size="lg">
          Contact Us <ArrowRight className="size-4" />
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="who-title" className="py-20 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle id="who-title" eyebrow="Our Company" title="From event idea to professionally executed experience" />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-fog">
              <p>
                <strong className="font-semibold text-white">{siteConfig.name}</strong> is a Rwanda-based event
                production company providing professional event planning, event management, and audio-visual production
                services.
              </p>
              <p>
                We work with individuals, companies, organizations, event planners, and venues to transform event ideas
                into well-organized and professionally executed experiences.
              </p>
              <p>
                Our approach combines event coordination, reliable technical equipment, skilled production teams, and
                attention to detail to ensure that every part of an event works together.
              </p>
              <p>
                Whether you are planning a corporate function, conference, wedding, graduation, roadshow, or special
                celebration, we are ready to support your event from preparation to execution.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={QUOTE_HREF} size="lg">
                Discuss Your Event
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                Our Services
              </ButtonLink>
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel border border-edge bg-night-800">
              <Image
                src="/images/hero/imena-homepage-background.jpeg"
                alt="Conference production with LED screens, lighting and mixing consoles"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-5 rounded-panel border border-edge bg-night-800 p-5">
              <FullLogo className="w-28 shrink-0 p-3" sizes="112px" />
              <div>
                <p className="font-semibold">{siteConfig.tagline}</p>
                <p className="mt-1 text-sm text-fog">{siteConfig.serviceHighlights.join(" • ")}</p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <WhyChooseUs />
      <Process />
      <CallToAction
        title="Let's talk about your event"
        text="Tell us the date, the venue and what you have in mind, and we'll help you build the right production plan."
        primaryLabel="Contact Us"
      />
    </>
  );
}
