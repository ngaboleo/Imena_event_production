import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FullLogo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";
import { emailUrl, hasWhatsApp, phoneUrl, whatsappUrl } from "@/lib/contact";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-xs font-semibold tracking-[0.22em] text-electric-400 uppercase">{children}</h2>;
}

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-edge bg-night-900 text-fog">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500/60 to-transparent" />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-5">
          <FullLogo className="w-40" />
          <p className="mt-6 text-xl font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-electric-300">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm leading-relaxed">{siteConfig.summary}</p>
          <SocialLinks className="mt-7" />
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="space-y-3">
            {footerNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-4">
            <li>
              <a href={phoneUrl()} className="flex items-start gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-electric-400" /> {contact.phone}
              </a>
            </li>
            {hasWhatsApp && (
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-white"
                >
                  <SocialIcon network="whatsapp" className="mt-0.5 size-4 shrink-0 text-electric-400" />
                  WhatsApp: {contact.whatsapp}
                </a>
              </li>
            )}
            <li>
              <a href={emailUrl()} className="flex items-start gap-3 break-all transition-colors hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-electric-400" /> {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-electric-400" /> {contact.location}
            </li>
          </ul>
          <p className="mt-8 text-sm tracking-wide text-white/80">{siteConfig.serviceHighlights.join(" • ")}</p>
        </div>
      </Container>

      <div className="border-t border-edge">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <p>Kigali, Rwanda</p>
        </Container>
      </div>
    </footer>
  );
}
