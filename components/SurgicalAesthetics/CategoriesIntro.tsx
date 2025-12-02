// components/SurgicalAesthetics/CategoriesIntro.tsx
"use client";

import type { PageData } from "@/types/surgical-aesthetics";

interface CategoriesIntroProps {
  data: PageData;
}

export default function CategoriesIntro({ data }: CategoriesIntroProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        {data.categoriesIntroTitle}
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {data.categoriesIntroDescription}
      </p>
    </div>
  );
}
