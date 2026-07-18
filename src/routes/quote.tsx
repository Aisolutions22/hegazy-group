import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

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

const CATEGORIES = [
  { value: "profiles", labelKey: "profiles" as const },
  { value: "sheets-plates", labelKey: "sheets" as const },
  { value: "coils-foils", labelKey: "coils" as const },
  { value: "bars-rods", labelKey: "bars" as const },
];

function QuotePage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    setStatus("submitting");
    // Placeholder submission — logs the payload for now. Wire to a
    // server function / CRM endpoint when the client provides credentials.
    // eslint-disable-next-line no-console
    console.info("[RFQ] submission", payload);
    window.setTimeout(() => {
      setStatus("success");
      form.reset();
    }, 600);
  }

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
              {status === "success" ? (
                <div className="rounded-md border border-success-600/30 bg-success-600/5 p-8">
                  <CheckCircle2
                    className="h-8 w-8 text-success-600"
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-2xl font-semibold text-graphite-900">
                    {t.quotePage.successTitle}
                  </h2>
                  <p className="mt-3 text-meta leading-relaxed text-steel-600">
                    {t.quotePage.successBody}
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setStatus("idle")}
                  >
                    {t.quotePage.successReset}
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-10">
                  {/* Contact details */}
                  <fieldset className="space-y-6 border-t border-graphite-900 pt-6">
                    <legend className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
                      {t.quotePage.contactSection}
                    </legend>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field name="name" label={t.quotePage.name} required />
                      <Field name="company" label={t.quotePage.company} required />
                      <Field name="email" type="email" label={t.quotePage.email} required />
                      <Field name="phone" type="tel" label={t.quotePage.phone} />
                      <Field name="country" label={t.quotePage.country} />
                    </div>
                  </fieldset>

                  {/* Requirements */}
                  <fieldset className="space-y-6 border-t border-graphite-900 pt-6">
                    <legend className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
                      {t.quotePage.requirementsSection}
                    </legend>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="category" required>
                          {t.quotePage.category}
                        </FieldLabel>
                        <select
                          id="category"
                          name="category"
                          required
                          defaultValue=""
                          className="mt-2 h-11 w-full rounded-md border border-steel-200 bg-white px-3 text-meta text-graphite-900 focus:border-graphite-900 focus:outline-none"
                        >
                          <option value="" disabled>
                            {t.quotePage.categoryPlaceholder}
                          </option>
                          {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>
                              {t.products[c.labelKey]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Field
                        name="product"
                        label={t.quotePage.product}
                        placeholder={t.quotePage.productPlaceholder}
                      />
                      <div>
                        <FieldLabel htmlFor="quantity" required>
                          {t.quotePage.quantity}
                        </FieldLabel>
                        <input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="0"
                          step="any"
                          required
                          inputMode="decimal"
                          className="mt-2 h-11 w-full rounded-md border border-steel-200 bg-white px-3 font-mono text-meta text-graphite-900 tabular-nums focus:border-graphite-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="unit" required>
                          {t.quotePage.unit}
                        </FieldLabel>
                        <select
                          id="unit"
                          name="unit"
                          required
                          defaultValue="kg"
                          className="mt-2 h-11 w-full rounded-md border border-steel-200 bg-white px-3 text-meta text-graphite-900 focus:border-graphite-900 focus:outline-none"
                        >
                          {(
                            ["kg", "tonnes", "meters", "pieces"] as const
                          ).map((u) => (
                            <option key={u} value={u}>
                              {t.quotePage.unitOptions[u]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <FieldLabel htmlFor="notes">
                        {t.quotePage.notes}
                      </FieldLabel>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={5}
                        placeholder={t.quotePage.notesPlaceholder}
                        className="mt-2 w-full rounded-md border border-steel-200 bg-white p-3 text-meta text-graphite-900 focus:border-graphite-900 focus:outline-none"
                      />
                    </div>
                  </fieldset>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="min-w-[220px]"
                  >
                    {status === "submitting"
                      ? t.quotePage.submitting
                      : t.quotePage.submit}
                  </Button>
                </form>
              )}
            </div>

            {/* Side note */}
            <aside className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9">
              <div className="rounded-md border border-steel-200 bg-offwhite-50 p-6">
                <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                  {t.contactPage.directHeading}
                </div>
                <ul className="space-y-3 text-meta text-graphite-900">
                  <li>
                    <span className="block text-caption text-steel-400" data-spec>
                      {t.footer.contact.phone}
                    </span>
                    [CLIENT-INPUT-REQUIRED]
                  </li>
                  <li>
                    <span className="block text-caption text-steel-400" data-spec>
                      {t.footer.contact.whatsapp}
                    </span>
                    [CLIENT-INPUT-REQUIRED]
                  </li>
                  <li>
                    <span className="block text-caption text-steel-400" data-spec>
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

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-small font-semibold text-graphite-900"
    >
      {children}
      {required ? (
        <span className="ms-1 text-danger-600" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-steel-200 bg-white px-3 text-meta text-graphite-900 focus:border-graphite-900 focus:outline-none"
      />
    </div>
  );
}
