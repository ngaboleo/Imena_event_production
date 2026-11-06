import { siteConfig, type SocialNetworkKey } from "@/config/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { socialUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const networks: SocialNetworkKey[] = ["instagram", "tiktok"];

const iconClasses =
  "inline-flex size-11 items-center justify-center rounded-full border border-edge text-white/80 transition-colors";

/**
 * Instagram and TikTok icons. A network is only linked once its URL is set
 * in config/site.ts; until then the icon is shown with its name but no link.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-2", className)}>
      {networks.map((key) => {
        const { label, handle } = siteConfig.social[key];
        const url = socialUrl(key);
        return (
          <li key={key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${handle} on ${label}`}
                className={cn(iconClasses, "hover:border-electric-400 hover:bg-electric-600 hover:text-white")}
              >
                <SocialIcon network={key} className="size-4" />
              </a>
            ) : (
              <span role="img" aria-label={`${label}: ${handle}`} title={`${label}: ${handle}`} className={iconClasses}>
                <SocialIcon network={key} className="size-4" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
