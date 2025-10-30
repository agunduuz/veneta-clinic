// components/SurgicalAesthetics/Process.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function Process() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "1",
      titleKey: "surgicalAesthetics.process.step1Title",
      descriptionKey: "surgicalAesthetics.process.step1Description",
      bgColor: "bg-primary/20",
      textColor: "text-primary",
    },
    {
      number: "2",
      titleKey: "surgicalAesthetics.process.step2Title",
      descriptionKey: "surgicalAesthetics.process.step2Description",
      bgColor: "bg-secondary/20",
      textColor: "text-secondary-foreground",
    },
    {
      number: "3",
      titleKey: "surgicalAesthetics.process.step3Title",
      descriptionKey: "surgicalAesthetics.process.step3Description",
      bgColor: "bg-accent/20",
      textColor: "text-accent-foreground",
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8 text-center">
        {t("surgicalAesthetics.process.title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
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
