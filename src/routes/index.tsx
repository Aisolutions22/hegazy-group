import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeHero, heroLcpPreloadHref } from "@/components/home/hero";
import { ProductCategoryGrid } from "@/components/home/product-grid";
import { IndustriesGrid } from "@/components/home/industries-grid";
import { WhyHegazy } from "@/components/home/why-hegazy";
import { FinalCta } from "@/components/home/final-cta";
// TrustStrip (stats + certifications) intentionally omitted from the homepage
// until real numbers and certificate assets are supplied. Rendering the
// section with placeholders read as a broken layout in visual QA — better to
// hide the row entirely than to advertise "we have 4 certifications" with
// none visible. Restore <TrustStrip /> below <HomeHero /> once real data lands.
//
// Homepage also intentionally omits the sticky mobile CTA — hero's own
// "Request a Quote" button is above the fold, and stacking a second CTA
// would compete.


export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      // Preload the LCP hero (AVIF, desktop variant). Matches the <picture>
      // source order in <HomeHero />.
      {
        rel: "preload",
        as: "image",
        href: heroLcpPreloadHref,
        type: "image/avif",
        fetchpriority: "high",
      },
    ],
    meta: [
      {
        property: "og:image",
        content: "https://hegazy-group.lovable.app/og-hegazy-group.jpg",
      },
      {
        name: "twitter:image",
        content: "https://hegazy-group.lovable.app/og-hegazy-group.jpg",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <main id="main-content">
        <HomeHero />
        <ProductCategoryGrid />
        <IndustriesGrid />
        <WhyHegazy />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
