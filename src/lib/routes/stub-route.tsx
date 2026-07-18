import { PageStub } from "@/components/layout/page-stub";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Strings } from "@/lib/i18n/strings";

type StubCopy = { eyebrow: string; title: string; body?: string };

type StubOptions = {
  metaTitle: string;
  metaDescription: string;
  /** Adds `<meta name="robots" content="noindex">` — used for legal pages. */
  noindex?: boolean;
  /** Pull display copy from the active locale dictionary. */
  copy: (t: Strings) => StubCopy;
};

/**
 * Route-options factory for "coming soon" stub pages. Nine legal/resource
 * routes share this exact scaffold — hand-rolling them one by one leaks
 * head/meta drift over time.
 *
 * Usage inside a route file:
 *   export const Route = createFileRoute("/faq")(stubRouteOptions({ ... }));
 *
 * The route file still owns the literal path (TanStack's typegen relies on
 * that literal being visible at the createFileRoute call site).
 */
export function stubRouteOptions(config: StubOptions) {
  return {
    head: () => ({
      meta: [
        { title: config.metaTitle },
        { name: "description", content: config.metaDescription },
        ...(config.noindex ? [{ name: "robots", content: "noindex" }] : []),
      ],
    }),
    component: function StubRouteComponent() {
      const { t } = useLanguage();
      const c = config.copy(t);
      return <PageStub eyebrow={c.eyebrow} title={c.title} body={c.body} />;
    },
  };
}
