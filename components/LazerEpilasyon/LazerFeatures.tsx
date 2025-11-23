// components/LazerEpilasyon/LazerFeatures.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import {
  Zap,
  Users,
  CheckCircle,
  Shield,
  Heart,
  Star,
  Award,
  Target,
  LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

const LazerFeatures = () => {
  const { locale } = useLocale();
  const [features, setFeatures] = useState<Feature[]>([]);
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
          setFeatures(result.features || []);
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Features fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Icon mapper
  const getIcon = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      zap: Zap,
      users: Users,
      "check-circle": CheckCircle,
      shield: Shield,
      heart: Heart,
      star: Star,
      award: Award,
      target: Target,
    };
    return icons[iconName] || Zap;
  };

  // Color mapper
  const getColorClasses = (index: number) => {
    const colors = [
      {
        bg: "bg-gradient-to-br from-primary/10 to-primary/5",
        border: "border-primary/20",
        iconBg: "bg-primary/20",
        iconText: "text-primary",
      },
      {
        bg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
        border: "border-secondary/20",
        iconBg: "bg-secondary/20",
        iconText: "text-secondary-foreground",
      },
      {
        bg: "bg-gradient-to-br from-accent/10 to-accent/5",
        border: "border-accent/20",
        iconBg: "bg-accent/20",
        iconText: "text-accent-foreground",
      },
    ];
    return colors[index % 3];
  };

  if (loading) {
    return (
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="p-8 rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);
        const colors = getColorClasses(index);

        return (
          <div
            key={feature.id}
            className={`feature-card ${colors.bg} p-8 rounded-xl border ${colors.border}`}
          >
            <div
              className={`icon-container w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              <Icon className={`w-8 h-8 ${colors.iconText}`} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </section>
  );
};

export default LazerFeatures;
