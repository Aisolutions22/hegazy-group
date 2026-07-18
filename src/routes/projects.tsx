import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { useLanguage } from "@/lib/i18n/language-context";
import { MobileStickyQuoteBar } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

type Sector = "construction" | "manufacturing" | "marine" | "automotive";

type Project = {
  id: string;
  code: string;
  sector: Sector;
};

/**
 * Four sample-structure cards — one per sector so the filter chips still
 * demonstrate the layout. Real project entries (name, photo, year, location,
 * scope) will replace these once the client releases them. Kept intentionally
 * small so the page reads "here's the format" instead of "wall of empty boxes."
 */
const SAMPLE_PROJECTS: Project[] = [
  { id: "sample-01", code: "PRJ-CONSTRUCTION", sector: "construction" },
  { id: "sample-02", code: "PRJ-MANUFACTURING", sector: "manufacturing" },
  { id: "sample-03", code: "PRJ-MARINE", sector: "marine" },
  { id: "sample-04", code: "PRJ-AUTOMOTIVE", sector: "automotive" },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Hegazy Group | Aluminum Supply References" },
      {
        name: "description",
        content:
          "Selected aluminum supply references across construction, industrial manufacturing, marine, and transport sectors.",
      },
      { property: "og:title", content: "Projects — Hegazy Group" },
      {
        property: "og:description",
        content:
          "Representative projects supplied by Hegazy Group across four core sectors.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Sector | "all">("all");

  const sectors: Array<{ key: Sector; label: string }> = [
    { key: "construction", label: t.industries.construction },
    { key: "manufacturing", label: t.industries.manufacturing },
    { key: "marine", label: t.industries.marine },
    { key: "automotive", label: t.industries.automotive },
  ];

  const visible = SAMPLE_PROJECTS.filter(
    (p) => filter === "all" || p.sector === filter,
  );

  return (
    <>
      <SiteHeader variant="solid" />
      <main id="main-content">
        {/* Hero */}
        <Section
          as="header"
          className="bg-graphite-900 text-white"
          aria-label={t.projectsPage.eyebrow}
        >
          <Grid>
            <div className="col-span-4 sm:col-span-8 lg:col-span-9">
              <div className="mb-4 font-mono text-micro uppercase tracking-caps text-white/60">
                {t.projectsPage.eyebrow}
              </div>
              <h1 className="text-5xl leading-tight text-white">
                {t.projectsPage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {t.projectsPage.lead}
              </p>
            </div>
          </Grid>
        </Section>

        {/* Sample-structure notice — the client sees this page as a template
            awaiting real case studies. The banner labels the placeholders as
            intentional so it does not read as a broken page. */}
        <Section aria-label={t.projectsPage.eyebrow}>
          <div
            role="note"
            aria-label={t.projectsPage.sampleBanner}
            className="mb-12 flex items-start gap-4 rounded-md border-s-4 border-warning-600 bg-warning-600/5 p-5"
          >
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-warning-600"
            />
            <div>
              <div className="font-mono text-micro uppercase tracking-caps text-warning-600">
                {t.projectsPage.sampleBanner}
              </div>
              <p className="mt-2 max-w-3xl text-meta leading-relaxed text-graphite-800">
                {t.projectsPage.sampleBannerBody}
              </p>
            </div>
          </div>

          {/* Sector filter */}
          <div
            role="tablist"
            aria-label={t.projectsPage.sector}
            className="mb-12 flex flex-wrap gap-2 border-b border-steel-200 pb-6"
          >
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              {t.projectsPage.filterAll}
            </FilterChip>
            {sectors.map((s) => (
              <FilterChip
                key={s.key}
                active={filter === s.key}
                onClick={() => setFilter(s.key)}
              >
                {s.label}
              </FilterChip>
            ))}
          </div>

          <Grid>
            {visible.map((p, i) => {
              const sectorLabel =
                sectors.find((s) => s.key === p.sector)?.label ?? "";
              return (
                <article
                  key={p.id}
                  className="col-span-4 sm:col-span-4 lg:col-span-6 flex flex-col overflow-hidden rounded-md border border-steel-200 bg-white"
                >
                  {/* Image placeholder — labeled so it reads as an intentional
                      slot for a project photograph, not a broken image. */}
                  <div
                    aria-hidden="true"
                    className="relative flex aspect-[16/9] flex-col items-center justify-center gap-3 border-b border-steel-200 bg-offwhite-50 text-steel-400"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, transparent 0 12px, rgba(124,136,144,0.06) 12px 13px)",
                    }}
                  >
                    <ImageIcon
                      className="h-8 w-8 text-steel-400"
                      strokeWidth={1.25}
                    />
                    <div className="font-mono text-micro uppercase tracking-caps">
                      {t.projectsPage.sampleImage}
                    </div>
                    <div className="absolute inset-inline-start-4 top-4 font-mono text-micro uppercase tracking-caps text-steel-400">
                      {p.code}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center rounded-sm bg-graphite-900/5 px-2 py-1 font-mono text-micro uppercase tracking-caps text-graphite-800"
                        data-spec
                      >
                        {sectorLabel}
                      </span>
                      <span
                        className="font-mono text-micro text-steel-400"
                        data-spec
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title slot — italic + steel color so it reads as
                        placeholder copy waiting on a real client name. */}
                    <h2 className="mt-4 text-xl font-semibold italic text-steel-600">
                      {t.projectsPage.sampleTitle}
                    </h2>

                    <p className="mt-3 text-meta leading-relaxed text-steel-600">
                      {t.projectsPage.sampleScope}
                    </p>

                    <dl className="mt-6 divide-y divide-steel-200 border-t border-steel-200">
                      <Row
                        label={t.projectsPage.role}
                        value={t.projectsPage.roleValue}
                        muted={false}
                      />
                      <Row
                        label={t.projectsPage.location}
                        value={t.projectsPage.placeholder}
                        muted
                      />
                      <Row
                        label={t.projectsPage.year}
                        value={t.projectsPage.placeholder}
                        muted
                      />
                    </dl>
                  </div>
                </article>
              );
            })}
          </Grid>
        </Section>

        <FinalCta />
      </main>
      <MobileStickyQuoteBar />
      <SiteFooter />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-md border px-4 py-2 text-meta transition-colors",
        active
          ? "border-graphite-900 bg-graphite-900 text-white"
          : "border-steel-200 bg-white text-graphite-900 hover:border-graphite-900",
      )}
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-caption text-steel-400">{label}</dt>
      <dd
        className={cn(
          "font-mono text-micro uppercase tracking-caps",
          muted ? "text-steel-400" : "text-graphite-900",
        )}
        data-spec
      >
        {value}
      </dd>
    </div>
  );
}
