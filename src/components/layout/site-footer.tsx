import { useLanguage } from "@/lib/i18n/language-context";
import { Section } from "@/components/layout/section";

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const cols: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
    {
      heading: t.footer.columns.products,
      links: [
        { label: t.products.profiles, href: "/products/profiles" },
        { label: t.products.sheets, href: "/products/sheets-plates" },
        { label: t.products.coils, href: "/products/coils-foils" },
        { label: t.products.bars, href: "/products/bars-rods" },
      ],
    },
    {
      heading: t.footer.columns.industries,
      links: [
        { label: t.industries.construction, href: "/industries/construction" },
        { label: t.industries.manufacturing, href: "/industries/manufacturing" },
        { label: t.industries.marine, href: "/industries/marine" },
        { label: t.industries.automotive, href: "/industries/automotive" },
      ],
    },
    {
      heading: t.footer.columns.company,
      links: [
        { label: t.footer.company.about, href: "/about" },
        { label: t.footer.company.projects, href: "/projects" },
        { label: t.footer.company.locations, href: "/locations" },
        { label: t.footer.company.careers, href: "/careers" },
      ],
    },
    {
      heading: t.footer.columns.resources,
      links: [
        { label: t.footer.resources.catalog, href: "/catalog" },
        { label: t.footer.resources.specs, href: "/resources/specs" },
        { label: t.footer.resources.guides, href: "/resources/guides" },
        { label: t.footer.resources.faq, href: "/faq" },
      ],
    },
    {
      heading: t.footer.columns.contact,
      links: [
        { label: t.footer.contact.quote, href: "/quote" },
        { label: t.footer.contact.phone, href: "tel:+000000000" },
        { label: t.footer.contact.whatsapp, href: "https://wa.me/000000000" },
        { label: t.footer.contact.email, href: "mailto:info@example.com" },
      ],
    },
  ];

  return (
    <footer className="bg-graphite-900 text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-20">
        {/* Brand + tagline */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-white font-mono text-legal font-bold text-graphite-900"
            >
              H
            </span>
            <span className="text-lg font-semibold tracking-tight">Hegazy Group</span>
          </div>
          <p className="mt-4 text-meta leading-relaxed text-white/70">{t.footer.tagline}</p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {cols.map((c) => (
            <div key={c.heading}>
              <h3 className="mb-4 font-mono text-micro uppercase tracking-widest text-white/60">
                {c.heading}
              </h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-small text-white/85 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="mb-4 font-mono text-micro uppercase tracking-widest text-white/60">
            {t.footer.certifications}
          </h3>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                aria-label={`${t.trust.cert} placeholder ${i}`}
                className="flex h-14 w-24 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-micro uppercase tracking-widest text-white/50"
              >
                Cert {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-3 px-6 py-5 text-legal text-white/60 md:flex-row md:items-center md:px-8">
          <div>
            © {year} Hegazy Group. {t.footer.legal.rights}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-white">{t.footer.legal.privacy}</a>
            <a href="/terms" className="hover:text-white">{t.footer.legal.terms}</a>
            <a href="/cookies" className="hover:text-white">{t.footer.legal.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
