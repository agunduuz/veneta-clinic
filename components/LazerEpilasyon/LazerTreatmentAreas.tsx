"use client";
import { useTranslation } from "@/lib/i18n/context";

const LazerTreatmentAreas = () => {
  const { t } = useTranslation();
  const areas = [
    { titleKey: "laser.areas.area1", descKey: "laser.areas.area1Description" },
    { titleKey: "laser.areas.area2", descKey: "laser.areas.area2Description" },
    { titleKey: "laser.areas.area3", descKey: "laser.areas.area3Description" },
    { titleKey: "laser.areas.area4", descKey: "laser.areas.area4Description" },
    { titleKey: "laser.areas.area5", descKey: "laser.areas.area5Description" },
    { titleKey: "laser.areas.area6", descKey: "laser.areas.area6Description" },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-6">{t("laser.areas.title")}</h2>
      <p className="text-muted-foreground mb-8">
        {t("laser.areas.description")}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              {t(area.titleKey)}
            </h4>
            <p className="text-muted-foreground text-sm">{t(area.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LazerTreatmentAreas;
