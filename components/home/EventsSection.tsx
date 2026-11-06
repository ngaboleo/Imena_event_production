import { ArrowRight } from "lucide-react";
import { EventsGrid } from "@/components/events/EventsGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";

export function EventsSection() {
  return (
    <section aria-labelledby="events-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            id="events-title"
            eyebrow="Events We Cover"
            title="For private, corporate and community events"
            intro={`${siteConfig.name} provides professional event planning and production solutions for different types of events.`}
          />
          <ButtonLink href="/events" variant="outline" className="self-start sm:self-auto">
            Explore events <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <div className="mt-14">
          <EventsGrid />
        </div>
      </Container>
    </section>
  );
}
