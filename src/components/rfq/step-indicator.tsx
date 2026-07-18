import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Numbered progress rail shown above the active RFQ step. Purely presentational
 * — the parent owns which step is current.
 */
export function StepIndicator({
  step,
  labels,
}: {
  step: number;
  labels: string[];
}) {
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
                  state === "done" && "bg-graphite-900 text-white",
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
