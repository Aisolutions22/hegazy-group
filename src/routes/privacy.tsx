import { createFileRoute } from "@tanstack/react-router";
import { stubRouteOptions } from "@/lib/routes/stub-route";

export const Route = createFileRoute("/privacy")(
  stubRouteOptions({
    metaTitle: "Privacy — Hegazy Group",
    metaDescription: "Privacy policy.",
    noindex: true,
    copy: (t) => ({
      eyebrow: t.footer.legal.privacy,
      title: t.footer.legal.privacy,
    }),
  }),
);
