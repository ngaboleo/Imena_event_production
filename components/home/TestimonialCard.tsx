import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

function initials(name: string) {
  const clean = name.replace(/[[\]]/g, "").trim();
  return clean
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, photo, eventType, quote, rating, isPlaceholder } = testimonial;
  return (
    <figure className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div className="flex gap-1 text-brass-500" aria-label={`Rated ${rating} out of 5`} role="img">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-5" fill={i < rating ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </div>
      <blockquote className="mt-8 font-display text-2xl leading-snug text-pine-950 sm:text-[2.1rem] sm:leading-[1.3]">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4 text-left">
        {photo ? (
          <Image src={photo} alt={name} width={56} height={56} className="size-14 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex size-14 items-center justify-center rounded-full bg-pine-900 font-display text-xl text-brass-200"
          >
            {initials(name) || "?"}
          </span>
        )}
        <div>
          <p className="font-medium text-pine-950">{name}</p>
          <p className="text-sm text-muted">{eventType}</p>
        </div>
      </figcaption>
      {isPlaceholder && (
        <p className="mt-6 rounded-full border border-dashed border-brass-500/50 px-3 py-1 text-xs text-brass-600">
          Sample review — replace in data/testimonials.ts
        </p>
      )}
    </figure>
  );
}
