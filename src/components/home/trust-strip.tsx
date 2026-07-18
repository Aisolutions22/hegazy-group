import { Section, Grid } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";

export function TrustStrip() {
  const { t } = useLanguage();
  const stats = [
    { label: t.trust.stat1Label },
    { label: t.trust.stat2Label },
    { label: t.trust.stat3Label },
  ];

  return (
    <Section as="section" className="bg-white border-y border-steel-200" aria-label={t.trust.heading}>
      <Grid className="md:items-center">
        {/* Certifications — 4/4/6 */}
        <div className="col-span-4 sm:col-span-4 lg:col-span-6">
          <div className="mb-4 font-mono text-micro uppercase tracking-caps text-steel-400">
            {t.footer.certifications}
          </div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                aria-label={`${t.trust.cert} placeholder ${i}`}
                className="flex h-16 w-28 items-center justify-center rounded-md border border-steel-200 bg-offwhite-50 font-mono text-micro uppercase tracking-caps text-steel-600"
              >
                Cert {i}
              </div>
            ))}
          </div>
        </div>

        {/* Stats — 4/4/6, subdivided into a nested 3-up */}
        <div className="col-span-4 grid grid-cols-3 gap-4 border-steel-200 sm:col-span-4 lg:col-span-6 lg:border-s lg:ps-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-legal text-steel-400" data-spec>
                {t.trust.placeholder}
              </div>
              <div className="mt-2 text-legal font-medium leading-snug text-graphite-900">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Grid>
    </Section>
  );
}
