import { Link } from "@tanstack/react-router";
import hegazyLogo from "@/assets/hegazy-logo.png";
// Search icon removed — see comment on the end-actions block below.
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
      <UtilityBar />


      <div
        className={cn(
          "mx-auto flex w-full max-w-[1280px] items-center gap-6 px-6 transition-[height] duration-200 ease-out md:px-8",
          collapsed ? "h-14" : "h-20"
        )}
      >
        {/* Logo — full uploaded lockup (mark + wordmark). Rendered uncropped
            via object-contain at a fixed header height with auto width so the
            image's natural aspect ratio is preserved. No zoom, no focal
            adjustment. The image already contains the "Hegazy Group"
            wordmark, so no adjacent text span is rendered. */}
        <Link to="/" className="inline-flex items-center gap-3" aria-label="Hegazy Group — Home">
          <img
            src={hegazyLogo}
            alt=""
            aria-hidden="true"
            className={cn(
              "h-10 w-auto object-contain",
              isTransparent && "brightness-0 invert"
            )}
          />
          <span className="font-semibold tracking-tight text-body">Hegazy Group</span>
        </Link>

        {/* Center nav — same mega-menu component in both header states,
            re-skinned via variant. Panels always render on a solid surface. */}
        <div className="mx-auto">
          <MegaMenu variant={isTransparent ? "transparent" : "solid"} />
        </div>

        {/* End actions — site-wide search intentionally omitted for now.
            A real search surface is worth building once product and resource
            content is dense enough to justify it; a decorative icon that
            didn't do anything read as broken in QA. */}
        <div className="ms-auto flex items-center gap-2">
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
