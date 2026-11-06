import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { reasons } from "@/data/highlights";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-pine-950 py-20 text-white sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionTitle
              id="why-title"
              tone="light"
              title="Why customers choose us"
              intro="Good sound is noticed only when it's missing. We make sure it never is."
            />
          </div>
        </div>
        <ul className="grid border-t border-white/10 sm:grid-cols-2 lg:col-span-8">
          {reasons.map(({ icon: Icon, title, description }) => (
            <li key={title} className="border-b border-white/10 py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
              <Icon className="size-7 text-brass-400" strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
