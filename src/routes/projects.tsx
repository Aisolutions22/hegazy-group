import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Section, Grid } from "@/components/layout/section";
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

const PROJECTS: Project[] = [
  { id: "p-01", code: "PRJ-2024-001", sector: "construction" },
  { id: "p-02", code: "PRJ-2024-002", sector: "manufacturing" },
  { id: "p-03", code: "PRJ-2024-003", sector: "marine" },
  { id: "p-04", code: "PRJ-2024-004", sector: "construction" },
  { id: "p-05", code: "PRJ-2023-011", sector: "automotive" },
  { id: "p-06", code: "PRJ-2023-009", sector: "construction" },
  { id: "p-07", code: "PRJ-2023-004", sector: "manufacturing" },
  { id: "p-08", code: "PRJ-2023-002", sector: "marine" },
  { id: "p-09", code: "PRJ-2022-014", sector: "automotive" },
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

  const visible = PROJECTS.filter(
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

        {/* Filter + grid */}
        <Section aria-label={t.projectsPage.eyebrow}>
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
                  className="col-span-4 sm:col-span-4 lg:col-span-4 flex flex-col overflow-hidden rounded-md border border-steel-200 bg-white"
                >
                  <div
                    aria-hidden="true"
                    className="flex aspect-[4/3] items-center justify-center border-b border-steel-200 bg-offwhite-50 font-mono text-micro uppercase tracking-caps text-steel-400"
                  >
                    {p.code}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-micro uppercase tracking-caps text-steel-400"
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
                    <h2 className="mt-4 text-xl font-semibold text-graphite-900">
                      {t.projectsPage.placeholder}
                    </h2>
                    <dl className="mt-6 divide-y divide-steel-200 border-t border-steel-200">
                      <Row
                        label={t.projectsPage.role}
                        value={t.projectsPage.roleValue}
                      />
                      <Row
                        label={t.projectsPage.location}
                        value={t.projectsPage.placeholder}
                      />
                      <Row
                        label={t.projectsPage.year}
                        value={t.projectsPage.placeholder}
                      />
                      <Row
                        label={t.projectsPage.scope}
                        value={t.projectsPage.placeholder}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-caption text-steel-400">{label}</dt>
      <dd className="text-meta text-graphite-900" data-spec>
        {value}
      </dd>
    </div>
  );
}
