"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "ar" | "en";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  toggleLang: () => {},
  setLang: () => {},
  t: (ar) => ar,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("portfolio_lang") as Lang | null;
      if (saved === "en" || saved === "ar") {
        setLangState(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      }
    } catch {}
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("portfolio_lang", next);
    } catch {}
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const t = (ar: string, en: string) => (lang === "en" ? en : ar);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
