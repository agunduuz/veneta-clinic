// components/HairTransplant/Process.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function Process() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "1",
      titleKey: "hairTransplant.process.step1Title",
      descriptionKey: "hairTransplant.process.step1Description",
      bgColor: "bg-primary/20",
      textColor: "text-primary",
    },
    {
      number: "2",
      titleKey: "hairTransplant.process.step2Title",
      descriptionKey: "hairTransplant.process.step2Description",
      bgColor: "bg-secondary/20",
      textColor: "text-secondary-foreground",
    },
    {
      number: "3",
      titleKey: "hairTransplant.process.step3Title",
      descriptionKey: "hairTransplant.process.step3Description",
      bgColor: "bg-accent/20",
      textColor: "text-accent-foreground",
    },
    {
      number: "4",
      titleKey: "hairTransplant.process.step4Title",
      descriptionKey: "hairTransplant.process.step4Description",
      bgColor: "bg-destructive/20",
      textColor: "text-destructive",
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      {/* Title */}
      <h2 className="mb-8 text-center">{t("hairTransplant.process.title")}</h2>

      {/* 4 Steps Grid */}
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            {/* Number Circle */}
            <div
              className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <span className={`text-3xl font-bold ${step.textColor}`}>
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-semibold mb-4 text-foreground">
              {t(step.titleKey)}
            </h4>

            {/* Description */}
            <p className="text-muted-foreground">{t(step.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
