import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export function FinalCta() {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-graphite-900 text-white" style={{ paddingBlock: "var(--section-py)" }}>
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:grid-cols-[1.4fr_1fr] md:items-end md:px-8">
        <div>
          <h2 className="text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-tight text-white">
            {t.finalCta.title}
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">
            {t.finalCta.body}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <Button asChild size="lg" variant="secondary" className="bg-white text-graphite-900 hover:bg-white/90">
            <a href="/quote" className="inline-flex items-center gap-2">
              {t.requestQuote}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </a>
          </Button>
          <div className="text-[13px] font-mono uppercase tracking-widest text-white/50">
            {t.finalCta.or}
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[15px]">
            <a href="tel:+000000000" className="inline-flex items-center gap-2 text-white/85 hover:text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t.phone}
            </a>
            <a
              href="https://wa.me/000000000"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
