import { Briefcase, Users, UserRound } from "lucide-react";
import { EventsGrid } from "@/components/events/EventsGrid";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";
import { eventCategories } from "@/data/events";
import { createMetadata } from "@/lib/seo";
import type { EventAudience } from "@/types";

export const metadata = createMetadata({
  title: "Events We Cover",
  description:
    "Event planning and production for weddings, corporate events, conferences, graduations, roadshows, concerts, product launches, church and community events, awards and brand activations in Rwanda.",
  path: "/events",
});

const groups: { audience: EventAudience; title: string; icon: typeof Users }[] = [
  { audience: "Private", title: "Private clients", icon: UserRound },
  { audience: "Corporate", title: "Companies & organizations", icon: Briefcase },
  { audience: "Community", title: "Churches & communities", icon: Users },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events We Cover"
        title="Events We Cover"
        intro={`${siteConfig.name} provides professional event planning and production solutions for different types of events.`}
        image={{ src: "/images/hero/CaleboEvent.jpg", alt: "" }}
      />

      <section aria-labelledby="event-types-title" className="py-16 sm:py-24">
        <Container>
          <h2 id="event-types-title" className="sr-only">
            Event types
          </h2>
          <EventsGrid />
        </Container>
      </section>

      <section aria-labelledby="clients-title" className="border-y border-edge bg-night-900 py-20 sm:py-28">
        <Container>
          <SectionTitle
            id="clients-title"
            eyebrow="Who We Work With"
            title="Private, corporate and community events"
            intro="We work with individuals, companies, organizations, event planners and venues."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {groups.map(({ audience, title, icon: Icon }) => (
              <div key={audience} className="rounded-card border border-edge bg-night-850 p-7">
                <Icon className="size-7 text-electric-400" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl">{title}</h3>
                <ul className="mt-4 space-y-2 text-fog">
                  {eventCategories
                    .filter((e) => e.audience.includes(audience))
                    .map((e) => (
                      <li key={e.title} className="flex items-center gap-2.5">
                        <span aria-hidden className="size-1.5 rounded-full bg-electric-500" />
                        {e.title}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction />
    </>
  );
}
