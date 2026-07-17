import { useState } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

export function MobileNav() {
  const { t, lang, dir, toggle } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t.openMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-graphite-900 hover:bg-steel-100 lg:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side={dir === "rtl" ? "right" : "left"}
        className="w-full max-w-full p-0 sm:max-w-sm"
      >
        <SheetTitle className="sr-only">{t.menu}</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-steel-200 px-6">
            <span className="font-mono text-[13px] uppercase tracking-widest text-steel-600">
              {t.menu}
            </span>
            <button
              type="button"
              aria-label={t.closeMenu}
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-steel-100"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="products" className="border-b border-steel-200">
                <AccordionTrigger className="px-4 text-[16px] font-semibold text-graphite-900 hover:no-underline">
                  {t.nav.products}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="space-y-3 text-[15px]">
                    <li>
                      <a href="/products/profiles" className="text-steel-600 hover:text-graphite-900">
                        {t.products.profiles}
                      </a>
                    </li>
                    <li>
                      <a href="/products/sheets-plates" className="text-steel-600 hover:text-graphite-900">
                        {t.products.sheets}
                      </a>
                    </li>
                    <li>
                      <a href="/products/coils-foils" className="text-steel-600 hover:text-graphite-900">
                        {t.products.coils}
                      </a>
                    </li>
                    <li>
                      <a href="/products/bars-rods" className="text-steel-600 hover:text-graphite-900">
                        {t.products.bars}
                      </a>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {(["industries", "projects", "resources", "about"] as const).map((k) => (
                <a
                  key={k}
                  href={`/${k}`}
                  className="flex items-center justify-between border-b border-steel-200 px-4 py-4 text-[16px] font-semibold text-graphite-900 hover:bg-steel-100"
                >
                  {t.nav[k]}
                  <ChevronDown
                    className="h-4 w-4 -rotate-90 text-steel-400 rtl:rotate-90"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </Accordion>

            <div className="mt-6 space-y-3 px-4">
              <a
                href="tel:+000000000"
                className="flex items-center gap-3 text-[15px] text-steel-600 hover:text-graphite-900"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.phone}
              </a>
              <a
                href="https://wa.me/000000000"
                className="flex items-center gap-3 text-[15px] text-steel-600 hover:text-graphite-900"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.whatsapp}
              </a>
              <button
                type="button"
                onClick={toggle}
                className="mt-2 font-mono text-[13px] uppercase tracking-widest text-accent-700"
              >
                {lang === "en" ? "العربية" : "English"}
              </button>
            </div>
          </nav>

          <div className="shrink-0 border-t border-steel-200 p-4">
            <Button asChild size="lg" className="w-full">
              <a href="/quote">{t.requestQuote}</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MobileStickyQuoteBar() {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-inline-0 bottom-0 z-40 border-t border-steel-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <Button asChild size="lg" className="w-full">
        <a href="/quote">{t.requestQuote}</a>
      </Button>
    </div>
  );
}
