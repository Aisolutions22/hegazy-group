import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { PRODUCTS, FILTER_GROUPS } from "@/lib/catalog/products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Hegazy Group | Aluminum Catalog" },
      {
        name: "description",
        content:
          "Aluminum profiles, sheets, plates, coils, foils, bars and rods — stocked and available on release. Filter by form, alloy family, temper, and finish.",
      },
      { property: "og:title", content: "Products — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Full aluminum catalog: profiles, flat products, long products, and coils.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useLanguage();
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section as="header" className="bg-graphite-900 text-white" aria-label={t.productsPage.eyebrow}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.productsPage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">{t.productsPage.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.productsPage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        <Section aria-label={t.productsPage.title}>
          <Grid>
            {/* Filter sidebar (static placeholder) */}
            <aside
              className="col-span-4 sm:col-span-8 lg:col-span-3"
              aria-label={t.productsPage.filters}
            >
              <div className="rounded-md border border-steel-200 bg-white p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <div className="font-mono text-micro uppercase tracking-caps text-steel-400">
                    {t.productsPage.filters}
                  </div>
                  <button
                    type="button"
                    className="text-legal text-steel-600 hover:text-graphite-900"
                  >
                    {t.productsPage.reset}
                  </button>
                </div>
                <div className="space-y-6">
                  <FilterGroup label={t.productsPage.form} options={FILTER_GROUPS.form as unknown as string[]} />
                  <FilterGroup label={t.productsPage.alloy} options={FILTER_GROUPS.alloy as unknown as string[]} />
                  <FilterGroup label={t.productsPage.temper} options={FILTER_GROUPS.temper as unknown as string[]} />
                  <FilterGroup label={t.productsPage.finish} options={FILTER_GROUPS.finish as unknown as string[]} />
                </div>
                <Button className="mt-6 w-full">
                  {t.productsPage.apply}
                </Button>
              </div>
            </aside>

            {/* Product grid */}
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-6 flex items-baseline justify-between">
                <div className="text-legal text-steel-600" data-spec>
                  {PRODUCTS.length} {t.productsPage.resultsCount}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-steel-200 bg-steel-200 sm:grid-cols-2 xl:grid-cols-3">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$category/$product"
                    params={{ category: p.category, product: p.slug }}
                    className="group flex flex-col justify-between bg-white p-6 transition-colors hover:bg-offwhite-50 card-product"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-caption text-steel-400" data-spec>
                          {p.code}
                        </div>
                        <AvailabilityBadge status={p.availability} />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-graphite-900">{p.name}</h3>
                      <div className="mt-1 text-small text-steel-600">{p.categoryLabel}</div>
                      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-legal">
                        <SpecRow label={t.productsPage.alloy} value={p.alloy} />
                        <SpecRow label={t.productsPage.temper} value={p.temper} />
                        <SpecRow label={t.productsPage.form} value={p.form} />
                        <SpecRow label={t.productsPage.finish} value={p.finish} />
                      </dl>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-legal font-semibold text-accent-700 group-hover:text-accent-600">
                      {t.productsPage.viewProduct}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Button variant="outline" disabled>
                  {t.productsPage.loadMore}
                </Button>
              </div>
            </div>
          </Grid>
        </Section>
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

function FilterGroup({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <div className="mb-2 text-small font-semibold text-graphite-900">{label}</div>
      <ul className="space-y-1.5">
        {options.map((o) => (
          <li key={o} className="flex items-center gap-2 text-legal text-steel-600">
            <input
              type="checkbox"
              aria-label={`${label}: ${o}`}
              className="h-3.5 w-3.5 rounded-sm border-steel-200"
            />
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-steel-400">{label}</dt>
      <dd className="text-graphite-900" data-spec>
        {value}
      </dd>
    </>
  );
}

function AvailabilityBadge({ status }: { status: "in-stock" | "on-request" }) {
  const { t } = useLanguage();
  const isStock = status === "in-stock";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-micro uppercase tracking-caps",
        isStock
          ? "bg-success-600/10 text-success-600"
          : "bg-warning-600/10 text-warning-600"
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", isStock ? "bg-success-600" : "bg-warning-600")}
      />
      {isStock ? t.productsPage.inStock : t.productsPage.onRequest}
    </span>
  );
}
