import { Container } from "@/components/ui/Container";
import { plannedServices } from "@/data/services";

/** Future services — clearly presented as not yet available. */
export function PlannedServices() {
  if (plannedServices.length === 0) return null;
  return (
    <section aria-labelledby="planned-title" className="border-y border-line bg-white py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="planned-title" className="text-3xl text-pine-950 sm:text-4xl">
            Where we&apos;re heading
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Sound is our speciality today. Over time we plan to offer more of what your event needs, in one
            place. These services are not available yet.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
          {plannedServices.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.slug}
                className="flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-3.5 text-muted"
              >
                <Icon className="size-5 shrink-0 text-pine-700/60" strokeWidth={1.6} />
                <span className="text-sm leading-snug">{s.title}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
