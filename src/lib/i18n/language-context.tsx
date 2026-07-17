import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { strings, type Lang, type Strings } from "./strings";

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Strings;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "hegazy.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Read from localStorage after mount — avoid SSR mismatch
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  // Reflect to <html>
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const value: Ctx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: strings[lang],
    setLang,
    toggle,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
