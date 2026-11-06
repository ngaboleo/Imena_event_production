import Image from "next/image";
import type { EquipmentItem } from "@/types";

export function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <article className="group relative isolate flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-card bg-pine-900 p-6 text-white">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950/95 via-pine-950/35 to-transparent" />
      <h3 className="text-3xl leading-tight">{item.name}</h3>
      <p className="mt-2 max-w-xs text-white/75">{item.description}</p>
    </article>
  );
}
