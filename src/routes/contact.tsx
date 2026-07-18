import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hegazy Group | RFQ, Technical, Locations" },
      {
        name: "description",
        content:
          "Reach the right desk at Hegazy Group — request a quotation, submit a technical inquiry, or view our locations.",
      },
      { property: "og:title", content: "Contact — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Procurement, technical support, and location contacts for Hegazy Group.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  const cards = [
    t.contactPage.rfq,
    t.contactPage.technical,
    t.contactPage.locations,
  ];

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        <Breadcrumbs items={[{ label: t.nav.contact }]} />
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={t.contactPage.eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.contactPage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">
                {t.contactPage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.contactPage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        {/* Routing cards */}
        <Section aria-label={t.contactPage.eyebrow}>
          <Grid>
            {cards.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                className="group col-span-4 sm:col-span-8 lg:col-span-4 flex flex-col rounded-md border border-steel-200 bg-white p-8 transition-colors hover:border-graphite-900"
              >
                <div className="font-mono text-micro uppercase tracking-caps text-steel-400" data-spec>
                  0{i + 1}
                </div>
                <h2 className="mt-6 text-xl font-semibold text-graphite-900">
                  {c.title}
                </h2>
                <p className="mt-3 flex-1 text-meta leading-relaxed text-steel-600">
                  {c.body}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-meta font-semibold text-accent-700 group-hover:text-accent-600">
                  {c.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </a>
            ))}
          </Grid>
        </Section>

        {/* Direct lines */}
        <Section
          className="bg-offwhite-50 border-t border-steel-200"
          aria-label={t.contactPage.directHeading}
        >
          <div className="mb-8 font-mono text-micro uppercase tracking-caps text-steel-400">
            {t.contactPage.directHeading}
          </div>
          <Grid>
            <DirectLine
              icon={<Phone className="h-5 w-5" aria-hidden="true" />}
              label={t.footer.contact.phone}
              value="[CLIENT-INPUT-REQUIRED]"
              href="tel:+000000000"
            />
            <DirectLine
              icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
              label={t.footer.contact.whatsapp}
              value="[CLIENT-INPUT-REQUIRED]"
              href="https://wa.me/000000000"
            />
            <DirectLine
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              label={t.footer.contact.email}
              value="[CLIENT-INPUT-REQUIRED]"
              href="mailto:info@example.com"
            />
          </Grid>
        </Section>
      </main>
      <MobileStickyQuoteBar variant="contact" />
      <SiteFooter />
    </>
  );
}

function DirectLine({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="col-span-4 sm:col-span-4 lg:col-span-4 flex items-start gap-4 border-t border-graphite-900 pt-6"
    >
      <span className="text-graphite-800">{icon}</span>
      <span className="flex-1">
        <span className="block text-caption text-steel-400" data-spec>
          {label}
        </span>
        <span className="mt-1 block text-meta text-graphite-900">{value}</span>
      </span>
    </a>
  );
}
