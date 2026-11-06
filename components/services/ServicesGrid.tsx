import { ServiceCard } from "@/components/services/ServiceCard";
import { availableServices } from "@/data/services";
import type { Service } from "@/types";

export function ServicesGrid({ services = availableServices }: { services?: Service[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug} className="flex">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
