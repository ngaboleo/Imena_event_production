"use client";

import { useMemo, useState } from "react";
import { ImagePlus } from "lucide-react";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { Lightbox } from "@/components/gallery/Lightbox";
import { gallery as allItems, galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

interface GalleryProps {
  items?: GalleryItem[];
  showFilters?: boolean;
  limit?: number;
}

export function Gallery({ items = allItems, showFilters = true, limit }: GalleryProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [items, filter, limit]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const i of items) c[i.category] = (c[i.category] ?? 0) + 1;
    return c;
  }, [items]);

  const activeLabel = galleryCategories.find((c) => c.id === filter)?.label ?? "";

  return (
    <div>
      {showFilters && (
        <div
          role="group"
          aria-label="Filter by event category"
          className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {galleryCategories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                aria-pressed={active}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm transition-colors",
                  active
                    ? "border-electric-500 bg-electric-600 text-white"
                    : "border-edge bg-night-850 text-white/80 hover:border-electric-500/60 hover:text-white",
                )}
              >
                {cat.label}
                <span className={cn("text-xs tabular-nums", active ? "text-white/80" : "text-fog")}>
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center rounded-card border border-dashed border-white/15 bg-night-850 px-6 py-16 text-center">
          <ImagePlus className="size-10 text-electric-400" strokeWidth={1.4} />
          <p className="mt-4 text-lg font-medium">{activeLabel} photos &amp; videos coming soon</p>
          <p className="mt-1 max-w-md text-fog">
            We&apos;re preparing media from our recent productions. Choose another category to see more of our work.
          </p>
        </div>
      ) : (
        <ul aria-live="polite" className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
          {visible.map((item, i) => (
            <li key={item.id} className="break-inside-avoid">
              <GalleryCard item={item} onOpen={() => setOpenIndex(i)} />
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <Lightbox items={visible} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </div>
  );
}
