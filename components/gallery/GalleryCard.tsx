import Image from "next/image";
import { Play } from "lucide-react";
import { galleryCategoryLabel } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

interface GalleryCardProps {
  item: GalleryItem;
  onOpen: () => void;
}

const aspect = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square" } as const;

export function GalleryCard({ item, onOpen }: GalleryCardProps) {
  const isVideo = item.type === "video";
  const still = isVideo ? item.poster : item.src;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${isVideo ? "Play video" : "Enlarge photo"}: ${item.caption}`}
      className="group relative block w-full overflow-hidden rounded-card border border-edge bg-night-800 text-left"
    >
      <div className={cn("relative", aspect[item.orientation ?? "landscape"])}>
        {still ? (
          <Image
            src={still}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          // Video without a poster: let the browser show the first frame.
          <video
            src={`${item.src}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {isVideo && (
          <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-electric-600">
            <Play className="ml-1 size-7" fill="currentColor" />
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/90 via-night-950/40 to-transparent p-5 pt-16">
        <p className="text-xs font-medium tracking-wide text-electric-300 uppercase">
          {galleryCategoryLabel[item.category]}
          {isVideo && " · Video"}
        </p>
        <p className="mt-1 text-lg leading-snug font-medium text-white">{item.caption}</p>
      </div>
    </button>
  );
}
