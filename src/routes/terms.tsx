import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Hegazy Group" },
      { name: "description", content: "Terms of use." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.legal.terms} title={t.footer.legal.terms} />;
}
