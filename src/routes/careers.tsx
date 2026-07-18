import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Hegazy Group" },
      { name: "description", content: "Careers at Hegazy Group." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.company.careers} title={t.footer.company.careers} />;
}
