import { siteConfig } from "@/config/site";
import { SocialIcon, type SocialNetwork } from "@/components/ui/SocialIcon";
import { socialUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const networks: { key: keyof typeof siteConfig.social; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
];

export function SocialLinks({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={cn("flex gap-2", className)}>
      {networks.map(({ key, label }) => (
        <li key={key}>
          <a
            href={socialUrl(siteConfig.social[key])}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on ${label}`}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition-colors",
              tone === "light"
                ? "border-white/15 text-white/75 hover:border-brass-400 hover:text-brass-400"
                : "border-line text-pine-900 hover:border-pine-900 hover:bg-pine-900 hover:text-white",
            )}
          >
            <SocialIcon network={key as SocialNetwork} className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
