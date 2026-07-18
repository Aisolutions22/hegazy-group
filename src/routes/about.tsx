import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { FinalCta } from "@/components/home/final-cta";
import { useLanguage } from "@/lib/i18n/language-context";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hegazy Group | Aluminum Supply & Distribution" },
      {
        name: "description",
        content:
          "Hegazy Group is a specialist distributor of aluminum profiles, sheets, coils, and bars — sourced from qualified mills and delivered on schedule across the region.",
      },
      { property: "og:title", content: "About — Hegazy Group" },
      {
        property: "og:description",
        content:
          "A specialist aluminum distributor: sourcing, stocking, technical service, and regional logistics.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        {/* Page hero */}
        <Section as="header" className="bg-graphite-900 text-white" aria-label={t.about.eyebrow}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.about.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">{t.about.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.about.lead}
              </p>
            </div>
          </Grid>
        </Section>

        {/* Company profile + facts */}
        <Section aria-label={t.about.profileHeading}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-7">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.about.profileHeading}
              </div>
              <p className="text-lg leading-relaxed text-steel-600">
                {t.about.profileBody}
              </p>
            </div>
            <aside className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9">
              <div className="rounded-md border border-steel-200 bg-offwhite-50 p-6">
                <div className="mb-4 font-mono text-micro uppercase tracking-caps text-steel-400">
                  {t.about.factsHeading}
                </div>
                <dl className="divide-y divide-steel-200">
                  {t.about.facts.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-small text-steel-600">{f.label}</dt>
                      <dd className="text-legal text-graphite-900" data-spec>
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </Grid>
        </Section>

        {/* Capabilities */}
        <Section className="bg-white border-y border-steel-200" aria-label={t.about.capabilitiesHeading}>
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
              {t.about.capabilitiesHeading}
            </div>
            <h2 className="text-3xl leading-tight">{t.about.title}</h2>
          </div>
          <Grid>
            {t.about.capabilities.map((c, i) => (
              <div key={c.title} className="col-span-4 sm:col-span-4 lg:col-span-3 border-t border-graphite-900 pt-6">
                <div className="text-caption text-steel-400" data-spec>
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-graphite-900">{c.title}</h3>
                <p className="mt-3 text-meta leading-relaxed text-steel-600">{c.body}</p>
              </div>
            ))}
          </Grid>
        </Section>

        {/* Certifications */}
        <Section aria-label={t.footer.certifications}>
          <div className="mb-8 font-mono text-micro uppercase tracking-caps text-steel-400">
            {t.footer.certifications}
          </div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                aria-label={`${t.trust.cert} placeholder ${i}`}
                className="flex h-16 w-28 items-center justify-center rounded-md border border-steel-200 bg-offwhite-50 font-mono text-micro uppercase tracking-caps text-steel-600"
              >
                Cert {i}
              </div>
            ))}
          </div>
        </Section>

        {/* Leadership */}
        <Section className="bg-offwhite-50 border-t border-steel-200" aria-label={t.about.leadershipHeading}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-8">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.about.leadershipHeading}
              </div>
              <p className="text-lg leading-relaxed text-steel-600">{t.about.leadershipBody}</p>
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
