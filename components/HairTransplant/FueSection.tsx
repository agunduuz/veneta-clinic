// components/HairTransplant/FueSection.tsx
"use client";

import { useEffect, useState } from "react";

interface DeviceItem {
  id: string;
  type: string;
  text: string;
  order: number;
}

interface FueSectionData {
  deviceTitle: string;
  deviceDescription: string;
  deviceFeaturesTitle: string;
  deviceAdvantagesTitle: string;
  deviceFeatures: DeviceItem[];
  deviceAdvantages: DeviceItem[];
}

interface FueSectionProps {
  locale: string;
}

export default function FueSection({ locale }: FueSectionProps) {
  const [data, setData] = useState<FueSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
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
        }
      } catch (error) {
        console.error("FueSection fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-6">{data.deviceTitle}</h2>
      <p className="text-muted-foreground mb-8">{data.deviceDescription}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Features */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {data.deviceFeaturesTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {data.deviceFeatures.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Advantages */}
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {data.deviceAdvantagesTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {data.deviceAdvantages.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
