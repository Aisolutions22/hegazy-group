import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowRight } from "lucide-react";
import heroJpg from "@/assets/hero-warehouse.jpg";
import heroWebp1280 from "@/assets/hero-warehouse-1280.webp";
import heroWebp1920 from "@/assets/hero-warehouse-1920.webp";
import heroAvif1280 from "@/assets/hero-warehouse-1280.avif";
import heroAvif1920 from "@/assets/hero-warehouse-1920.avif";
import { Section } from "@/components/layout/section";

/**
 * Hero composition rules (do not regress):
 *  - Full content block (eyebrow + H1 + subcopy + BOTH CTAs) must fit above
 *    the fold at 1280×720, 1440×900, 1920×1080, 375×667, 390×844.
 *  - Content vertically centered, not bottom-anchored — headline is one of
 *    the first things seen, never scrolled to.
 *  - Header stack (40px utility bar + 80px main = 120px) sits transparently
 *    on top; the section's min-height uses 100svh capped so tall desktop
 *    monitors don't stretch the hero into an empty landscape.
 *  - Directional gradient scrim (opaque on the text side, thinner on the
 *    coils side) preserves image subject while keeping WCAG AA contrast on
 *    the text column.
 */
export function HomeHero() {
  const { t } = useLanguage();
  return (
    <section
      className="relative isolate -mt-[calc(2.5rem+5rem)] flex w-full items-center overflow-hidden bg-graphite-900 text-white"
      style={{
        // Fit-first: never taller than the viewport so content stays above
        // the fold. Floor keeps small laptops from looking cramped.
        minHeight: "min(100svh, 860px)",
      }}
    >
      <picture>
        <source
          type="image/avif"
          srcSet={`${heroAvif1280} 1280w, ${heroAvif1920} 1920w`}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={`${heroWebp1280} 1280w, ${heroWebp1920} 1920w`}
          sizes="100vw"
        />
        <img
          src={heroJpg}
          alt="Aluminum sheets, coils, and profiles stacked in a bonded distribution warehouse."
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          // Bias the crop toward the right/lower third where the coils and
          // machinery sit — puts the subject next to the text column instead
          // of showing empty ceiling above it.
          className="absolute inset-0 -z-10 h-full w-full object-cover [object-position:70%_65%]"
        />
      </picture>

      {/* Directional scrim — opaque on the start (text) side, thinner on the
          end side so the coils remain visible as the supporting subject.
          Mirrors correctly under RTL because it uses a logical direction. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to inline-end, rgba(20,24,28,0.86) 0%, rgba(20,24,28,0.72) 45%, rgba(20,24,28,0.32) 100%)",
        }}
      />
      {/* Second, vertical scrim only at the base — smooths the transition
          into the next section without stacking a full-frame darkener. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{
          background:
            "linear-gradient(to top, rgba(20,24,28,0.55), rgba(20,24,28,0))",
        }}
      />

      {/* Header-clearance offset sits on the section, NOT on the content —
          so the content stays vertically centered inside the remaining space. */}
      <Section
        as="div"
        flush
        className="w-full"
        style={{
          paddingBlockStart: "calc(2.5rem + 5rem)",
          paddingBlockEnd: "clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-3 font-mono text-caption uppercase tracking-caps text-white/75">
              <span className="inline-block h-px w-8 bg-white/50" aria-hidden="true" />
              {t.hero.eyebrow}
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-white">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* Supporting element — a single restrained spec card sitting in the
              right column so the desktop hero doesn't read as half-empty.
              Hidden below lg to keep the mobile hero compact and above-fold. */}
          <aside
            className="hidden lg:col-span-4 lg:col-start-9 lg:block"
            aria-label="Supply capability summary"
          >
            <div className="rounded-md border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
              <div className="font-mono text-caption uppercase tracking-caps text-white/60">
                Supply Profile
              </div>
              <dl className="mt-4 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-small text-white/70">Product families</dt>
                  <dd data-spec className="text-lg font-semibold text-white">
                    Profiles · Flat · Long
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-small text-white/70">Sourcing</dt>
                  <dd data-spec className="text-lg font-semibold text-white">
                    Qualified mills
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-small text-white/70">Delivery</dt>
                  <dd data-spec className="text-lg font-semibold text-white">
                    Scheduled, regional
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>
    </section>
  );
}

export { heroAvif1920 as heroLcpPreloadHref };
