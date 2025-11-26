// components/HairTransplant/Process.tsx
"use client";

import { useEffect, useState } from "react";

interface ProcessProps {
  locale: string;
}

export default function Process({ locale }: ProcessProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
        if (res.ok) {
          await res.json();
          // Process section uses translations - keep using i18n
          setTitle(
            locale === "tr" ? "İşlem Nasıl Yapılır?" : "How Is It Done?"
          );
        }
      } catch (error) {
        console.error("Process fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const steps = [
    {
      number: "1",
      titleKey: locale === "tr" ? "Planlama" : "Planning",
      descriptionKey:
        locale === "tr"
          ? "Saç çizgisi tasarımı ve greft sayısı belirlenir"
          : "Hairline design and graft count determined",
      bgColor: "bg-primary/20",
      textColor: "text-primary",
    },
    {
      number: "2",
      titleKey: locale === "tr" ? "Ekstraksiyon" : "Extraction",
      descriptionKey:
        locale === "tr"
          ? "Donör bölgeden saç kökleri tek tek alınır"
          : "Hair follicles extracted individually from donor area",
      bgColor: "bg-secondary/20",
      textColor: "text-secondary-foreground",
    },
    {
      number: "3",
      titleKey: locale === "tr" ? "Kanal Açma" : "Channel Opening",
      descriptionKey:
        locale === "tr"
          ? "Alıcı bölgede mikro kanallar açılır"
          : "Micro channels opened in recipient area",
      bgColor: "bg-accent/20",
      textColor: "text-accent-foreground",
    },
    {
      number: "4",
      titleKey: locale === "tr" ? "Yerleştirme" : "Implantation",
      descriptionKey:
        locale === "tr"
          ? "Greftler doğal açı ve yönde yerleştirilir"
          : "Grafts placed at natural angle and direction",
      bgColor: "bg-destructive/20",
      textColor: "text-destructive",
    },
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
      <h2 className="mb-8 text-center">{title}</h2>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <span className={`text-3xl font-bold ${step.textColor}`}>
                {step.number}
              </span>
            </div>
            <h4 className="font-semibold mb-4 text-foreground">
              {step.titleKey}
            </h4>
            <p className="text-muted-foreground">{step.descriptionKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
