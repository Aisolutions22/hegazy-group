import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeHero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProductCategoryGrid } from "@/components/home/product-grid";
import { IndustriesGrid } from "@/components/home/industries-grid";
import { WhyHegazy } from "@/components/home/why-hegazy";
import { FinalCta } from "@/components/home/final-cta";
// Homepage intentionally omits the sticky mobile CTA — hero's own "Request a
// Quote" button is above the fold, and stacking a second CTA would compete.


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <main id="main-content">
        <HomeHero />
        <TrustStrip />
        <ProductCategoryGrid />
        <IndustriesGrid />
        <WhyHegazy />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
