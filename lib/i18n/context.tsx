// lib/i18n/context.tsx
"use client";

import React, { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Locale } from "@/types/i18n";

interface I18nContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string>) => string;
  translations: Record<string, unknown>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  translations: Record<Locale, Record<string, unknown>>;
}

export function I18nProvider({ children, translations }: I18nProviderProps) {
  const pathname = usePathname();

  // ✅ Pathname'den direkt locale hesapla - state kullanma!
  const locale: Locale = useMemo(
    () => (pathname.startsWith("/en") ? "en" : "tr"),
    [pathname]
  );

  // ✅ t fonksiyonunu useMemo ile optimize et
  const t = useMemo(
    () =>
      (key: string, params?: Record<string, string>): string => {
        const parts = key.split(".");
        const localeTranslations = translations[locale];

        if (!localeTranslations) {
          console.error(`Translations not found for locale: ${locale}`);
          return key;
        }

        let value: unknown = localeTranslations;

        for (const part of parts) {
          if (value && typeof value === "object" && part in value) {
            value = (value as Record<string, unknown>)[part];
          } else {
            console.warn(
              `Translation key not found: ${key} for locale: ${locale}`
            );
            return key;
          }
        }

        if (typeof value !== "string") {
          console.warn(`Translation value is not a string: ${key}`);
          return key;
        }

        if (params) {
          return Object.keys(params).reduce((str, paramKey) => {
            return str.replace(`{{${paramKey}}}`, params[paramKey]);
          }, value);
        }

        return value;
      },
    [locale, translations]
  );

  // ✅ Context value'yu useMemo ile optimize et
  const contextValue = useMemo(
    () => ({ locale, t, translations: translations[locale] }),
    [locale, t, translations]
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return { t: context.t };
}

export function useLocale() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within an I18nProvider");
  }
  return { locale: context.locale };
}
