import { Phone, MessageCircle, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * Persistent utility bar — always visible at every scroll position.
 * Conversion-critical: phone, WhatsApp and language switch must remain
 * one tap away without scrolling back to the top or opening a menu.
 *
 * On narrow viewports the bar drops text labels and shows icons only
 * so it never eats meaningful vertical space on mobile.
 */
export function UtilityBar() {
  const { t, lang, toggle } = useLanguage();

  return (
    <div className="w-full border-b border-graphite-800/40 bg-graphite-900 text-white">
      <div className="mx-auto flex h-9 w-full max-w-[1280px] items-center gap-6 px-6 text-legal md:h-10 md:px-8">
        <div className="ms-auto flex items-center gap-4 sm:gap-5">
          <a
            href="tel:+000000000"
            aria-label={t.phone}
            className="inline-flex items-center gap-2 text-white/85 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.phone}</span>
          </a>
          <a
            href="https://wa.me/000000000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp}
            className="inline-flex items-center gap-2 text-white/85 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.whatsapp}</span>
          </a>
          <a
            href="#locations"
            className="hidden items-center gap-2 text-white/85 hover:text-white md:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.locations}</span>
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={t.langLabel}
            className="inline-flex items-center gap-2 border-s border-white/15 ps-4 text-white/85 hover:text-white sm:ps-5"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono uppercase tracking-wider">
              {lang === "en" ? "AR" : "EN"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
