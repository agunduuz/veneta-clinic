// types/i18n.ts
export type Locale = "tr" | "en";

export interface Translation {
  [key: string]: string | Translation;
}

export interface I18nConfig {
  locales: Locale[];
  defaultLocale: Locale;
}

export const i18nConfig: I18nConfig = {
  locales: ["tr", "en"],
  defaultLocale: "tr",
};
