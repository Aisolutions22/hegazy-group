import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  ConstructionMark,
  ManufacturingMark,
  MarineMark,
  AutomotiveMark,
} from "@/components/icons/industry-icons";
import { ArrowLeft } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const SECTORS = ["construction", "manufacturing", "marine", "automotive"] as const;
type Sector = (typeof SECTORS)[number];

const ICONS: Record<Sector, ComponentType<SVGProps<SVGSVGElement>>> = {
  construction: ConstructionMark,
  manufacturing: ManufacturingMark,
  marine: MarineMark,
  automotive: AutomotiveMark,
};

export const Route = createFileRoute("/industries/$sector")({
  loader: ({ params }) => {
    if (!(SECTORS as readonly string[]).includes(params.sector)) {
      throw notFound();
    }
    return { sector: params.sector as Sector };
  },
  head: ({ params }) => ({
    meta: [
      { title: `${cap(params.sector)} — Industries | Hegazy Group` },
      {
        name: "description",
        content: `Aluminum supply for the ${params.sector} sector — alloys, forms, and applications.`,
      },
    ],
  }),
  component: SectorPage,
  errorComponent: () => <SectorNotFound />,
  notFoundComponent: () => <SectorNotFound />,
});

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SectorPage() {
  const { sector } = Route.useLoaderData() as { sector: Sector };
  const { t } = useLanguage();
  const Icon = ICONS[sector];
  const data = t.industriesPage[sector];
  const title = t.industries[sector];
  const descKey = `${sector}Desc` as const;
  const desc = t.industries[descKey];

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Breadcrumbs
          items={[
            { label: t.nav.industries, href: "/industries" },
            { label: title },
          ]}
        />
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={title}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-legal text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {t.sectorPage.back}
              </Link>
              <div className="mt-8 flex items-start justify-between text-white">
                <Icon className="h-12 w-12" />
              </div>
              <h1 className="mt-6 text-5xl leading-tight text-white">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {desc}
              </p>
            </div>
          </Grid>
        </Section>

        <Section aria-label={title}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-6">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.industriesPage.applications}
              </div>
              <ul className="divide-y divide-steel-200 border-t border-graphite-900">
                {data.applications.map((a) => (
                  <li key={a} className="py-4 text-meta text-graphite-900">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 sm:col-span-4 lg:col-span-3">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.industriesPage.commonForms}
              </div>
              <ul className="space-y-2 border-t border-graphite-900 pt-4">
                {data.forms.map((f) => (
                  <li key={f} className="text-meta text-graphite-900">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 sm:col-span-4 lg:col-span-3">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.industriesPage.commonAlloys}
              </div>
              <ul className="flex flex-wrap gap-2 border-t border-graphite-900 pt-4">
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

        <FinalCta />
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

function SectorNotFound() {
  const { t } = useLanguage();
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section aria-label={t.sectorPage.notFound}>
          <h1 className="text-3xl text-graphite-900">{t.sectorPage.notFound}</h1>
          <Link
            to="/industries"
            className="mt-6 inline-flex items-center gap-2 text-meta font-semibold text-accent-700"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {t.sectorPage.back}
          </Link>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
