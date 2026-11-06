import { EquipmentCard } from "@/components/services/EquipmentCard";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { equipment } from "@/data/equipment";

export function EquipmentSection() {
  return (
    <section aria-labelledby="equipment-title" className="bg-mist py-20 sm:py-28">
      <Container>
        <SectionTitle
          id="equipment-title"
          title="Our equipment"
          intro="The equipment we bring is selected for your venue and audience, and tested before your event begins."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => (
            <li key={item.id} className="flex">
              <EquipmentCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
