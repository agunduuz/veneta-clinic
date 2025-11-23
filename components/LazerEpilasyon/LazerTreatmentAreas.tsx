// components/LazerEpilasyon/LazerTreatmentAreas.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";

interface TreatmentAreasData {
  title: string;
  description: string;
  areas: Array<{
    id: string;
    title: string;
    description: string;
    order: number;
  }>;
}

const LazerTreatmentAreas = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<TreatmentAreasData | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (hasFetchedRef.current) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/procedures/lazer-epilasyon?locale=${locale}`
        );
        if (res.ok) {
          const result = await res.json();

          // Başlık ve açıklama için translation key'leri kullan
          // Ama bu veriler artık API'den geliyor, o yüzden geçici hardcode yapabiliriz
          // Ya da page data'ya ekleyebiliriz
          setData({
            title: locale === "tr" ? "Tedavi Bölgeleri" : "Treatment Areas",
            description:
              locale === "tr"
                ? "Lazer epilasyon uygulayabileceğimiz bölgeler"
                : "Areas where we can apply laser hair removal",
            areas: result.treatmentAreas || [],
          });
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Treatment areas fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-16 bg-gray-200 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.areas.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-6">{data.title}</h2>
      <p className="text-muted-foreground mb-8">{data.description}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.areas.map((area) => (
          <div
            key={area.id}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <h4 className="font-semibold text-lg mb-2 text-foreground">
              {area.title}
            </h4>
            <p className="text-muted-foreground text-sm">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LazerTreatmentAreas;
