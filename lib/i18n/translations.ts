// lib/i18n/translations.ts
import { Locale } from "@/types/i18n";

// Static imports for initial load (layout needs these synchronously)
import trCommon from "@/locales/tr/common.json";
import enCommon from "@/locales/en/common.json";
import trHome from "@/locales/tr/home.json";
import enHome from "@/locales/en/home.json";
import trAbout from "@/locales/tr/about.json";
import enAbout from "@/locales/en/about.json";
import trContact from "@/locales/tr/contact.json";
import enContact from "@/locales/en/contact.json";
import trLaser from "@/locales/tr/laser.json";
import enLaser from "@/locales/en/laser.json";
import trHairTransplant from "@/locales/tr/hair-transplant.json";
import enHairTransplant from "@/locales/en/hair-transplant.json";
import trSurgicalAesthetics from "@/locales/tr/surgical-aesthetics.json";
import enSurgicalAesthetics from "@/locales/en/surgical-aesthetics.json";

// Pre-loaded translations for synchronous access
export const translations = {
  tr: {
    common: trCommon,
    home: trHome,
    about: trAbout,
    contact: trContact,
    laser: trLaser,
    hairTransplant: trHairTransplant,
    surgicalAesthetics: trSurgicalAesthetics,
  },
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
    laser: enLaser,
    hairTransplant: enHairTransplant,
    surgicalAesthetics: enSurgicalAesthetics,
  },
};

// Synchronous getter for layout
export function getTranslations(locale: Locale) {
  return translations[locale] || translations.tr;
}

// Helper function to get a specific translation
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}
