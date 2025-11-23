// components/LazerEpilasyon/LazerDeviceInfo.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";

interface DeviceData {
  deviceTitle: string;
  deviceDescription: string;
  deviceFeaturesTitle: string;
  deviceAdvantagesTitle: string;
  deviceFeatures: Array<{ id: string; text: string; order: number }>;
  deviceAdvantages: Array<{ id: string; text: string; order: number }>;
}

const LazerDeviceInfo = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<DeviceData | null>(null);
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
          setData({
            deviceTitle: result.deviceTitle,
            deviceDescription: result.deviceDescription,
            deviceFeaturesTitle: result.deviceFeaturesTitle,
            deviceAdvantagesTitle: result.deviceAdvantagesTitle,
            deviceFeatures: result.deviceFeatures || [],
            deviceAdvantages: result.deviceAdvantages || [],
          });
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Device info fetch error:", error);
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
          <div className="h-20 bg-gray-200 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-6">{data.deviceTitle}</h2>
      <p className="text-muted-foreground mb-8">{data.deviceDescription}</p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Features */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {data.deviceFeaturesTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {data.deviceFeatures.map((feature) => (
              <li key={feature.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
          {data.deviceFeatures.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Henüz özellik eklenmemiş
            </p>
          )}
        </div>

        {/* Advantages */}
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {data.deviceAdvantagesTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {data.deviceAdvantages.map((advantage) => (
              <li key={advantage.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></span>
                <span>{advantage.text}</span>
              </li>
            ))}
          </ul>
          {data.deviceAdvantages.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Henüz avantaj eklenmemiş
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LazerDeviceInfo;
