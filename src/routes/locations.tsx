import { createFileRoute } from "@tanstack/react-router";
import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — Hegazy Group" },
      { name: "description", content: "Head office and regional fulfillment hubs." },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const { t } = useLanguage();
  return <PageStub eyebrow={t.footer.company.locations} title={t.contactPage.locations.title} body={t.contactPage.locations.body} />;
}
