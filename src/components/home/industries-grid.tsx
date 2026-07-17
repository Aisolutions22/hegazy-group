import { Section } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";
import { Building2, Factory, Ship, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function IndustriesGrid() {
  const { t } = useLanguage();
  const items: Array<{ title: string; href: string; icon: LucideIcon }> = [
    { title: t.industries.construction, href: "/industries/construction", icon: Building2 },
    { title: t.industries.manufacturing, href: "/industries/manufacturing", icon: Factory },
    { title: t.industries.marine, href: "/industries/marine", icon: Ship },
    { title: t.industries.automotive, href: "/industries/automotive", icon: Truck },
  ];

  return (
    <Section className="bg-white border-y border-steel-200" aria-label={t.industriesSection.heading}>
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 font-mono text-micro uppercase tracking-widest text-steel-400">
          {t.industriesSection.heading}
        </div>
        <p className="text-lg leading-relaxed text-steel-600">
          {t.industriesSection.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, href, icon: Icon }) => (
          <a
            key={title}
            href={href}
            className="group flex min-h-[220px] flex-col justify-between rounded-md border border-steel-200 bg-offwhite-50 p-6 transition-colors hover:border-graphite-900"
          >
            <Icon className="h-8 w-8 text-graphite-800" aria-hidden="true" strokeWidth={1.25} />
            <h3 className="text-xl font-semibold text-graphite-900">{title}</h3>
          </a>
        ))}
      </div>
    </Section>
  );
}
