// components/HairTransplant/WhyUs.tsx
"use client";

import { useEffect, useState } from "react";
import { Heart, Scissors, Shield, Clock } from "lucide-react";

interface WhyUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  colorScheme: string;
  order: number;
}

interface WhyUsData {
  whyUsTitle: string;
  whyUs: WhyUsItem[];
}

interface WhyUsProps {
  locale: string;
}

export default function WhyUs({ locale }: WhyUsProps) {
  const [data, setData] = useState<WhyUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
        if (res.ok) {
          const result = await res.json();
          setData({
            whyUsTitle: result.whyUsTitle,
            whyUs: result.whyUs || [],
          });
        }
      } catch (error) {
        console.error("WhyUs fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return Heart;
      case "scissors":
        return Scissors;
      case "shield":
        return Shield;
      case "clock":
        return Clock;
      default:
        return Heart;
    }
  };

  const getColors = (colorScheme: string) => {
    switch (colorScheme) {
      case "primary":
        return { bgColor: "bg-primary/20", iconColor: "text-primary" };
      case "secondary":
        return {
          bgColor: "bg-secondary/20",
          iconColor: "text-secondary-foreground",
        };
      case "accent":
        return { bgColor: "bg-accent/20", iconColor: "text-accent-foreground" };
      case "destructive":
        return { bgColor: "bg-destructive/20", iconColor: "text-destructive" };
      default:
        return { bgColor: "bg-primary/20", iconColor: "text-primary" };
    }
  };

  if (loading || !data) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 animate-fade-in">
      <h2 className="mb-8 text-center">{data.whyUsTitle}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.whyUs.map((reason) => {
          const Icon = getIcon(reason.icon);
          const colors = getColors(reason.colorScheme);
          return (
            <div key={reason.id} className="text-center">
              <div
                className={`w-16 h-16 ${colors.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className={`w-8 h-8 ${colors.iconColor}`} />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">
                {reason.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
