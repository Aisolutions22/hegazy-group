import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/resources/specs")({
  head: () => ({
    meta: [
      { title: "Technical Specifications — Hegazy Group" },
      { name: "description", content: "Mechanical properties, tolerances, and standards references by alloy family." },
    ],
  }),
  component: SpecsPage,
});

function SpecsPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.resources.specs} title={t.resourcesPage.specs.title} body={t.resourcesPage.specs.body} />;
}
