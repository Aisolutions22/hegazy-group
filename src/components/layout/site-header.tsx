import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UtilityBar } from "./utility-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "solid" | "transparent";
};

export function SiteHeader({ variant = "solid" }: Props) {
  const { t } = useLanguage();
  const scroll = useScrollDirection();

  const isTransparent = variant === "transparent" && scroll.atTop;
  // Compress the main bar only when scrolling down AND past the top.
  const collapsed = !scroll.atTop && scroll.direction === "down";



  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,color] duration-200 ease-out",
        isTransparent
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-steel-200 bg-white/95 text-graphite-900 backdrop-blur"
      )}
    >
      <UtilityBar hidden={utilityHidden} />


      <div
        className={cn(
          "mx-auto flex w-full max-w-[1280px] items-center gap-6 px-6 transition-[height] duration-200 ease-out md:px-8",
          collapsed ? "h-14" : "h-20"
        )}
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm font-mono text-legal font-bold",
              isTransparent ? "bg-white text-graphite-900" : "bg-graphite-900 text-white"
            )}
          >
            H
          </span>
          <span
            className={cn(
              "text-lg font-semibold tracking-tight",
              isTransparent ? "text-white" : "text-graphite-900"
            )}
          >
            Hegazy Group
          </span>
        </Link>

        {/* Center nav — same mega-menu component in both header states,
            re-skinned via variant. Panels always render on a solid surface. */}
        <div className="mx-auto">
          <MegaMenu variant={isTransparent ? "transparent" : "solid"} />
        </div>

        {/* End actions */}
        <div className="ms-auto flex items-center gap-2">
          <button
            type="button"
            aria-label={t.search}
            className={cn(
              "hidden h-10 w-10 items-center justify-center rounded-md transition-colors lg:inline-flex",
              isTransparent ? "hover:bg-white/10" : "hover:bg-steel-100"
            )}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <Button
            asChild
            size="default"
            variant={isTransparent ? "secondary" : "default"}
            className={cn(
              "hidden lg:inline-flex",
              isTransparent && "bg-white text-graphite-900 hover:bg-white/90"
            )}
          >
            <a href="/quote">{t.requestQuote}</a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
