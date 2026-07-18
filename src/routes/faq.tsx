import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Hegazy Group" },
      { name: "description", content: "Frequently asked questions on aluminum supply, lead times, and documentation." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.resources.faq} title={t.resourcesPage.faq.title} body={t.resourcesPage.faq.body} />;
}
