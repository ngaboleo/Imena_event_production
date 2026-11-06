import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const eventTypes = ["Weddings", "Corporate events", "Conferences & meetings", "Private parties", "Outdoor events"];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <h2
          id="intro-title"
          className="text-[2.1rem] leading-[1.15] text-pine-950 sm:text-5xl sm:leading-[1.1] lg:col-span-7"
        >
          We provide professional sound solutions for events of different sizes, from intimate wedding
          ceremonies to corporate functions and large celebrations.
        </h2>
        <div className="lg:col-span-5 lg:pt-3">
          <p className="text-lg leading-relaxed text-muted">
            Every event is different the room, the programme, the number of guests. We plan the setup around
            yours, arrive early, and test everything before the first guest sits down.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {eventTypes.map((t) => (
              <li key={t} className="flex items-center justify-between py-3 text-pine-950">
                {t}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass-500" />
              </li>
            ))}
          </ul>
          <ButtonLink href="/services" variant="outline" className="mt-8">
            View our services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
