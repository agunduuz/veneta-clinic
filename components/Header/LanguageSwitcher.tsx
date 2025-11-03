// components/Header/LanguageSwitcher.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";
import { getTranslatedRoute } from "@/lib/i18n/route-map";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (newLocale: "tr" | "en") => {
    console.log("\n🌍 === LANGUAGE SWITCH DEBUG ===");
    console.log("Current locale:", locale);
    console.log("Target locale:", newLocale);
    console.log("Current pathname:", pathname);

    if (newLocale === locale) {
      console.log("⚠️ Same locale, skipping...");
      console.log("================================\n");
      setIsOpen(false);
      return;
    }

    // Get translated route directly using pathname
    const translatedPath = getTranslatedRoute(pathname, locale, newLocale);

    console.log("✅ Translated path:", translatedPath);
    console.log("🚀 Navigating...");
    console.log("================================\n");

    // Navigate to translated route
    router.push(translatedPath);
    setIsOpen(false);
  };

  const languages = [
    {
      code: "tr" as const,
      label: "Türkçe",
      flag: "🇹🇷",
    },
    {
      code: "en" as const,
      label: "English",
      flag: "🇬🇧",
    },
  ];

  return (
    <div className="relative">
      {/* Globe Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="Change language"
        type="button"
      >
        <Globe className="w-5 h-5" />
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown */}
          <div
            className="absolute bg-background"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => {
              const isActive = locale === lang.code;

              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  type="button"
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors ${
                    isActive ? "bg-secondary/50" : ""
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium flex-1 text-left">
                    {lang.label}
                  </span>
                  {isActive && <Check className="w-4 h-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
