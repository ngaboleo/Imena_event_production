import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "white" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric-600 text-white hover:bg-electric-500 shadow-[0_10px_30px_-10px_rgb(47_134_255/0.8)] hover:shadow-[0_14px_36px_-10px_rgb(47_134_255/0.9)]",
  outline: "border border-white/25 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-night-950",
  ghost: "text-white hover:bg-white/10",
  white: "bg-white text-night-950 hover:bg-electric-300",
  whatsapp: "bg-[#1f9d55] text-white hover:bg-[#1a8a4a]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export function ButtonLink({ href, children, variant, size, className, external, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  // tel:, mailto: and external links are plain anchors.
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
