import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Confirmation card shown after a successful RFQ submission. Displays the
 * server-issued reference and an escape hatch to file another request.
 */
export function SuccessPanel({
  reference,
  onReset,
}: {
  reference: string;
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
          {reference}
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
