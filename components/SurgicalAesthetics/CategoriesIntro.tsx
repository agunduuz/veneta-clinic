// components/SurgicalAesthetics/CategoriesIntro.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function CategoriesIntro() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        {t("surgicalAesthetics.categories.title")}
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {t("surgicalAesthetics.categories.description")}
      </p>
    </div>
  );
}
