import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-card bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift">
      {service.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col px-6 pt-10 pb-6">
        <span className="absolute -top-7 left-6 flex size-14 items-center justify-center rounded-2xl bg-pine-900 text-brass-400 shadow-soft">
          <Icon className="size-6" strokeWidth={1.6} />
        </span>
        <h3 className="text-[1.75rem] leading-tight text-pine-950">{service.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-pine-900 after:absolute after:inset-0 after:content-['']"
          aria-label={`Learn more about ${service.title}`}
        >
          <span className="border-b border-brass-500/60 pb-0.5 transition-colors group-hover:border-pine-900">
            Learn more
          </span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
