import Image from "next/image";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";
import type { ImageAsset } from "@/types";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  image?: ImageAsset;
  /** CSS object-position for the background image, e.g. "50% 30%". */
  imagePosition?: string;
  children?: React.ReactNode;
}

/** Dark header band used at the top of every inner page. */
export function PageHeader({ title, eyebrow, intro, image, imagePosition, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 pt-36 pb-16 sm:pt-44 sm:pb-24">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 animate-hero-zoom object-cover opacity-50"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950 via-night-950/85 to-night-950/40" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-night-950 to-transparent" />
        </>
      ) : (
        <>
          <div aria-hidden className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute -top-40 -left-20 -z-10 size-[36rem] rounded-full bg-electric-600/20 blur-3xl" />
        </>
      )}
      <Container>
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-fog sm:text-xl">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
