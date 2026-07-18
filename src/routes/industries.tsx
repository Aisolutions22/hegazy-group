import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { useLanguage } from "@/lib/i18n/language-context";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import {
  ConstructionMark,
  ManufacturingMark,
  MarineMark,
  AutomotiveMark,
} from "@/components/icons/industry-icons";
import type { ComponentType, SVGProps } from "react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Hegazy Group | Aluminum Supply & Distribution" },
      {
        name: "description",
        content:
          "Aluminum supply for construction, industrial manufacturing, marine, and automotive & transport sectors — alloys, forms, and finishes matched to each application.",
      },
      { property: "og:title", content: "Industries — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Sector-matched alloys, forms, and finishes for contractors, fabricators, and OEMs.",
      },
    ],
  }),
  component: IndustriesPage,
});

type IndustryKey = "construction" | "manufacturing" | "marine" | "automotive";

function IndustriesPage() {
  const { t } = useLanguage();

  const industries: Array<{
    key: IndustryKey;
    title: string;
    desc: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }> = [
    {
      key: "construction",
      title: t.industries.construction,
      desc: t.industries.constructionDesc,
      Icon: ConstructionMark,
    },
    {
      key: "manufacturing",
      title: t.industries.manufacturing,
      desc: t.industries.manufacturingDesc,
      Icon: ManufacturingMark,
    },
    {
      key: "marine",
      title: t.industries.marine,
      desc: t.industries.marineDesc,
      Icon: MarineMark,
    },
    {
      key: "automotive",
      title: t.industries.automotive,
      desc: t.industries.automotiveDesc,
      Icon: AutomotiveMark,
    },
  ];

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Breadcrumbs items={[{ label: t.nav.industries }]} />
        {/* Page hero */}
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={t.industriesPage.eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.industriesPage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">
                {t.industriesPage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.industriesPage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        {/* Industry detail rows */}
        {industries.map(({ key, title, desc, Icon }, i) => {
          const data = t.industriesPage[key];
          return (
            <Section
              key={key}
              className={
                i % 2 === 0
                  ? "bg-white border-b border-steel-200"
                  : "bg-offwhite-50 border-b border-steel-200"
              }
              aria-label={title}
            >
              <Grid>
                {/* Header column */}
                <div className="col-span-4 sm:col-span-8 lg:col-span-5">
                  <div className="flex items-start justify-between text-graphite-800">
                    <Icon className="h-10 w-10" />
                    <span
                      className="font-mono text-micro text-steel-400"
                      data-spec
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl leading-tight text-graphite-900">
                    {title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-steel-600">
                    {desc}
                  </p>
                </div>

                {/* Applications */}
                <div className="col-span-4 sm:col-span-4 lg:col-span-4 lg:col-start-7">
                  <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                    {t.industriesPage.applications}
                  </div>
                  <ul className="divide-y divide-steel-200 border-t border-graphite-900">
                    {data.applications.map((a) => (
                      <li
                        key={a}
                        className="py-3 text-meta text-graphite-900"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Forms + alloys */}
                <div className="col-span-4 sm:col-span-4 lg:col-span-3">
                  <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                    {t.industriesPage.commonForms}
                  </div>
                  <ul className="mb-8 space-y-2">
                    {data.forms.map((f) => (
                      <li key={f} className="text-meta text-graphite-900">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                    {t.industriesPage.commonAlloys}
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {data.alloys.map((a) => (
                      <li
                        key={a}
                        className="rounded-md border border-steel-200 bg-white px-2 py-1 font-mono text-micro text-graphite-900"
                        data-spec
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Grid>
            </Section>
          );
        })}

        <FinalCta />
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}
