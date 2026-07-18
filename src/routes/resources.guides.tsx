import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/resources/guides")(
  stubRouteOptions({
    metaTitle: "Selection Guides — Hegazy Group",
    metaDescription:
      "Application-driven guidance on alloy, temper, and finish selection.",
    copy: (t) => ({
      eyebrow: t.footer.resources.guides,
      title: t.resourcesPage.guides.title,
      body: t.resourcesPage.guides.body,
    }),
  }),
);
