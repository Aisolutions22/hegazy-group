import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/faq")(
  stubRouteOptions({
    metaTitle: "FAQ — Hegazy Group",
    metaDescription:
      "Frequently asked questions on aluminum supply, lead times, and documentation.",
    copy: (t) => ({
      eyebrow: t.footer.resources.faq,
      title: t.resourcesPage.faq.title,
      body: t.resourcesPage.faq.body,
    }),
  }),
);
