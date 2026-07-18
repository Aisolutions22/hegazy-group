import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { PRODUCTS, type ProductSummary } from "@/lib/catalog/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }) => {
    const product = PRODUCTS.find(
      (p) => p.category === params.category && p.slug === params.product
    );
    if (!product) throw notFound();
    const related = PRODUCTS.filter(
      (p) => p.category === product.category && p.slug !== product.slug
    ).slice(0, 3);
    return { product, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Hegazy Group" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.categoryLabel} | Hegazy Group`;
    const desc = `${product.name} (${product.code}) — Alloy ${product.alloy}, temper ${product.temper}, ${product.finish.toLowerCase()} finish. Stocked aluminum ${product.form.toLowerCase()}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: ProductNotFound,
  errorComponent: ProductError,
});

function ProductDetailPage() {
  const { product, related } = Route.useLoaderData();
  const { t } = useLanguage();

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        {/* Header */}
        <Section as="header" className="bg-graphite-900 text-white" aria-labelledby="product-name">
          <div className="mb-6 text-legal">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-mono uppercase tracking-caps text-white/60 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              {t.productDetail.backToCatalog}
            </Link>
          </div>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-micro uppercase tracking-caps text-white/60" data-spec>
                  {product.code}
                </span>
                <span className="text-white/40">·</span>
                <span className="font-mono text-micro uppercase tracking-caps text-white/60">
                  {product.categoryLabel}
                </span>
                <AvailabilityBadge status={product.availability} />
              </div>
              <h1 id="product-name" className="text-5xl leading-tight text-white">
                {product.name}
              </h1>
            </div>
          </Grid>
        </Section>

        {/* Overview + Datasheet card */}
        <Section aria-label={t.productDetail.overview}>
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-7">
              <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                {t.productDetail.overview}
              </div>
              <p className="text-lg leading-relaxed text-steel-600">
                {t.productDetail.overviewBody}
              </p>

              {/* Spec table */}
              <div className="mt-12">
                <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">
                  {t.productDetail.specTable}
                </div>
                <div className="overflow-hidden rounded-md border border-steel-200">
                  <table className="w-full text-legal">
                    <tbody className="divide-y divide-steel-200">
                      <SpecRow label={t.productDetail.spec.alloy} value={product.alloy} />
                      <SpecRow label={t.productDetail.spec.temper} value={product.temper} />
                      <SpecRow label={t.productDetail.spec.form} value={product.form} />
                      <SpecRow label={t.productDetail.spec.finish} value={product.finish} />
                      <SpecRow label={t.productDetail.spec.standard} value="[CLIENT-INPUT-REQUIRED]" />
                      <SpecRow label={t.productDetail.spec.thickness} value="[CLIENT-INPUT-REQUIRED]" />
                      <SpecRow label={t.productDetail.spec.width} value="[CLIENT-INPUT-REQUIRED]" />
                      <SpecRow label={t.productDetail.spec.length} value="[CLIENT-INPUT-REQUIRED]" />
                      <SpecRow label={t.productDetail.spec.tolerance} value="[CLIENT-INPUT-REQUIRED]" />
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-caption text-steel-400">{t.productDetail.standardsNote}</p>
              </div>
            </div>

            {/* Datasheet card */}
            <aside className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9">
              <div className="rounded-md border border-steel-200 bg-offwhite-50 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-steel-200 bg-white text-graphite-900">
                  <FileText className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-micro uppercase tracking-caps text-steel-400">
                  {t.productDetail.datasheet}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-graphite-900">{product.name}</h2>
                <p className="mt-2 text-small leading-relaxed text-steel-600">
                  {t.productDetail.datasheetBody}
                </p>
                <div className="mt-6 space-y-3">
                  <Button className="w-full" disabled>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t.productDetail.downloadPdf}
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      to="/quote"
                      search={{ product: product.slug }}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      {t.productDetail.requestQuoteFor}
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </Grid>
        </Section>

        {/* Related products */}
        {related.length > 0 && (
          <Section className="bg-white border-t border-steel-200" aria-label={t.productDetail.related}>
            <div className="mb-8 font-mono text-micro uppercase tracking-caps text-steel-400">
              {t.productDetail.related}
            </div>
            <Grid>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/products/$category/$product"
                  params={{ category: r.category, product: r.slug }}
                  className="group col-span-4 sm:col-span-4 lg:col-span-4 flex flex-col justify-between rounded-md border border-steel-200 bg-white p-6 transition-colors hover:bg-offwhite-50 card-product"
                >
                  <div>
                    <div className="text-caption text-steel-400" data-spec>
                      {r.code}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-graphite-900">{r.name}</h3>
                    <div className="mt-1 text-small text-steel-600">
                      {r.alloy} · {r.temper} · {r.finish}
                    </div>
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
            </Grid>
          </Section>
        )}
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th scope="row" className="bg-offwhite-50 px-4 py-3 text-start text-small font-medium text-steel-600">
        {label}
      </th>
      <td className="px-4 py-3 text-graphite-900" data-spec>
        {value}
      </td>
    </tr>
  );
}

function AvailabilityBadge({ status }: { status: ProductSummary["availability"] }) {
  const { t } = useLanguage();
  const isStock = status === "in-stock";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-micro uppercase tracking-caps",
        isStock ? "bg-success-600/15 text-white" : "bg-warning-600/20 text-white"
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

function ProductNotFound() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section aria-label="Not found">
          <div className="max-w-xl">
            <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">404</div>
            <h1 className="text-3xl leading-tight">Product not found</h1>
            <p className="mt-4 text-steel-600">
              The product you're looking for isn't in the catalog.
            </p>
            <Button asChild className="mt-6">
              <Link to="/products">Back to catalog</Link>
            </Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function ProductError({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Section aria-label="Error">
          <div className="max-w-xl">
            <div className="mb-3 font-mono text-micro uppercase tracking-caps text-steel-400">Error</div>
            <h1 className="text-3xl leading-tight">Something went wrong loading this product.</h1>
            <Button className="mt-6" onClick={reset}>Try again</Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
