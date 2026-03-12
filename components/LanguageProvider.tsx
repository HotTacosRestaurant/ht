"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_LOCALE, type Locale, getMessages } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  messages: ReturnType<typeof getMessages>;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      messages: getMessages(locale),
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === "es" ? "en" : "es")),
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}