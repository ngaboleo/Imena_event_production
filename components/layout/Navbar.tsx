"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site";
import { mainNav, QUOTE_HREF } from "@/data/navigation";
import { emailUrl, hasWhatsApp, phoneUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

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

  // Close the menu when the route changes.
  useEffect(() => setOpen(false), [pathname]);

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

  // Every page opens on a dark image band, so the bar starts transparent.
  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300",
          solid
            ? "border-b border-edge bg-night-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-night-950/70 to-transparent",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo priority />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm transition-colors xl:px-4 xl:text-[0.95rem]",
                    isActive(item.href) ? "text-white" : "text-white/70 hover:text-white",
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-electric-500 after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:inset-x-4",
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
              <ButtonLink href={QUOTE_HREF}>Get a Quote</ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
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
        className="fixed inset-x-0 top-[calc(5rem+env(safe-area-inset-top))] bottom-0 z-[45] overflow-y-auto bg-night-950 lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className="animate-fade-up border-b border-edge"
                style={{ animationDelay: `${i * 40}ms`, animationDuration: "0.5s" }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 text-2xl font-semibold",
                    isActive(item.href) ? "text-electric-400" : "text-white",
                  )}
                >
                  {item.label}
                  <span aria-hidden className={cn("size-1.5 rounded-full", isActive(item.href) ? "bg-electric-400" : "bg-white/15")} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3">
            <ButtonLink href={QUOTE_HREF} size="lg" className="w-full" onClick={close}>
              Get a Quote
            </ButtonLink>
            {hasWhatsApp && (
              <ButtonLink href={whatsappUrl()} external variant="whatsapp" size="lg" className="w-full" onClick={close}>
                <SocialIcon network="whatsapp" className="size-5" />
                WhatsApp us
              </ButtonLink>
            )}
          </div>

          <div className="mt-auto space-y-3 pt-10 text-fog">
            <a href={phoneUrl()} className="flex items-center gap-3 hover:text-white">
              <Phone className="size-4 text-electric-400" /> {siteConfig.contact.phone}
            </a>
            <a href={emailUrl()} className="flex items-center gap-3 break-all hover:text-white">
              <Mail className="size-4 shrink-0 text-electric-400" /> {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
