// components/SurgicalAesthetics/About.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function About() {
  const { t } = useTranslation();

  const areas = [
    "surgicalAesthetics.about.area1",
    "surgicalAesthetics.about.area2",
    "surgicalAesthetics.about.area3",
    "surgicalAesthetics.about.area4",
  ];

  const advantages = [
    "surgicalAesthetics.about.advantage1",
    "surgicalAesthetics.about.advantage2",
    "surgicalAesthetics.about.advantage3",
    "surgicalAesthetics.about.advantage4",
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-6">{t("surgicalAesthetics.about.title")}</h2>
      <p className="text-muted-foreground mb-8">
        {t("surgicalAesthetics.about.description")}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Areas */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("surgicalAesthetics.about.areasTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {areas.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Advantages */}
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("surgicalAesthetics.about.advantagesTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {advantages.map((key, index) => (
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
