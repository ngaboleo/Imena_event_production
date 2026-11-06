import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

/** Consistent section heading: blue eyebrow label, bold title, optional intro. */
export function SectionTitle({ title, eyebrow, intro, align = "left", as: Tag = "h2", className, id }: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cn(align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Tag id={id} className="text-3xl leading-[1.08] text-white sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {intro && <p className="mt-5 text-lg leading-relaxed text-fog">{intro}</p>}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-electric-400 uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-electric-500" />
      {children}
    </p>
  );
}
