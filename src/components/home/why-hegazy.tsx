import { Section } from "@/components/layout/section";
import { useLanguage } from "@/lib/i18n/language-context";

export function WhyHegazy() {
  const { t } = useLanguage();
  return (
    <Section aria-label={t.why.heading}>
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-steel-400">
          {t.why.heading}
        </div>
        <h2 className="text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] leading-tight">
          {t.why.subheading}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.items.map((item, i) => (
          <div key={item.title} className="border-t border-graphite-900 pt-6">
            <div className="font-mono text-[12px] text-steel-400" data-spec>
              0{i + 1}
            </div>
            <h3 className="mt-4 text-[18px] font-semibold text-graphite-900">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-steel-600">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
