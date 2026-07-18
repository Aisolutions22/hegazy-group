import { Section, Grid } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  ConstructionMark,
  ManufacturingMark,
  MarineMark,
  AutomotiveMark,
} from "@/components/icons/industry-icons";
import type { ComponentType, SVGProps } from "react";

export function IndustriesGrid() {
  const { t } = useLanguage();
  const items: Array<{
    title: string;
    href: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }> = [
    { title: t.industries.construction, href: "/industries/construction", Icon: ConstructionMark },
    { title: t.industries.manufacturing, href: "/industries/manufacturing", Icon: ManufacturingMark },
    { title: t.industries.marine, href: "/industries/marine", Icon: MarineMark },
    { title: t.industries.automotive, href: "/industries/automotive", Icon: AutomotiveMark },
  ];

  return (
    <Section className="bg-white border-y border-steel-200" aria-label={t.industriesSection.heading}>
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
          {t.industriesSection.heading}
        </div>
        <p className="text-lg leading-relaxed text-steel-600">
          {t.industriesSection.subheading}
        </p>
      </div>

      <Grid>
        {items.map(({ title, href, Icon }, i) => (
          <a
            key={title}
            href={href}
            className="group card-industry col-span-4 flex flex-col justify-between rounded-md border border-steel-200 bg-offwhite-50 p-6 transition-colors hover:border-graphite-900 sm:col-span-4 lg:col-span-3"
          >
            <div className="flex items-start justify-between text-graphite-800">
              <Icon className="h-8 w-8" />
              <span className="font-mono text-micro text-steel-400" data-spec>
                0{i + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-graphite-900">{title}</h3>
          </a>
        ))}
      </Grid>
    </Section>
  );
}
