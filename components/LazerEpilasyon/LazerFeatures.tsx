"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Zap, Users, CheckCircle } from "lucide-react";

const LazerFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="feature-card bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
        <div className="icon-container w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">
          {t("laser.features.feature1Title")}
        </h3>
        <p className="text-muted-foreground">
          {t("laser.features.feature1Description")}
        </p>
      </div>
      <div className="feature-card bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-xl border border-secondary/20">
        <div className="icon-container w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300">
          <Users className="w-8 h-8 text-secondary-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">
          {t("laser.features.feature2Title")}
        </h3>
        <p className="text-muted-foreground">
          {t("laser.features.feature2Description")}
        </p>
      </div>
      <div className="feature-card bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-xl border border-accent/20">
        <div className="icon-container w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300">
          <CheckCircle className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">
          {t("laser.features.feature3Title")}
        </h3>
        <p className="text-muted-foreground">
          {t("laser.features.feature3Description")}
        </p>
      </div>
    </section>
  );
};

export default LazerFeatures;
