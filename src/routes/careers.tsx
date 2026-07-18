import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/careers")(
  stubRouteOptions({
    metaTitle: "Careers — Hegazy Group",
    metaDescription: "Careers at Hegazy Group.",
    copy: (t) => ({
      eyebrow: t.footer.company.careers,
      title: t.footer.company.careers,
    }),
  }),
);
