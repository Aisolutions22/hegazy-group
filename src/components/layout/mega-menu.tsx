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

function menuLink({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block rounded-md p-3 transition-colors hover:bg-steel-100 focus-visible:bg-steel-100"
        >
          <div className="text-[15px] font-semibold text-graphite-900">{title}</div>
          <p className="mt-1 text-[13px] leading-snug text-steel-600">{desc}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export function MegaMenu() {
  const { t } = useLanguage();

  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-[15px] font-medium text-graphite-900 hover:bg-steel-100 data-[state=open]:bg-steel-100">
            {t.nav.products}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[720px] grid-cols-4 gap-6 p-6">
              <div>
                <div className="mb-3 text-[11px] font-mono uppercase tracking-widest text-steel-400">
                  {t.products.profiles}
                </div>
                <ul className="space-y-1">
                  {menuLink({
                    title: t.products.profiles,
                    desc: t.products.profilesDesc,
                    href: "/products/profiles",
                  })}
                </ul>
              </div>
              <div>
                <div className="mb-3 text-[11px] font-mono uppercase tracking-widest text-steel-400">
                  {t.products.flat}
                </div>
                <ul className="space-y-1">
                  {menuLink({
                    title: t.products.sheets,
                    desc: t.products.sheetsDesc,
                    href: "/products/sheets-plates",
                  })}
                  {menuLink({
                    title: t.products.coils,
                    desc: t.products.coilsDesc,
                    href: "/products/coils-foils",
                  })}
                </ul>
              </div>
              <div>
                <div className="mb-3 text-[11px] font-mono uppercase tracking-widest text-steel-400">
                  {t.products.long}
                </div>
                <ul className="space-y-1">
                  {menuLink({
                    title: t.products.bars,
                    desc: t.products.barsDesc,
                    href: "/products/bars-rods",
                  })}
                </ul>
              </div>
              <div className="rounded-md bg-accent-100 p-4">
                <div className="mb-2 text-[11px] font-mono uppercase tracking-widest text-accent-700">
                  {t.products.catalog}
                </div>
                <p className="text-[13px] leading-snug text-graphite-800">
                  {t.products.catalogDesc}
                </p>
                <a
                  href="/catalog"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-accent-700 hover:text-accent-600"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.products.catalogCta}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </a>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {(
          [
            { key: "industries", href: "/industries" },
            { key: "projects", href: "/projects" },
            { key: "resources", href: "/resources" },
            { key: "about", href: "/about" },
          ] as const
        ).map((i) => (
          <NavigationMenuItem key={i.key}>
            <NavigationMenuLink asChild>
              <Link
                to={i.href as string}
                className="inline-flex h-9 items-center rounded-md px-3 text-[15px] font-medium text-graphite-900 transition-colors hover:bg-steel-100"
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
