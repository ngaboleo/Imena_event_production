import { ServicesGrid } from "@/components/services/ServicesGrid";
import { EquipmentSection } from "@/components/services/EquipmentSection";
import { PackagesSection } from "@/components/services/PackagesSection";
import { PlannedServices } from "@/components/services/PlannedServices";
import { CallToAction } from "@/components/shared/CallToAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sound System Services",
  description:
    "Wedding sound systems, corporate event audio, conference microphones, private party and outdoor event sound, and professional audio equipment with setup.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        intro="Professional sound for weddings, companies and celebrations planned around your venue, your programme and your guests."
        image={{ src: "/images/services/ourservice.jpg", alt: "" }}
      />
      <section aria-label="Services" className="py-20 sm:py-28">
        <Container>
          <ServicesGrid />
        </Container>
      </section>
      <EquipmentSection />
      <PackagesSection />
      <PlannedServices />
      <CallToAction title="Not sure what you need?" text="Describe your event and we'll recommend the right setup." />
    </>
  );
}
