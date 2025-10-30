"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/context";

type Category = {
  title: string; // i18n key (e.g., "nav.rhinoplasty")
  href: string;
  description?: string; // i18n key
  image?: string;
  badge?: string; // raw text or i18n key
};

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {categories.map((cat, idx) => (
        <a
          key={cat.title}
          href={cat.href}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="w-full h-40 mb-4 relative">
            <Image
              src={cat.image ? cat.image : "/images/doctors-team.jpg"}
              alt={t(cat.title)}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {cat.badge && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow">
                {cat.badge}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {t("surgicalAesthetics.categories.title")}
          </h2>
          {cat.description && (
            <p className="text-muted-foreground mb-4">{t(cat.description)}</p>
          )}
          <span className="inline-block mt-auto bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-white transition">
            {t("surgicalAesthetics.categories.viewDetails")}
          </span>
        </a>
      ))}
    </div>
  );
}
