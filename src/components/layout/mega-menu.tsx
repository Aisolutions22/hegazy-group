import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "transparent";

/**
 * Mega menu.
 * Behavior comes from Radix NavigationMenu (shadcn wrapper):
 *  - Trigger buttons expose aria-expanded and control the panel (disclosure, not role=menu).
 *  - Escape closes the open panel and returns focus to its trigger.
 *  - Click outside closes; only one panel open at a time.
 *  - Desktop pointer devices get hover-open as a progressive enhancement;
 *    click/keyboard remain the primary path.
 *  - Panels use a solid opaque surface so the transparent header state
 *    never lets page content bleed through when a menu is open.
 */

function MenuLink({
  title,
  desc,
  href,
}: {
  title: string;
  desc?: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block rounded-md p-3 transition-colors hover:bg-steel-100 focus-visible:bg-steel-100"
        >
          <div className="text-meta font-semibold text-graphite-900">{title}</div>
          {desc ? (
            <p className="mt-1 text-legal leading-snug text-steel-600">{desc}</p>
          ) : null}
        </a>
      </NavigationMenuLink>
    </li>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-3 font-mono text-micro uppercase tracking-widest text-steel-400">
      {children}
    </div>
  );
}

export function MegaMenu({ variant = "solid" }: { variant?: Variant }) {
  const { t } = useLanguage();

  // Trigger styling adapts to header background; panel content is always
  // rendered on a solid surface regardless of variant.
  const triggerBase =
    "bg-transparent text-meta font-medium data-[state=open]:bg-transparent";
  const triggerColors =
    variant === "transparent"
      ? "text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
      : "text-graphite-900 hover:bg-steel-100 focus:bg-steel-100 data-[state=open]:bg-steel-100";

  const linkColors =
    variant === "transparent"
      ? "text-white/90 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
      : "text-graphite-900 hover:bg-steel-100 focus:bg-steel-100";

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {/* Products */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(triggerBase, triggerColors)}>
            {t.nav.products}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[780px] grid-cols-4 gap-6 bg-white p-6">
              <div>
                <ColumnHeading>{t.products.profiles}</ColumnHeading>
                <ul className="space-y-1">
                  <MenuLink
                    title={t.products.profiles}
                    desc={t.products.profilesDesc}
                    href="/products/profiles"
                  />
                </ul>
              </div>
              <div>
                <ColumnHeading>{t.products.flat}</ColumnHeading>
                <ul className="space-y-1">
                  <MenuLink
                    title={t.products.sheets}
                    desc={t.products.sheetsDesc}
                    href="/products/sheets-plates"
                  />
                  <MenuLink
                    title={t.products.coils}
                    desc={t.products.coilsDesc}
                    href="/products/coils-foils"
                  />
                </ul>
              </div>
              <div>
                <ColumnHeading>{t.products.long}</ColumnHeading>
                <ul className="space-y-1">
                  <MenuLink
                    title={t.products.bars}
                    desc={t.products.barsDesc}
                    href="/products/bars-rods"
                  />
                </ul>
              </div>
              <div className="rounded-md bg-accent-100 p-4">
                <div className="mb-2 font-mono text-micro uppercase tracking-widest text-accent-700">
                  {t.products.catalog}
                </div>
                <p className="text-legal leading-snug text-graphite-800">
                  {t.products.catalogDesc}
                </p>
                <NavigationMenuLink asChild>
                  <a
                    href="/catalog"
                    className="mt-4 inline-flex items-center gap-2 text-legal font-semibold text-accent-700 hover:text-accent-600"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.products.catalogCta}
                    <ArrowRight
                      className="h-3.5 w-3.5 rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Industries */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(triggerBase, triggerColors)}>
            {t.nav.industries}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[640px] grid-cols-2 gap-2 bg-white p-6">
              <ul className="space-y-1">
                <MenuLink
                  title={t.industries.construction}
                  desc={t.industries.constructionDesc}
                  href="/industries/construction"
                />
                <MenuLink
                  title={t.industries.manufacturing}
                  desc={t.industries.manufacturingDesc}
                  href="/industries/manufacturing"
                />
              </ul>
              <ul className="space-y-1">
                <MenuLink
                  title={t.industries.marine}
                  desc={t.industries.marineDesc}
                  href="/industries/marine"
                />
                <MenuLink
                  title={t.industries.automotive}
                  desc={t.industries.automotiveDesc}
                  href="/industries/automotive"
                />
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Simple top-level links */}
        {(
          [
            { key: "projects", href: "/projects" },
            { key: "resources", href: "/resources" },
            { key: "about", href: "/about" },
          ] as const
        ).map((i) => (
          <NavigationMenuItem key={i.key}>
            <NavigationMenuLink asChild>
              <Link
                to={i.href as string}
                className={cn(
                  "inline-flex h-9 items-center rounded-md px-3 text-meta font-medium transition-colors",
                  linkColors
                )}
              >
                {t.nav[i.key]}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
