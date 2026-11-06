import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Shows your logo image when `siteConfig.logo.src` is set,
 * otherwise a text wordmark with a small level-meter mark.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { logo, name } = siteConfig;
  const src = tone === "light" && logo.lightSrc ? logo.lightSrc : logo.src;

  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)} aria-label={`${name} — home`}>
      {src ? (
        <Image src={src} alt={name} width={logo.width} height={logo.height} className="h-10 w-auto" priority />
      ) : (
        <>
          <span aria-hidden className="flex h-7 items-end gap-[3px] text-brass-500">
            {[45, 80, 100, 65, 35].map((h, i) => (
              <span key={i} className="block w-[3px] rounded-full bg-current" style={{ height: `${h}%` }} />
            ))}
          </span>
          <span
            className={cn(
              "font-display text-xl leading-none font-semibold tracking-tight whitespace-nowrap transition-colors sm:text-[1.45rem]",
              tone === "light" ? "text-white" : "text-pine-950",
            )}
          >
            {name}
          </span>
        </>
      )}
    </Link>
  );
}
