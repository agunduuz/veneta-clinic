// components/HairTransplant/WhyUs.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Heart, Scissors, Shield, Clock } from "lucide-react";

export default function WhyUs() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Heart,
      titleKey: "hairTransplant.whyUs.reason1Title",
      descriptionKey: "hairTransplant.whyUs.reason1Description",
      bgColor: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Scissors,
      titleKey: "hairTransplant.whyUs.reason2Title",
      descriptionKey: "hairTransplant.whyUs.reason2Description",
      bgColor: "bg-secondary/20",
      iconColor: "text-secondary-foreground",
    },
    {
      icon: Shield,
      titleKey: "hairTransplant.whyUs.reason3Title",
      descriptionKey: "hairTransplant.whyUs.reason3Description",
      bgColor: "bg-accent/20",
      iconColor: "text-accent-foreground",
    },
    {
      icon: Clock,
      titleKey: "hairTransplant.whyUs.reason4Title",
      descriptionKey: "hairTransplant.whyUs.reason4Description",
      bgColor: "bg-destructive/20",
      iconColor: "text-destructive",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 animate-fade-in">
      {/* Title */}
      <h2 className="mb-8 text-center">{t("hairTransplant.whyUs.title")}</h2>

      {/* 4 Reasons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <div key={index} className="text-center">
              {/* Icon Circle */}
              <div
                className={`w-16 h-16 ${reason.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>

              {/* Title */}
              <h4 className="font-semibold mb-2 text-foreground">
                {t(reason.titleKey)}
              </h4>

              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {t(reason.descriptionKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
