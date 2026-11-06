import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/** Consistent titles, descriptions, canonical URLs and Open Graph per page. */
export function createMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const ogImage = image ?? siteConfig.ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
