import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ProductSummary } from "@/lib/catalog/products";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { PRODUCTS } from "@/lib/catalog/products";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$category/")({
  loader: ({ params }) => {
    const items = PRODUCTS.filter((p) => p.category === params.category);
    if (items.length === 0) throw notFound();
    return {
      category: params.category,
      categoryLabel: items[0].categoryLabel,
      items,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category not found — Hegazy Group" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.categoryLabel} — Products | Hegazy Group`;
    const desc = `${loaderData.categoryLabel} — stocked aluminum products available on release from Hegazy Group.`;
    const url = `https://hegazy-group.lovable.app/products/${loaderData.category}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoryPage,
  errorComponent: () => <CategoryNotFound />,
  notFoundComponent: () => <CategoryNotFound />,
});

function CategoryPage() {
  const { category, categoryLabel, items } = Route.useLoaderData() as {
    category: string;
    categoryLabel: string;
    items: ProductSummary[];
  };
  const { t } = useLanguage();

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Breadcrumbs
          items={[
            { label: t.nav.products, href: "/products" },
            { label: categoryLabel },
          ]}
        />
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={categoryLabel}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-legal text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                {t.categoryPage.back}
              </Link>
              <div className="mt-8 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.productsPage.eyebrow}
              </div>
              <h1 className="mt-3 text-5xl leading-tight text-white">
                {categoryLabel}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                {items.length} {t.categoryPage.resultsSuffix}
              </p>
            </div>
          </Grid>
        </Section>

        <Section aria-label={categoryLabel}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-steel-200 bg-steel-200 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <Link
                key={p.slug}
                to="/products/$category/$product"
                params={{ category, product: p.slug }}
                className="group flex flex-col justify-between bg-white p-6 transition-colors hover:bg-offwhite-50 card-product"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-caption text-steel-400" data-spec>
                      {p.code}
                    </div>
                    <AvailabilityBadge status={p.availability} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-graphite-900">
                    {p.name}
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-legal">
                    <Row label={t.productsPage.alloy} value={p.alloy} />
                    <Row label={t.productsPage.temper} value={p.temper} />
                    <Row label={t.productsPage.form} value={p.form} />
                    <Row label={t.productsPage.finish} value={p.finish} />
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
        </Section>
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
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
          : "bg-warning-600/10 text-warning-600",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isStock ? "bg-success-600" : "bg-warning-600",
        )}
      />
      {isStock ? t.productsPage.inStock : t.productsPage.onRequest}
    </span>
  );
}

function CategoryNotFound() {
  const { t } = useLanguage();
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section aria-label={t.categoryPage.notFound}>
          <h1 className="text-3xl text-graphite-900">
            {t.categoryPage.notFound}
          </h1>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 text-meta font-semibold text-accent-700"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {t.categoryPage.back}
          </Link>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
