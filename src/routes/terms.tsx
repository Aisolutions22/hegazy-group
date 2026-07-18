import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/terms")(
  stubRouteOptions({
    metaTitle: "Terms — Hegazy Group",
    metaDescription: "Terms of use.",
    noindex: true,
    copy: (t) => ({
      eyebrow: t.footer.legal.terms,
      title: t.footer.legal.terms,
    }),
  }),
);
