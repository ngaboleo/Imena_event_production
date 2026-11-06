import { ServiceCard } from "@/components/services/ServiceCard";
import { services as allServices } from "@/data/services";
import type { Service } from "@/types";

export function ServicesGrid({ services = allServices }: { services?: Service[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {services.map((service, i) => (
        <li key={service.slug} className="flex">
          <ServiceCard service={service} index={i} />
        </li>
      ))}
    </ul>
  );
}
