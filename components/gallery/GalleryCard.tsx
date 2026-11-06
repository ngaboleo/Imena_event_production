import Image from "next/image";
import { MapPin } from "lucide-react";
import { galleryCategoryLabel } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

interface GalleryCardProps {
  item: GalleryItem;
  onOpen: () => void;
}

export function GalleryCard({ item, onOpen }: GalleryCardProps) {
  const portrait = item.orientation === "portrait";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${item.title}`}
      className="group relative block w-full overflow-hidden rounded-card bg-mist text-left"
    >
      <div className={cn("relative", portrait ? "aspect-[3/4]" : "aspect-[4/3]")}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-950/85 via-pine-950/40 to-transparent p-5 pt-16 text-white">
        <p className="text-xs text-brass-200">{galleryCategoryLabel[item.category]}</p>
        <p className="mt-1 font-display text-xl leading-tight">{item.title}</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-white/70">
          <MapPin className="size-3.5" /> {item.location}
        </p>
      </div>
    </button>
  );
}
