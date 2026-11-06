import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/config/site";
import { availableServices } from "@/data/services";
import { emailUrl, phoneUrl, whatsappUrl } from "@/lib/contact";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 font-sans text-sm font-medium tracking-wide text-brass-400">{children}</h2>;
}

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();
  // The first five sound services, matching the brief's footer list.
  const footerServices = availableServices.slice(0, 5);

  return (
    <footer className="bg-pine-950 text-white/75">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm leading-relaxed">
            Professional sound systems for weddings, corporate events, conferences and celebrations
             set up, tested and supported by our team.
          </p>
          <SocialLinks tone="light" className="mt-7" />
        </div>

        <nav aria-label="Quick links" className="lg:col-span-2">
          <FooterHeading>Quick links</FooterHeading>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <ul className="space-y-3">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition-colors hover:text-white">
                  {s.footerLabel ?? s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-4">
            <li>
              <a href={phoneUrl()} className="flex items-start gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brass-400" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <SocialIcon network="whatsapp" className="mt-0.5 size-4 shrink-0 text-brass-400" />
                {contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={emailUrl()} className="flex items-start gap-3 break-all transition-colors hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brass-400" /> {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass-400" /> {contact.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <p>Sound for weddings, companies and celebrations.</p>
        </Container>
      </div>
    </footer>
  );
}
