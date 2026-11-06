import Image from "next/image";
import { Compass, Eye, Gem } from "lucide-react";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description: `${siteConfig.name} is building a professional event-services brand, starting with high-quality sound solutions for weddings, corporate events and celebrations.`,
  path: "/about",
});

const values = [
  {
    icon: Compass,
    title: "Our mission",
    text: "To give every event clear, dependable sound — delivered on time, set up with care, and supported by people who take pride in the details.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "To become a trusted, complete event-services partner, so customers can plan their entire event with one team they already know and rely on.",
  },
  {
    icon: Gem,
    title: "Our commitment to quality",
    text: "We maintain and test our equipment, arrive early, and do a full sound check before every event. If something needs attention on the day, we're there to handle it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About us"
        intro="An event-services company built on one simple promise: your event will sound the way it should."
        image={{ src: "/images/services/ourservice.jpg", alt: "" }}
      />

      <section aria-labelledby="story-title" className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-mist lg:col-span-5">
            {/* REPLACE: /public/images/about/story.jpg — a photo of your team or a setup in progress */}
            <Image
              src="/images/about/Logo.jpeg"
              alt="Our team setting up sound equipment before an event"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <span aria-hidden className="mb-5 block h-px w-12 bg-brass-500" />
            <h2 id="story-title" className="text-4xl leading-tight text-pine-950 sm:text-5xl">
              Our story
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                {siteConfig.name} is a Rwanda-based event production company providing professional event planning,event management,and audio-visual production services.
                    We work with individuals,companies,organizations,event planners,and venues to transform event ideas into well-organized and professionally 
                    executed experiences.

              </p>
              <p>
                Our approach combines event coordination,reliable technical equipment,skilled production teams,
                and attention to detail to ensure that every part of an event works together.

              </p>
              <p>
                Whether you are planning corporate function, conference,wedding,graduation,
                roadshow or special celebration,we are ready to support your event from preparation to execution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Mission, vision and commitment" className="bg-mist py-20 sm:py-28">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-card bg-white p-8 shadow-soft sm:p-10">
                <Icon className="size-8 text-brass-600" strokeWidth={1.5} />
                <h2 className="mt-6 text-3xl text-pine-950">{title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhyChooseUs />
      <CallToAction title="Let's talk about your event" text="Tell us the date, the venue and the number of guests — we'll take it from there." />
    </>
  );
}
