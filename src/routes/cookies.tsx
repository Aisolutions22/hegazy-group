import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/cookies")(
  stubRouteOptions({
    metaTitle: "Cookies — Hegazy Group",
    metaDescription: "Cookie policy.",
    noindex: true,
    copy: (t) => ({
      eyebrow: t.footer.legal.cookies,
      title: t.footer.legal.cookies,
    }),
  }),
);
