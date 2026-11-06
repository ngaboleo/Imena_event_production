import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Header lockup: the official emblem on a compact white tile (the logo is
 * black artwork, so it needs a light background on the dark site),
 * followed by the company name in text so it stays legible at small sizes.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { logo, name } = siteConfig;
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={`${name}, home`}>
      <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-white px-1.5 shadow-[0_6px_20px_-8px_rgb(47_134_255/0.6)] transition-transform duration-300 group-hover:scale-[1.04] sm:h-12 sm:w-16">
        <Image
          src={logo.emblem.src}
          alt=""
          width={logo.emblem.width}
          height={logo.emblem.height}
          sizes="64px"
          priority={priority}
          className="h-auto w-full"
        />
      </span>
      <span className="leading-none">
        <span className="block text-lg font-bold tracking-[0.14em] text-white sm:text-xl">IMENA</span>
        <span className="mt-1 block text-[0.6rem] font-medium tracking-[0.3em] text-fog sm:text-[0.65rem]">
          EVENT PRODUCTION
        </span>
      </span>
    </Link>
  );
}

/** The complete original logo on a white panel (footer, About page). */
export function FullLogo({ className, sizes = "176px" }: { className?: string; sizes?: string }) {
  const { logo, name } = siteConfig;
  return (
    <span className={cn("inline-flex rounded-2xl bg-white p-4", className)}>
      <Image
        src={logo.full.src}
        alt={`${name} logo`}
        width={logo.full.width}
        height={logo.full.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </span>
  );
}
