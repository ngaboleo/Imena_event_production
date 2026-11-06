import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="services-title"
          title="Sound services for every occasion"
          intro="From a wedding ceremony to a full conference programme, we match the equipment and setup to your event."
        />
        <div className="mt-16">
          <ServicesGrid />
        </div>
      </Container>
    </section>
  );
}
