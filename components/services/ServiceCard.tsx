import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceFormOption } from "@/data/services";
import type { Service } from "@/types";

/** Full service card used on /services. Each card is an anchor target (#slug). */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const option = serviceFormOption[service.slug];
  const quoteHref = `/contact${option ? `?service=${encodeURIComponent(option)}` : ""}#quote`;

  return (
    <article
      id={service.slug}
      className="group flex w-full scroll-mt-40 flex-col overflow-hidden rounded-card border border-edge bg-night-850 transition-colors duration-300 hover:border-electric-500/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night-800">
        {service.image ? (
          <>
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-850 via-night-850/10 to-transparent" />
            {service.image.credit && (
              <a
                href={service.image.credit.href}
                target="_blank"
                rel="noopener noreferrer license"
                className="absolute right-3 bottom-2 rounded px-1.5 py-0.5 text-[10px] leading-tight text-white/55 hover:text-white"
              >
                {service.image.credit.text}
              </a>
            )}
          </>
        ) : (
          // No photo yet: a designed icon panel instead of a misleading stock image.
          <div aria-hidden className="bg-grid absolute inset-0 flex items-center justify-center bg-gradient-to-br from-electric-700/40 via-night-800 to-night-850">
            <div className="absolute size-48 rounded-full bg-electric-500/25 blur-3xl" />
            <Icon className="relative size-20 text-electric-300" strokeWidth={1.1} />
          </div>
        )}
        <span aria-hidden className="absolute top-4 left-4 rounded-full bg-night-950/70 px-3 py-1 text-xs font-medium text-white/80 tabular-nums backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric-600/15 text-electric-400">
            <Icon className="size-5" strokeWidth={1.7} />
          </span>
          <h2 className="text-2xl leading-tight">{service.title}</h2>
        </div>
        <p className="mt-4 flex-1 leading-relaxed text-fog">{service.description}</p>
        <Link
          href={quoteHref}
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-electric-300 hover:text-white"
        >
          Discuss your event <span className="sr-only">({service.title})</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
