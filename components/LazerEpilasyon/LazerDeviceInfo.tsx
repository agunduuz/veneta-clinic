"use client";

import { useTranslation } from "@/lib/i18n/context";

const LazerDeviceInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-6">{t("laser.device.title")}</h2>
      <p className="text-muted-foreground mb-8">
        {t("laser.device.description")}
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("laser.device.featuresTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {t("laser.device.feature1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {t("laser.device.feature2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {t("laser.device.feature3")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {t("laser.device.feature4")}
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {t("laser.device.advantagesTitle")}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              {t("laser.device.advantage1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              {t("laser.device.advantage2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              {t("laser.device.advantage3")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              {t("laser.device.advantage4")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LazerDeviceInfo;
