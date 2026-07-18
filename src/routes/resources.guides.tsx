import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/resources/guides")({
  head: () => ({
    meta: [
      { title: "Selection Guides — Hegazy Group" },
      { name: "description", content: "Application-driven guidance on alloy, temper, and finish selection." },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.resources.guides} title={t.resourcesPage.guides.title} body={t.resourcesPage.guides.body} />;
}
