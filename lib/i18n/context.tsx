// lib/i18n/context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Locale } from "@/types/i18n";

interface I18nContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string>) => string;
  translations: Record<string, any>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  translations: Record<Locale, any>;
}

export function I18nProvider({ children, translations }: I18nProviderProps) {
  const pathname = usePathname();

  // ✅ useState ile locale'i yönet (force re-render için)
  const [locale, setLocale] = useState<Locale>(
    pathname.startsWith("/en") ? "en" : "tr"
  );

  // ✅ pathname değiştiğinde locale'i güncelle
  useEffect(() => {
    const newLocale: Locale = pathname.startsWith("/en") ? "en" : "tr";
    setLocale(newLocale); // ✅ State güncellemesi → Re-render tetikleniyor!
  }, [pathname]);

  const t = (key: string, params?: Record<string, string>): string => {
    // ✅ Split key into parts
    const parts = key.split(".");

    // ✅ Get the full translation object for current locale
    const localeTranslations = translations[locale];

    if (!localeTranslations) {
      console.error(`Translations not found for locale: ${locale}`);
      return key;
    }

    // ✅ Navigate through the object using the parts
    let value: any = localeTranslations;

    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = value[part];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }

    // ✅ Check if final value is a string
    if (typeof value !== "string") {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // ✅ Replace parameters if provided
    if (params) {
      return Object.keys(params).reduce((str, paramKey) => {
        return str.replace(`{{${paramKey}}}`, params[paramKey]);
      }, value);
    }

    return value;
  };

  return (
    <I18nContext.Provider
      value={{ locale, t, translations: translations[locale] }}
    >
      {children}
    </I18nContext.Provider>
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
