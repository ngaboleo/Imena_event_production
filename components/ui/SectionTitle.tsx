import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

/** Consistent section heading: serif title, short brass rule, optional intro. */
export function SectionTitle({
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className,
  id,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span
        aria-hidden
        className={cn("mb-5 block h-px w-12 bg-brass-500", align === "center" && "mx-auto")}
      />
      <Tag
        id={id}
        className={cn(
          "text-4xl leading-[1.05] sm:text-5xl",
          tone === "dark" ? "text-pine-950" : "text-white",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-muted" : "text-white/75",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
