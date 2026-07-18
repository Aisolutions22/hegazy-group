import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/catalog")(
  stubRouteOptions({
    metaTitle: "Catalog — Hegazy Group",
    metaDescription: "Consolidated aluminum product catalog.",
    copy: (t) => ({
      eyebrow: t.products.catalog,
      title: t.resourcesPage.catalog.title,
      body: t.resourcesPage.catalog.body,
    }),
  }),
);
