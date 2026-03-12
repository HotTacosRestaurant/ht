import en from "@/content/en";
import es from "@/content/es";

export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";

export function getInitialLocale(): Locale {
  return DEFAULT_LOCALE;
}

export function getMessages(locale: Locale) {
  return locale === "en" ? en : es;
}