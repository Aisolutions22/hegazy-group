import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Shared "coming soon" scaffold for routes that exist to satisfy nav links
 * but whose full content is pending client input. Keeps token discipline
 * and layout rhythm consistent with the rest of the site.
 */
export function PageStub({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  const { t } = useLanguage();
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">{title}</h1>
            </div>
          </Grid>
        </Section>

        <Section aria-label={t.common.comingSoon}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-8">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.common.comingSoon}
              </div>
              <p className="text-lg leading-relaxed text-steel-600">
                {body ?? t.common.comingSoonBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-graphite-900 px-5 text-meta font-medium text-white hover:bg-graphite-800"
                >
                  {t.common.contactUs}
                </Link>
                <Link
                  to="/"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-steel-200 bg-white px-5 text-meta font-medium text-graphite-900 hover:border-graphite-900"
                >
                  {t.common.backHome}
                </Link>
              </div>
            </div>
          </Grid>
        </Section>
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}
