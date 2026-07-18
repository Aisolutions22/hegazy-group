import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/resources/specs")(
  stubRouteOptions({
    metaTitle: "Technical Specifications — Hegazy Group",
    metaDescription:
      "Mechanical properties, tolerances, and standards references by alloy family.",
    copy: (t) => ({
      eyebrow: t.footer.resources.specs,
      title: t.resourcesPage.specs.title,
      body: t.resourcesPage.specs.body,
    }),
  }),
);
