import { Check, Info } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { packages, PRICING_NOTE } from "@/data/packages";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PackagesSection() {
  return (
    <section aria-labelledby="packages-title" className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="packages-title"
          align="center"
          title="Packages for every size of event"
          intro="Start from the package closest to your event. We'll adjust it to your venue and programme."
        />

        <ul className="mt-16 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-0">
          {packages.map((pkg) => (
            <li
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-panel p-8 sm:p-10",
                pkg.highlighted
                  ? "relative z-10 bg-pine-900 text-white shadow-lift lg:-my-6 lg:py-16"
                  : "border border-line bg-white",
              )}
            >
              {pkg.highlighted && (
                <span className="mb-4 self-start rounded-full bg-brass-500/15 px-3 py-1 text-sm text-brass-200">
                  Most requested
                </span>
              )}
              <h3 className={cn("text-4xl", pkg.highlighted ? "text-white" : "text-pine-950")}>{pkg.name}</h3>
              <p className={cn("mt-2", pkg.highlighted ? "text-white/70" : "text-muted")}>{pkg.summary}</p>

              <ul className="mt-8 flex-1 space-y-3.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      className={cn("mt-0.5 size-5 shrink-0", pkg.highlighted ? "text-brass-400" : "text-brass-600")}
                      strokeWidth={2}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?package=${pkg.id}#quote`}
                className={buttonClasses(pkg.highlighted ? "primary" : "outline", "lg", "mt-10 w-full")}
                aria-label={`Request a quote for the ${pkg.name} package`}
              >
                Request quote
              </Link>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 flex max-w-xl items-start justify-center gap-2 text-center text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-brass-600" />
          {PRICING_NOTE}
        </p>
      </Container>
    </section>
  );
}
