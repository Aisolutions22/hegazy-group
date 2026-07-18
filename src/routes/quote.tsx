import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
// Sticky mobile CTA intentionally omitted on /quote — this page IS the RFQ
// surface, so pinning a "Request a Quote" bar on top of the submit button
// would compete with (and physically overlap) the primary action.
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/rfq/step-indicator";
import {
  StepContact,
  StepProject,
  StepReview,
  StepSpec,
} from "@/components/rfq/steps";
import { SuccessPanel } from "@/components/rfq/success-panel";
import { useRfqForm } from "@/lib/rfq/use-rfq-form";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Hegazy Group | Aluminum Supply RFQ" },
      {
        name: "description",
        content:
          "Submit your aluminum specifications for a written quotation. Our team confirms availability and pricing.",
      },
      { property: "og:title", content: "Request a Quote — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Aluminum supply RFQ — alloys, tempers, dimensions, and finishes.",
      },
    ],
  }),
  component: QuotePage,
});

/**
 * Route shell for the RFQ. All state lives in `useRfqForm`; step components
 * and the success panel are presentational. Keeps this file focused on the
 * page composition — header, hero band, form column, sidebar, footer.
 */
function QuotePage() {
  const { t } = useLanguage();
  const form = useRfqForm({
    required: t.quotePage.required,
    invalidEmail: t.quotePage.invalidEmail,
    fallbackError: t.quotePage.submitError,
  });

  const stepLabels = [
    t.quotePage.steps.spec,
    t.quotePage.steps.project,
    t.quotePage.steps.contact,
    t.quotePage.steps.review,
  ];

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={t.quotePage.eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.quotePage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">
                {t.quotePage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.quotePage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        <Section aria-label={t.quotePage.eyebrow}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-8">
              {form.status === "success" ? (
                <SuccessPanel reference={form.reference} onReset={form.reset} />
              ) : (
                <>
                  <StepIndicator step={form.step} labels={stepLabels} />

                  <div className="mt-8">
                    {form.step === 0 && (
                      <StepSpec
                        data={form.data}
                        errors={form.errors}
                        set={form.set}
                      />
                    )}
                    {form.step === 1 && (
                      <StepProject
                        data={form.data}
                        errors={form.errors}
                        set={form.set}
                      />
                    )}
                    {form.step === 2 && (
                      <StepContact
                        data={form.data}
                        errors={form.errors}
                        set={form.set}
                      />
                    )}
                    {form.step === 3 && (
                      <StepReview
                        data={form.data}
                        errors={form.errors}
                        set={form.set}
                        onEdit={form.goTo}
                      />
                    )}
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-4 border-t border-steel-200 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={form.goBack}
                      disabled={form.step === 0 || form.status === "submitting"}
                    >
                      {t.quotePage.back}
                    </Button>
                    {form.step < 3 ? (
                      <Button type="button" onClick={form.goNext}>
                        {t.quotePage.next}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={form.submit}
                        disabled={form.status === "submitting"}
                        className="min-w-[200px]"
                      >
                        {form.status === "submitting"
                          ? t.quotePage.submitting
                          : t.quotePage.submit}
                      </Button>
                    )}
                  </div>

                  {form.status === "error" && form.submitError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-md border border-danger-600/40 bg-danger-600/5 p-4 text-meta text-danger-600"
                    >
                      {form.submitError}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Side note — direct-contact fallback for buyers who prefer voice. */}
            <aside className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9">
              <div className="rounded-md border border-steel-200 bg-offwhite-50 p-6">
                <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                  {t.contactPage.directHeading}
                </div>
                <ul className="space-y-3 text-meta text-graphite-900">
                  <li>
                    <span
                      className="block text-caption text-steel-400"
                      data-spec
                    >
                      {t.footer.contact.phone}
                    </span>
                    [CLIENT-INPUT-REQUIRED]
                  </li>
                  <li>
                    <span
                      className="block text-caption text-steel-400"
                      data-spec
                    >
                      {t.footer.contact.whatsapp}
                    </span>
                    [CLIENT-INPUT-REQUIRED]
                  </li>
                  <li>
                    <span
                      className="block text-caption text-steel-400"
                      data-spec
                    >
                      {t.footer.contact.email}
                    </span>
                    [CLIENT-INPUT-REQUIRED]
                  </li>
                </ul>
              </div>
            </aside>
          </Grid>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
