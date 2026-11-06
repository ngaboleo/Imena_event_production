import { Gallery } from "@/components/gallery/Gallery";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Event Gallery",
  description:
    "Photos of weddings, corporate events, private parties and outdoor events where we provided professional sound systems.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Event gallery"
        intro="Weddings, company events and celebrations we've been part of. Choose a category, then tap a photo to see it larger."
        image={{ src: "/images/services/ourservice.jpg", alt: "" }}
      />
      <section aria-label="Photo gallery" className="py-16 sm:py-24">
        <Container>
          <Gallery />
        </Container>
      </section>
      <CallToAction />
    </>
  );
}
