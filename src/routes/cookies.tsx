import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Hegazy Group" },
      { name: "description", content: "Cookie policy." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.legal.cookies} title={t.footer.legal.cookies} />;
}
