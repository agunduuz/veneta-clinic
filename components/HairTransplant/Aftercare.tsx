// components/HairTransplant/Aftercare.tsx
"use client";

import { useEffect, useState } from "react";

interface AftercareProps {
  locale: string;
}

export default function Aftercare({ locale }: AftercareProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
        if (res.ok) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Aftercare fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const title =
    locale === "tr" ? "Operasyon Sonrası Bakım" : "Post-Operative Care";
  const phase1Title = locale === "tr" ? "İlk 7 Gün" : "First 7 Days";
  const phase2Title = locale === "tr" ? "1-3 Ay" : "1-3 Months";

  const phase1Items =
    locale === "tr"
      ? [
          "Baş bandajı 3 gün takılı kalır",
          "İlk yıkama 3. gün yapılır",
          "Sert hareketlerden kaçının",
          "Reçete edilen ilaçları kullanın",
        ]
      : [
          "Head bandage stays for 3 days",
          "First wash on 3rd day",
          "Avoid harsh movements",
          "Use prescribed medications",
        ];

  const phase2Items =
    locale === "tr"
      ? [
          "Şok dökülme normaldir",
          "Spor ve ağır egzersiz yasaktır",
          "Güneşe direkt maruz kalmayın",
          "Alkol ve sigara kullanmayın",
        ]
      : [
          "Shock loss is normal",
          "Sports and heavy exercise prohibited",
          "Avoid direct sun exposure",
          "No alcohol and smoking",
        ];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8">{title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Phase 1 */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-lg mb-4 text-green-800 dark:text-green-200">
            {phase1Title}
          </h4>
          <ul className="space-y-3 text-green-700 dark:text-green-300">
            {phase1Items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200">
            {phase2Title}
          </h4>
          <ul className="space-y-3 text-blue-700 dark:text-blue-300">
            {phase2Items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
