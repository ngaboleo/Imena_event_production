import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Waveform } from "@/components/ui/Waveform";
import type { ImageAsset } from "@/types";

interface PageHeaderProps {
  title: string;
  intro?: string;
  image?: ImageAsset;
  children?: React.ReactNode;
}

/** Dark header band used at the top of every inner page. */
export function PageHeader({ title, intro, image, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-pine-950 pt-36 pb-20 text-white sm:pt-44 sm:pb-24">
      {image && (
        <>
          <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-pine-950 via-pine-950/85 to-pine-950/40" />
        </>
      )}
      <Container>
        <div className="max-w-3xl animate-fade-up">
          <span aria-hidden className="mb-6 block h-px w-12 bg-brass-400" />
          <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
      <Waveform bars={48} className="absolute inset-x-0 bottom-0 h-10 text-white/[0.07]" />
    </section>
  );
}
