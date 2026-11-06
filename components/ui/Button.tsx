import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "light" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass-500 text-pine-950 hover:bg-brass-400 shadow-[0_8px_24px_-10px_rgb(185_138_62/0.7)] hover:shadow-[0_12px_28px_-10px_rgb(185_138_62/0.8)]",
  secondary: "bg-pine-900 text-white hover:bg-pine-800",
  outline:
    "border border-pine-900/20 text-pine-900 hover:border-pine-900 hover:bg-pine-900 hover:text-white",
  light: "border border-white/35 text-white backdrop-blur-sm hover:bg-white hover:text-pine-950",
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
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
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
