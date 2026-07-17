import { Section } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";

export function WhyHegazy() {
  const { t } = useLanguage();
  return (
    <Section aria-label={t.why.heading}>
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 font-mono text-micro uppercase tracking-widest text-steel-400">
          {t.why.heading}
        </div>
        <h2 className="text-3xl leading-tight">
          {t.why.subheading}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.items.map((item, i) => (
          <div key={item.title} className="border-t border-graphite-900 pt-6">
            <div className="text-caption text-steel-400" data-spec>
              0{i + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-graphite-900">{item.title}</h3>
            <p className="mt-3 text-meta leading-relaxed text-steel-600">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
