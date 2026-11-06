import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";
import { reasons } from "@/data/highlights";
import { cn } from "@/lib/utils";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden border-y border-edge bg-night-900 py-20 sm:py-28">
      <div aria-hidden className="absolute top-1/2 -right-40 -z-10 size-[32rem] -translate-y-1/2 rounded-full bg-electric-600/15 blur-3xl" />
      <Container>
        <SectionTitle
          id="why-title"
          eyebrow="Why Choose Us"
          title={`Why choose ${siteConfig.name}?`}
          intro="Careful preparation, dependable equipment and one coordinated team, from the first meeting to the last cable."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className={cn(
                "rounded-card border border-edge bg-night-850/80 p-7 backdrop-blur-sm sm:p-8",
                i < 2 ? "lg:col-span-3" : "lg:col-span-2",
                i === 4 && "md:col-span-2 lg:col-span-2",
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-electric-500/30 bg-electric-600/10 text-electric-400">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-xl sm:text-2xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
