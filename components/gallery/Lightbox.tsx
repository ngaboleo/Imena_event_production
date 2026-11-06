"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategoryLabel } from "@/data/gallery";
import { formatDate } from "@/lib/utils";
import type { GalleryItem } from "@/types";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const count = items.length;

  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  // Focus, scroll lock, and restore focus to the opening card on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onNavigate]);

  if (!item) return null;
  const date = formatDate(item.date);

  // Rendered into <body> so no animated/transformed ancestor can trap it.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[60] flex animate-page-in flex-col bg-night-950/97 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] text-white/70 sm:px-6">
        <span className="text-sm tabular-nums">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        {item.type === "video" ? (
          <div className="flex size-full items-center justify-center px-2 sm:px-20">
            <video
              key={item.id}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              aria-label={item.alt}
              className="max-h-full max-w-full animate-page-in rounded-xl bg-black"
            />
          </div>
        ) : (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            quality={85}
            className="animate-page-in object-contain px-2 sm:px-20"
          />
        )}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous item"
              className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-electric-600 sm:flex"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next item"
              className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-electric-600 sm:flex"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      <div
        className="px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm text-electric-300">{galleryCategoryLabel[item.category]}</p>
        <h2 className="mt-1 text-xl sm:text-2xl">{item.caption}</h2>
        {date && (
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-white/65">
            <Calendar className="size-4" /> {date}
          </p>
        )}
        {count > 1 && <p className="mt-3 text-xs text-white/40 sm:hidden">Swipe to see more</p>}
      </div>
    </div>,
    document.body,
  );
}
