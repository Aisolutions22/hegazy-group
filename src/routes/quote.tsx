import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Unit = "kg" | "tonnes" | "meters" | "pieces";
type Timeline = "urgent" | "month" | "quarter" | "planning";

type RfqData = {
  category: string;
  product: string;
  form: string;
  alloy: string;
  temper: string;
  finish: string;
  dimensions: string;
  quantity: string;
  unit: Unit;
  useCase: string;
  timeline: Timeline | "";
  destination: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  consent: boolean;
};

const INITIAL: RfqData = {
  category: "",
  product: "",
  form: "",
  alloy: "",
  temper: "",
  finish: "",
  dimensions: "",
  quantity: "",
  unit: "kg",
  useCase: "",
  timeline: "",
  destination: "",
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  country: "",
  consent: false,
};

const CATEGORY_KEYS = [
  { value: "profiles", labelKey: "profiles" as const },
  { value: "sheets-plates", labelKey: "sheets" as const },
  { value: "coils-foils", labelKey: "coils" as const },
  { value: "bars-rods", labelKey: "bars" as const },
];

const FORM_OPTIONS = ["Profile", "Sheet", "Plate", "Coil", "Foil", "Bar", "Rod"];
const UNIT_OPTIONS: Unit[] = ["kg", "tonnes", "meters", "pieces"];
const TIMELINE_OPTIONS: Timeline[] = ["urgent", "month", "quarter", "planning"];

function generateRef(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `RFQ-${ymd}-${suffix}`;
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

function QuotePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [data, setData] = useState<RfqData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof RfqData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [refId, setRefId] = useState<string>("");

  const stepLabels = [
    t.quotePage.steps.spec,
    t.quotePage.steps.project,
    t.quotePage.steps.contact,
    t.quotePage.steps.review,
  ];

  const set = <K extends keyof RfqData>(key: K, value: RfqData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validateStep(s: number): boolean {
    const next: Partial<Record<keyof RfqData, string>> = {};
    if (s === 0) {
      if (!data.category) next.category = t.quotePage.required;
      if (!data.alloy.trim()) next.alloy = t.quotePage.required;
    } else if (s === 1) {
      if (!data.quantity.trim() || Number(data.quantity) <= 0)
        next.quantity = t.quotePage.required;
      if (!data.timeline) next.timeline = t.quotePage.required;
    } else if (s === 2) {
      if (!data.name.trim()) next.name = t.quotePage.required;
      if (!data.company.trim()) next.company = t.quotePage.required;
      if (!data.email.trim()) next.email = t.quotePage.required;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        next.email = t.quotePage.invalidEmail;
    } else if (s === 3) {
      if (!data.consent) next.consent = t.quotePage.required;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => (Math.min(3, s + 1) as 0 | 1 | 2 | 3));
  }
  function goBack() {
    setStep((s) => (Math.max(0, s - 1) as 0 | 1 | 2 | 3));
  }

  function submit() {
    if (!validateStep(3)) return;
    setStatus("submitting");
    const ref = generateRef();
    // Placeholder submission — logs the payload. Wire to server fn / CRM later.
    // eslint-disable-next-line no-console
    console.info("[RFQ] submission", { ref, ...data });
    window.setTimeout(() => {
      setRefId(ref);
      setStatus("success");
    }, 700);
  }

  function reset() {
    setData(INITIAL);
    setErrors({});
    setStep(0);
    setRefId("");
    setStatus("idle");
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
                <SuccessPanel refId={refId} onReset={reset} />
              ) : (
                <>
                  <StepIndicator step={step} labels={stepLabels} />

                  <div className="mt-8">
                    {step === 0 && (
                      <StepSpec data={data} errors={errors} set={set} />
                    )}
                    {step === 1 && (
                      <StepProject data={data} errors={errors} set={set} />
                    )}
                    {step === 2 && (
                      <StepContact data={data} errors={errors} set={set} />
                    )}
                    {step === 3 && (
                      <StepReview
                        data={data}
                        errors={errors}
                        set={set}
                        onEdit={(target) =>
                          setStep(target as 0 | 1 | 2 | 3)
                        }
                      />
                    )}
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-4 border-t border-steel-200 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      disabled={step === 0 || status === "submitting"}
                    >
                      {t.quotePage.back}
                    </Button>
                    {step < 3 ? (
                      <Button type="button" onClick={goNext}>
                        {t.quotePage.next}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={submit}
                        disabled={status === "submitting"}
                        className="min-w-[200px]"
                      >
                        {status === "submitting"
                          ? t.quotePage.submitting
                          : t.quotePage.submit}
                      </Button>
                    )}
                  </div>
                </>
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
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

// -----------------------------------------------------------------------------
// Step indicator
// -----------------------------------------------------------------------------

function StepIndicator({ step, labels }: { step: number; labels: string[] }) {
  const { t } = useLanguage();
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <div className="font-mono text-micro uppercase tracking-caps text-steel-400">
          {t.quotePage.stepLabel} {step + 1} {t.quotePage.of} {labels.length}
        </div>
        <div className="text-small font-semibold text-graphite-900">
          {labels[step]}
        </div>
      </div>
      <ol className="flex items-center gap-2" aria-label="Progress">
        {labels.map((label, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-micro",
                  state === "done" &&
                    "bg-graphite-900 text-white",
                  state === "current" &&
                    "border border-graphite-900 bg-white text-graphite-900",
                  state === "todo" &&
                    "border border-steel-200 bg-white text-steel-400",
                )}
                aria-current={state === "current" ? "step" : undefined}
              >
                {state === "done" ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  i + 1
                )}
              </div>
              {i < labels.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1",
                    i < step ? "bg-graphite-900" : "bg-steel-200",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Steps
// -----------------------------------------------------------------------------

type StepProps = {
  data: RfqData;
  errors: Partial<Record<keyof RfqData, string>>;
  set: <K extends keyof RfqData>(k: K, v: RfqData[K]) => void;
};

function StepSpec({ data, errors, set }: StepProps) {
  const { t } = useLanguage();
  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
        {t.quotePage.specHeading}
      </legend>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          name="category"
          label={t.quotePage.category}
          value={data.category}
          onChange={(v) => set("category", v)}
          required
          error={errors.category}
          placeholder={t.quotePage.categoryPlaceholder}
        >
          {CATEGORY_KEYS.map((c) => (
            <option key={c.value} value={c.value}>
              {t.products[c.labelKey]}
            </option>
          ))}
        </SelectField>
        <TextField
          name="product"
          label={t.quotePage.product}
          value={data.product}
          onChange={(v) => set("product", v)}
          placeholder={t.quotePage.productPlaceholder}
        />
        <SelectField
          name="form"
          label={t.quotePage.form}
          value={data.form}
          onChange={(v) => set("form", v)}
          placeholder={t.quotePage.formPlaceholder}
        >
          {FORM_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </SelectField>
        <TextField
          name="alloy"
          label={t.quotePage.alloy}
          value={data.alloy}
          onChange={(v) => set("alloy", v)}
          required
          error={errors.alloy}
          placeholder={t.quotePage.alloyPlaceholder}
          mono
        />
        <TextField
          name="temper"
          label={t.quotePage.temper}
          value={data.temper}
          onChange={(v) => set("temper", v)}
          placeholder={t.quotePage.temperPlaceholder}
          mono
        />
        <TextField
          name="finish"
          label={t.quotePage.finish}
          value={data.finish}
          onChange={(v) => set("finish", v)}
          placeholder={t.quotePage.finishPlaceholder}
        />
      </div>
      <TextArea
        name="dimensions"
        label={t.quotePage.dimensions}
        value={data.dimensions}
        onChange={(v) => set("dimensions", v)}
        placeholder={t.quotePage.dimensionsPlaceholder}
      />
    </fieldset>
  );
}

function StepProject({ data, errors, set }: StepProps) {
  const { t } = useLanguage();
  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
        {t.quotePage.projectHeading}
      </legend>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextField
          name="quantity"
          label={t.quotePage.quantity}
          value={data.quantity}
          onChange={(v) => set("quantity", v)}
          required
          error={errors.quantity}
          type="number"
          mono
        />
        <SelectField
          name="unit"
          label={t.quotePage.unit}
          value={data.unit}
          onChange={(v) => set("unit", v as Unit)}
          required
        >
          {UNIT_OPTIONS.map((u) => (
            <option key={u} value={u}>
              {t.quotePage.unitOptions[u]}
            </option>
          ))}
        </SelectField>
        <SelectField
          name="timeline"
          label={t.quotePage.timeline}
          value={data.timeline}
          onChange={(v) => set("timeline", v as Timeline)}
          required
          error={errors.timeline}
          placeholder={t.quotePage.timelinePlaceholder}
        >
          {TIMELINE_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {t.quotePage.timelineOptions[k]}
            </option>
          ))}
        </SelectField>
        <TextField
          name="destination"
          label={t.quotePage.destination}
          value={data.destination}
          onChange={(v) => set("destination", v)}
          placeholder={t.quotePage.destinationPlaceholder}
        />
      </div>
      <TextArea
        name="useCase"
        label={t.quotePage.useCase}
        value={data.useCase}
        onChange={(v) => set("useCase", v)}
        placeholder={t.quotePage.useCasePlaceholder}
      />
    </fieldset>
  );
}

function StepContact({ data, errors, set }: StepProps) {
  const { t } = useLanguage();
  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
        {t.quotePage.contactHeading}
      </legend>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextField
          name="name"
          label={t.quotePage.name}
          value={data.name}
          onChange={(v) => set("name", v)}
          required
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          name="company"
          label={t.quotePage.company}
          value={data.company}
          onChange={(v) => set("company", v)}
          required
          error={errors.company}
          autoComplete="organization"
        />
        <TextField
          name="role"
          label={t.quotePage.role}
          value={data.role}
          onChange={(v) => set("role", v)}
          autoComplete="organization-title"
        />
        <TextField
          name="email"
          type="email"
          label={t.quotePage.email}
          value={data.email}
          onChange={(v) => set("email", v)}
          required
          error={errors.email}
          autoComplete="email"
        />
        <TextField
          name="phone"
          type="tel"
          label={t.quotePage.phone}
          value={data.phone}
          onChange={(v) => set("phone", v)}
          autoComplete="tel"
        />
        <TextField
          name="country"
          label={t.quotePage.country}
          value={data.country}
          onChange={(v) => set("country", v)}
          autoComplete="country-name"
        />
      </div>
    </fieldset>
  );
}

function StepReview({
  data,
  errors,
  set,
  onEdit,
}: StepProps & { onEdit: (step: number) => void }) {
  const { t } = useLanguage();

  const categoryLabel = useMemo(() => {
    const found = CATEGORY_KEYS.find((c) => c.value === data.category);
    return found ? t.products[found.labelKey] : t.quotePage.empty;
  }, [data.category, t]);

  const rows: Array<{ step: number; heading: string; items: Array<[string, string]> }> = [
    {
      step: 0,
      heading: t.quotePage.steps.spec,
      items: [
        [t.quotePage.category, categoryLabel],
        [t.quotePage.product, data.product || t.quotePage.empty],
        [t.quotePage.form, data.form || t.quotePage.empty],
        [t.quotePage.alloy, data.alloy || t.quotePage.empty],
        [t.quotePage.temper, data.temper || t.quotePage.empty],
        [t.quotePage.finish, data.finish || t.quotePage.empty],
        [t.quotePage.dimensions, data.dimensions || t.quotePage.empty],
      ],
    },
    {
      step: 1,
      heading: t.quotePage.steps.project,
      items: [
        [
          t.quotePage.quantity,
          data.quantity
            ? `${data.quantity} ${t.quotePage.unitOptions[data.unit]}`
            : t.quotePage.empty,
        ],
        [
          t.quotePage.timeline,
          data.timeline
            ? t.quotePage.timelineOptions[data.timeline]
            : t.quotePage.empty,
        ],
        [t.quotePage.destination, data.destination || t.quotePage.empty],
        [t.quotePage.useCase, data.useCase || t.quotePage.empty],
      ],
    },
    {
      step: 2,
      heading: t.quotePage.steps.contact,
      items: [
        [t.quotePage.name, data.name || t.quotePage.empty],
        [t.quotePage.company, data.company || t.quotePage.empty],
        [t.quotePage.role, data.role || t.quotePage.empty],
        [t.quotePage.email, data.email || t.quotePage.empty],
        [t.quotePage.phone, data.phone || t.quotePage.empty],
        [t.quotePage.country, data.country || t.quotePage.empty],
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 font-mono text-micro uppercase tracking-caps text-steel-400">
          {t.quotePage.reviewHeading}
        </div>
        <p className="text-meta leading-relaxed text-steel-600">
          {t.quotePage.reviewLead}
        </p>
      </div>

      {rows.map((row) => (
        <div
          key={row.step}
          className="rounded-md border border-steel-200 bg-white p-6"
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-small font-semibold text-graphite-900">
              {row.heading}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="text-legal font-semibold text-accent-700 hover:text-accent-600"
            >
              {t.quotePage.edit}
            </button>
          </div>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {row.items.map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-caption text-steel-400">{k}</dt>
                <dd className="text-meta text-graphite-900" data-spec>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <label className="flex items-start gap-3 text-meta text-graphite-900">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 rounded-sm border-steel-200"
          aria-invalid={errors.consent ? true : undefined}
        />
        <span>{t.quotePage.consent}</span>
      </label>
      {errors.consent && (
        <p className="text-legal text-danger-600" role="alert">
          {errors.consent}
        </p>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Success
// -----------------------------------------------------------------------------

function SuccessPanel({
  refId,
  onReset,
}: {
  refId: string;
  onReset: () => void;
}) {
  const { t } = useLanguage();
  return (
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
      <div className="mt-6 inline-flex flex-col rounded-md border border-steel-200 bg-white px-5 py-4">
        <span className="font-mono text-micro uppercase tracking-caps text-steel-400">
          {t.quotePage.successRef}
        </span>
        <span className="mt-1 font-mono text-lg text-graphite-900" data-spec>
          {refId}
        </span>
      </div>
      <div className="mt-6">
        <Button variant="outline" onClick={onReset}>
          {t.quotePage.successReset}
        </Button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Field primitives
// -----------------------------------------------------------------------------

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

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-legal text-danger-600" role="alert">
      {msg}
    </p>
  );
}

function TextField({
  name,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  error,
  mono,
  autoComplete,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  mono?: boolean;
  autoComplete?: string;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        inputMode={type === "number" ? "decimal" : undefined}
        min={type === "number" ? 0 : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
          mono && "font-mono tabular-nums",
        )}
      />
      <FieldError msg={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  error,
  children,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
        )}
      >
        {placeholder !== undefined && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <FieldError msg={error} />
    </div>
  );
}

function TextArea({
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        aria-invalid={error ? true : undefined}
        className={cn(
          "mt-2 w-full rounded-md border bg-white p-3 text-meta text-graphite-900 focus:outline-none",
          error
            ? "border-danger-600 focus:border-danger-600"
            : "border-steel-200 focus:border-graphite-900",
        )}
      />
      <FieldError msg={error} />
    </div>
  );
}
