import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";

export function AboutIntro() {
  return (
    <section aria-labelledby="about-intro-title" className="overflow-x-clip py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionTitle
            id="about-intro-title"
            eyebrow={`About ${siteConfig.name}`}
            title="People, equipment and expertise for a successful event"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-fog">
            <p>
              {siteConfig.name} is a Rwanda-based event production company providing professional event planning,
              event management, and audio-visual production services.
            </p>
            <p>
              From intimate celebrations to large corporate events, conferences, weddings, graduations, roadshows, and
              live performances, we bring together the people, equipment, creativity, and technical expertise needed
              to deliver a successful event.
            </p>
          </div>
          <ButtonLink href="/about" variant="outline" className="mt-9">
            Learn More <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="relative lg:col-span-6">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-electric-600/15 blur-3xl" />
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-panel border border-edge bg-night-800">
              <Image
                src="/images/gallery/imena-mixing-console.jpg"
                alt="IMENA mixing console set up at an event"
                fill
                sizes="(min-width: 1024px) 28vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-10">
              <div className="relative aspect-[3/4] overflow-hidden rounded-panel border border-edge bg-night-800">
                <Image
                  src="/images/gallery/imena-line-array.jpg"
                  alt="IMENA line-array speakers prepared for an event"
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-card border border-edge bg-night-800 p-4 text-sm leading-snug text-fog sm:p-5">
                <span className="block text-base font-semibold text-white">Kigali, Rwanda</span>
                Event planning &amp; production
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
