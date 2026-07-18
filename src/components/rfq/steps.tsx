import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  CATEGORY_KEYS,
  FORM_OPTIONS,
  TIMELINE_OPTIONS,
  UNIT_OPTIONS,
  type RfqData,
  type RfqErrors,
  type RfqStep,
  type Timeline,
  type Unit,
} from "@/lib/rfq/types";
import { SelectField, TextArea, TextField } from "./fields";

type StepProps = {
  data: RfqData;
  errors: RfqErrors;
  set: <K extends keyof RfqData>(k: K, v: RfqData[K]) => void;
};

/** Step 1 — product & specification. */
export function StepSpec({ data, errors, set }: StepProps) {
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

/** Step 2 — project details. */
export function StepProject({ data, errors, set }: StepProps) {
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

/** Step 3 — contact information. */
export function StepContact({ data, errors, set }: StepProps) {
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

/** Step 4 — review & consent. */
export function StepReview({
  data,
  errors,
  set,
  onEdit,
}: StepProps & { onEdit: (step: RfqStep) => void }) {
  const { t } = useLanguage();

  const categoryLabel = useMemo(() => {
    const found = CATEGORY_KEYS.find((c) => c.value === data.category);
    return found ? t.products[found.labelKey] : t.quotePage.empty;
  }, [data.category, t]);

  const rows: Array<{
    step: RfqStep;
    heading: string;
    items: Array<[string, string]>;
  }> = [
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
