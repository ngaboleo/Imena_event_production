"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  if (count === 0) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section aria-labelledby="testimonials-title" className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionTitle id="testimonials-title" align="center" title="What our customers say" />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
          className="mt-14 overflow-hidden rounded-card"
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
                className="w-full shrink-0 px-2"
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous review"
              className="flex size-11 items-center justify-center rounded-full border border-line text-pine-900 transition-colors hover:border-pine-900 hover:bg-pine-900 hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === index}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-brass-500" : "w-1.5 bg-pine-900/20",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next review"
              className="flex size-11 items-center justify-center rounded-full border border-line text-pine-900 transition-colors hover:border-pine-900 hover:bg-pine-900 hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
