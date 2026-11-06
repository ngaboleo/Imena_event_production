import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { processSteps } from "@/data/highlights";

/** Six-step production process: vertical timeline on mobile, horizontal on desktop. */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="process-title"
          align="center"
          eyebrow="Our Process"
          title="From Your First Idea to the Final Moment"
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-6 xl:gap-5">
          {/* Connecting line: vertical on mobile, horizontal on wide screens */}
          <span aria-hidden className="absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-electric-500/60 via-electric-500/30 to-transparent md:hidden" />
          <span aria-hidden className="absolute top-7 right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-electric-500/10 via-electric-500/60 to-electric-500/10 xl:block" />

          {processSteps.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="relative flex gap-5 md:flex-col md:items-start xl:items-center xl:text-center">
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-electric-500/50 bg-night-950 text-electric-300 shadow-[0_0_30px_-6px_rgb(47_134_255/0.6)]">
                <Icon className="size-6" strokeWidth={1.6} />
                <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-electric-600 text-xs font-semibold text-white tabular-nums">
                  {i + 1}
                </span>
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase md:mt-5">Step {i + 1}</p>
                <h3 className="mt-1 text-xl leading-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-fog">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
