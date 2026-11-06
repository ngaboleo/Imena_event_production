"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site";
import { mainNav, QUOTE_HREF } from "@/data/navigation";
import { phoneUrl, whatsappUrl } from "@/lib/contact";
import { cn, isPlaceholder } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; close it with Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Every page opens on a dark header band, so the bar starts transparent.
  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid
          ? "border-b border-line bg-paper/92 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo tone={solid ? "dark" : "light"} />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                  solid ? "text-ink/80 hover:text-pine-950" : "text-white/80 hover:text-white",
                  isActive(item.href) && (solid ? "text-pine-950" : "text-white"),
                  "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass-500 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive(item.href) && "after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={QUOTE_HREF}>Request a quote</ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-pine-950 hover:bg-mist" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile menu — a sibling of the header, because the header's backdrop blur
          would otherwise trap this fixed panel inside the header's box. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 z-[45] overflow-y-auto bg-paper lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pt-6 pb-10 sm:px-8">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className="animate-fade-up border-b border-line"
                style={{ animationDelay: `${i * 40}ms`, animationDuration: "0.5s" }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-3xl",
                    isActive(item.href) ? "text-brass-600" : "text-pine-950",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3">
            <ButtonLink href={QUOTE_HREF} size="lg" className="w-full" onClick={close}>
              Request a quote
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="whatsapp" size="lg" className="w-full" onClick={close}>
              <SocialIcon network="whatsapp" className="size-5" />
              WhatsApp us
            </ButtonLink>
          </div>

          {!isPlaceholder(siteConfig.contact.phone) && (
            <a href={phoneUrl()} className="mt-auto flex items-center gap-2 pt-10 text-muted">
              <Phone className="size-4" /> {siteConfig.contact.phone}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
