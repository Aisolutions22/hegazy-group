import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-warehouse.jpg";

export function HomeHero() {
  const { t } = useLanguage();
  return (
    <section className="relative isolate -mt-[calc(2.5rem+5rem)] flex min-h-[720px] w-full items-end overflow-hidden bg-graphite-900 text-white lg:min-h-[820px]">
      <img
        src={heroImg}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-graphite-900 via-graphite-900/70 to-graphite-900/40"
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.2em] text-white/70">
            <span className="inline-block h-px w-8 bg-white/40" aria-hidden="true" />
            {t.hero.eyebrow}
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="/quote" className="inline-flex items-center gap-2">
                {t.requestQuote}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="/products">{t.exploreProducts}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
