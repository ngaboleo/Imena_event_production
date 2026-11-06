import { Gallery } from "@/components/gallery/Gallery";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Work",
  description:
    "Photos and videos of IMENA EVENT PRODUCTION's event work: sound, lighting, LED screens, video and event coordination in Rwanda.",
  path: "/our-work",
});

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Events We've Helped Bring to Life"
        intro="Explore some of our previous event productions and discover how we transform spaces through professional sound, lighting, LED screens, video, and event coordination."
      />
      <section aria-label="Photo and video gallery" className="pb-8 sm:pb-12">
        <Container>
          <Gallery />
        </Container>
      </section>
      <CallToAction />
    </>
  );
}
