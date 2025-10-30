// components/HairTransplant/Aftercare.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function Aftercare() {
  const { t } = useTranslation();

  const phase1Items = [
    "hairTransplant.aftercare.phase1Item1",
    "hairTransplant.aftercare.phase1Item2",
    "hairTransplant.aftercare.phase1Item3",
    "hairTransplant.aftercare.phase1Item4",
  ];

  const phase2Items = [
    "hairTransplant.aftercare.phase2Item1",
    "hairTransplant.aftercare.phase2Item2",
    "hairTransplant.aftercare.phase2Item3",
    "hairTransplant.aftercare.phase2Item4",
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      {/* Title */}
      <h2 className="mb-8">{t("hairTransplant.aftercare.title")}</h2>

      {/* Two Phase Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Phase 1: First 7 Days (Green) */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-lg mb-4 text-green-800 dark:text-green-200">
            {t("hairTransplant.aftercare.phase1Title")}
          </h4>
          <ul className="space-y-3 text-green-700 dark:text-green-300">
            {phase1Items.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Phase 2: 1-3 Months (Blue) */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200">
            {t("hairTransplant.aftercare.phase2Title")}
          </h4>
          <ul className="space-y-3 text-blue-700 dark:text-blue-300">
            {phase2Items.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
