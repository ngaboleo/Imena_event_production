import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { availableServices, getServiceBySlug } from "@/data/services";
import { whatsappUrl } from "@/lib/contact";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return availableServices.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.image?.src,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const quoteHref = `/contact${service.quoteEventType ? `?event=${encodeURIComponent(service.quoteEventType)}` : ""}#quote`;
  const waMessage = `Hello, I would like to request information about ${service.title.toLowerCase()} for my event.`;
  const others = availableServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={service.title} intro={service.shortDescription} image={service.image}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={quoteHref} size="lg">
            Book your event
          </ButtonLink>
          <ButtonLink href={whatsappUrl(waMessage)} external variant="light" size="lg">
            <SocialIcon network="whatsapp" className="size-5" /> WhatsApp us
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-display text-2xl leading-snug text-pine-950 sm:text-3xl">{service.description}</p>

            {service.features && (
              <>
                <h2 className="mt-14 text-3xl text-pine-950">What&apos;s included</h2>
                <ul className="mt-6 space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-3 text-lg">
                      <Check className="mt-1 size-5 shrink-0 text-brass-600" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-muted">
                  The exact setup depends on your venue, guest numbers and programme.
                </p>
              </>
            )}
          </div>

          <aside className="lg:col-span-5">
            {service.image && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-mist">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {service.idealFor && (
              <div className="mt-6 rounded-card bg-mist p-7">
                <h2 className="font-sans text-sm font-medium text-muted">Ideal for</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {service.idealFor.map((i) => (
                    <li key={i} className="rounded-full bg-white px-3.5 py-1.5 text-sm text-pine-950">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </section>

      <section aria-labelledby="other-services" className="bg-mist py-20 sm:py-28">
        <Container>
          <SectionTitle id="other-services" title="Other services" />
          <div className="mt-14">
            <ServicesGrid services={others} />
          </div>
        </Container>
      </section>

      <CallToAction
        title="Let's plan the sound for your event"
        primaryLabel="Request a quote"
        primaryHref={quoteHref}
        whatsappMessage={waMessage}
      />
    </>
  );
}
