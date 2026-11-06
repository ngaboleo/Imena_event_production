import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { processSteps } from "@/data/highlights";

export function HowItWorks() {
  return (
    <section aria-labelledby="process-title" className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="process-title"
          align="center"
          title="How booking works"
          intro="Five simple steps from your first message to a fully tested sound system."
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute top-2 bottom-2 left-7 w-px bg-brass-500/30 lg:hidden" />
          <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-brass-500/30 lg:block" />

          {processSteps.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-brass-500/40 bg-paper font-display text-2xl text-pine-900">
                {i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 text-2xl leading-tight text-pine-950 lg:mt-5 lg:justify-center">
                  <Icon className="size-5 text-brass-600 lg:hidden" strokeWidth={1.6} />
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
