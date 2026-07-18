import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Hegazy Group" },
      { name: "description", content: "Consolidated aluminum product catalog." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.products.catalog} title={t.resourcesPage.catalog.title} body={t.resourcesPage.catalog.body} />;
}
