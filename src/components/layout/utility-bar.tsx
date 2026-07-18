import { Phone, MessageCircle, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

type Props = {
  hidden?: boolean;
};

export function UtilityBar({ hidden }: Props) {
  const { t, lang, toggle } = useLanguage();

  return (
    <div
      aria-hidden={hidden}
      className="w-full overflow-hidden border-b border-graphite-800/40 bg-graphite-900 text-white transition-[height,opacity] duration-200 ease-out"
      style={{
        height: hidden ? 0 : "2.5rem",
        opacity: hidden ? 0 : 1,
      }}
    >
      <div className="mx-auto flex h-10 w-full max-w-[1280px] items-center gap-6 px-6 text-legal md:px-8">

        <div className="ms-auto flex items-center gap-5">
          <a
            href="tel:+000000000"
            className="inline-flex items-center gap-2 text-white/85 hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.phone}</span>
          </a>
          <a
            href="https://wa.me/000000000"
            target="_blank"
            rel="noopener noreferrer"
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
            className="inline-flex items-center gap-2 border-s border-white/15 ps-5 text-white/85 hover:text-white"
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
