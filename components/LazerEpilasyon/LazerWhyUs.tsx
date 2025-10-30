"use client";
import { useTranslation } from "@/lib/i18n/context";

const LazerWhyUs = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-8 text-center">{t("laser.whyUs.title")}</h2>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h4 className="font-semibold mb-2 text-foreground">
            {t("laser.whyUs.reason1Title")}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("laser.whyUs.reason1Description")}
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-secondary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h4 className="font-semibold mb-2 text-foreground">
            {t("laser.whyUs.reason2Title")}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("laser.whyUs.reason2Description")}
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-accent-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h4 className="font-semibold mb-2 text-foreground">
            {t("laser.whyUs.reason3Title")}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("laser.whyUs.reason3Description")}
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h4 className="font-semibold mb-2 text-foreground">
            {t("laser.whyUs.reason4Title")}
          </h4>
          <p className="text-muted-foreground text-sm">
            {t("laser.whyUs.reason4Description")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default LazerWhyUs;
