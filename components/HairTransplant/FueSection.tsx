// components/HairTransplant/FueSection.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function FueSection() {
  const { t } = useTranslation();

  const advantages = [
    "hairTransplant.fueSection.advantage1",
    "hairTransplant.fueSection.advantage2",
    "hairTransplant.fueSection.advantage3",
    "hairTransplant.fueSection.advantage4",
  ];

  const applications = [
    "hairTransplant.fueSection.application1",
    "hairTransplant.fueSection.application2",
    "hairTransplant.fueSection.application3",
    "hairTransplant.fueSection.application4",
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      {/* Title */}
      <h2 className="mb-6">{t("hairTransplant.fueSection.title")}</h2>

      {/* Description */}
      <p className="text-muted-foreground mb-8">
        {t("hairTransplant.fueSection.description")}
      </p>

      {/* Two columns: Advantages + Applications */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Advantages */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("hairTransplant.fueSection.advantagesTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {advantages.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Applications */}
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("hairTransplant.fueSection.applicationsTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {applications.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
