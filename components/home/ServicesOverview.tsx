import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="relative isolate border-y border-edge bg-night-900 py-20 sm:py-28">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            id="services-title"
            eyebrow="Our Services"
            title="Everything your event needs, under one team"
            intro="From planning and coordination to sound, lighting, LED screens, video and live streaming."
          />
          <ButtonLink href="/services" variant="outline" className="self-start sm:self-auto">
            All services <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ slug, title, summary, icon: Icon }, i) => (
            <li key={slug} className="flex">
              <article className="group relative flex w-full flex-col rounded-card border border-edge bg-night-850 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-500/50 hover:shadow-glow">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-electric-600/15 text-electric-400 transition-colors group-hover:bg-electric-600 group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <span aria-hidden className="text-sm font-medium text-white/25 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl leading-snug">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-fog">{summary}</p>
                <Link
                  href={`/services#${slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric-300 after:absolute after:inset-0 after:rounded-card after:content-['']"
                >
                  Learn more <span className="sr-only">about {title}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
