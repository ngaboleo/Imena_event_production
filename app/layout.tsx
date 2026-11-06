import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource-variable/outfit";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Professional Sound for Weddings & Events`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Professional Sound for Weddings & Events`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#082322",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Structured data so search engines understand the business. */
function LocalBusinessJsonLd() {
  const { contact, social } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    ...(!isPlaceholder(contact.phone) && { telephone: contact.phone }),
    ...(!isPlaceholder(contact.email) && { email: contact.email }),
    ...(!isPlaceholder(contact.address) && { address: contact.address }),
    sameAs: Object.values(social).filter((u) => !isPlaceholder(u)),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-pine-950 focus:shadow-lift"
        >
          Skip to content
        </a>
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
