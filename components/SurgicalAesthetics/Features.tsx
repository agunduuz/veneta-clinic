// components/SurgicalAesthetics/Features.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Users, Award, CheckCircle } from "lucide-react";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      titleKey: "surgicalAesthetics.features.feature1Title",
      descriptionKey: "surgicalAesthetics.features.feature1Description",
      gradient: "from-primary/10 to-primary/5",
      border: "border-primary/20",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Award,
      titleKey: "surgicalAesthetics.features.feature2Title",
      descriptionKey: "surgicalAesthetics.features.feature2Description",
      gradient: "from-secondary/10 to-secondary/5",
      border: "border-secondary/20",
      iconBg: "bg-secondary/20",
      iconColor: "text-secondary-foreground",
    },
    {
      icon: CheckCircle,
      titleKey: "surgicalAesthetics.features.feature3Title",
      descriptionKey: "surgicalAesthetics.features.feature3Description",
      gradient: "from-accent/10 to-accent/5",
      border: "border-accent/20",
      iconBg: "bg-accent/20",
      iconColor: "text-accent-foreground",
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className={`feature-card bg-gradient-to-br ${feature.gradient} p-8 rounded-xl border ${feature.border}`}
          >
            <div
              className={`icon-container w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              <Icon className={`w-8 h-8 ${feature.iconColor}`} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {t(feature.titleKey)}
            </h3>
            <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
          </div>
        );
      })}
    </section>
  );
}
