import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { FinalCta } from "@/components/home/final-cta";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Hegazy Group | Technical Library & Catalog" },
      {
        name: "description",
        content:
          "Technical resources for aluminum specification and procurement — catalog, specifications, selection guides, and FAQ.",
      },
      { property: "og:title", content: "Resources — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Reference material for engineers, contractors, and procurement teams.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { t } = useLanguage();
  const cards = [
    t.resourcesPage.catalog,
    t.resourcesPage.specs,
    t.resourcesPage.guides,
    t.resourcesPage.faq,
  ];

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={t.resourcesPage.eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.resourcesPage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">
                {t.resourcesPage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.resourcesPage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        <Section aria-label={t.resourcesPage.eyebrow}>
          <Grid>
            {cards.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                className="group col-span-4 sm:col-span-4 lg:col-span-6 flex flex-col rounded-md border border-steel-200 bg-white p-8 transition-colors hover:border-graphite-900"
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-micro uppercase tracking-caps text-steel-400" data-spec>
                    0{i + 1}
                  </div>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-graphite-900">
                  {c.title}
                </h2>
                <p className="mt-3 flex-1 text-meta leading-relaxed text-steel-600">
                  {c.body}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-meta font-semibold text-accent-700 group-hover:text-accent-600">
                  {c.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </a>
            ))}
          </Grid>
        </Section>

        <FinalCta />
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}
