import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/config/site";
import { emailUrl, phoneUrl, whatsappUrl } from "@/lib/contact";

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 py-5 first:pt-0">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brass-50 text-brass-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-0.5 text-lg text-pine-950">{children}</div>
      </div>
    </div>
  );
}

export function ContactDetails() {
  const { contact } = siteConfig;
  return (
    <div className="rounded-panel bg-white p-7 shadow-soft sm:p-9">
      <h2 className="text-3xl text-pine-950">Talk to our team</h2>
      <p className="mt-2 text-muted">The quickest way to reach us is WhatsApp or a phone call.</p>

      <div className="mt-7 divide-y divide-line">
        <Row icon={<Phone className="size-5" />} label="Phone">
          <a href={phoneUrl()} className="hover:text-brass-600">{contact.phone}</a>
        </Row>
        <Row icon={<SocialIcon network="whatsapp" className="size-5" />} label="WhatsApp">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-brass-600">
            {contact.whatsapp}
          </a>
        </Row>
        <Row icon={<Mail className="size-5" />} label="Email">
          <a href={emailUrl("Event enquiry")} className="break-all hover:text-brass-600">{contact.email}</a>
        </Row>
        <Row icon={<MapPin className="size-5" />} label="Location">
          {contact.mapUrl ? (
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass-600">
              {contact.address}
            </a>
          ) : (
            contact.address
          )}
        </Row>
        <Row icon={<Clock3 className="size-5" />} label="Operating hours">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-base">
            {contact.hours.map((h) => (
              <div key={h.days} className="contents">
                <dt className="text-muted">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </Row>
      </div>

      <div className="mt-2 border-t border-line pt-6">
        <p className="mb-3 text-sm text-muted">Follow our events</p>
        <SocialLinks />
      </div>
    </div>
  );
}
