import { useLanguage } from "@/lib/i18n/language-context";

export function SkipToContent() {
  const { t } = useLanguage();
  return (
    <a href="#main-content" className="skip-to-content">
      {t.skipToContent}
    </a>
  );
}
