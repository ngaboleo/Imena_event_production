import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { eventCategories } from "@/data/events";
import { QUOTE_HREF } from "@/data/navigation";
import { cn } from "@/lib/utils";

const audienceStyle: Record<string, string> = {
  Private: "text-electric-300 bg-electric-500/10",
  Corporate: "text-sky-200 bg-sky-400/10",
  Community: "text-violet-200 bg-violet-400/10",
};

/** Responsive grid of the event types we cover, plus a "your event" tile. */
export function EventsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {eventCategories.map(({ title, icon: Icon, audience }) => (
        <li
          key={title}
          className="group relative overflow-hidden rounded-card border border-edge bg-night-850 p-5 transition-colors duration-300 hover:border-electric-500/50 sm:p-6"
        >
          <div aria-hidden className="absolute -top-16 -right-16 size-32 rounded-full bg-electric-500/0 blur-2xl transition-colors duration-500 group-hover:bg-electric-500/25" />
          <Icon className="size-8 text-electric-400" strokeWidth={1.5} />
          <h3 className="mt-5 text-lg leading-snug">{title}</h3>
          <ul aria-label="Typical clients" className="mt-3 flex flex-wrap gap-1.5">
            {audience.map((a) => (
              <li key={a} className={cn("rounded-full px-2.5 py-0.5 text-xs", audienceStyle[a])}>
                {a}
              </li>
            ))}
          </ul>
        </li>
      ))}
      <li className="relative flex flex-col justify-between rounded-card border border-dashed border-electric-500/50 bg-electric-600/10 p-5 sm:p-6">
        <Plus className="size-8 text-electric-300" strokeWidth={1.5} />
        <div className="mt-5">
          <h3 className="text-lg leading-snug">Planning something else?</h3>
          <Link
            href={QUOTE_HREF}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-electric-300 after:absolute after:inset-0 after:content-['']"
          >
            Tell us about your event <ArrowRight className="size-4" />
          </Link>
        </div>
      </li>
    </ul>
  );
}
