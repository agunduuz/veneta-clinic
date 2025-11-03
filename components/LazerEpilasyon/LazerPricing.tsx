// components/LazerEpilasyon/LazerPricing.tsx
"use client";
import { useTranslation } from "@/lib/i18n/context";

const LazerPricing = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-6">{t("laser.pricing.title")}</h2>
      <p className="text-muted-foreground mb-8">
        {t("laser.pricing.description")}
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 text-center">
          <h4 className="font-semibold text-xl mb-2 text-foreground">
            {t("laser.pricing.allAreas")}
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            {t("laser.pricing.allAreasDescription")}
          </p>
          <p className="text-2xl font-bold text-primary">
            {t("laser.pricing.callForPrice")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20 text-center">
          <h4 className="font-semibold text-xl mb-2 text-foreground">
            {t("laser.pricing.halfBody")}
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            {t("laser.pricing.halfBodyDescription")}
          </p>
          <p className="text-2xl font-bold text-secondary">
            {t("laser.pricing.callForPrice")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 rounded-xl border border-accent/20 text-center">
          <h4 className="font-semibold text-xl mb-2 text-foreground">
            {t("laser.pricing.singleArea")}
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            {t("laser.pricing.singleAreaDescription")}
          </p>
          <p className="text-2xl font-bold text-accent-foreground">
            {t("laser.pricing.callForPrice")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default LazerPricing;
