// components/LazerEpilasyon/LazerWhyUs.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import {
  Zap,
  Users,
  DollarSign,
  Heart,
  Shield,
  Award,
  Star,
  CheckCircle,
  ThumbsUp,
  Clock,
  LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface WhyUsData {
  whyUsTitle: string;
  reasons: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    colorScheme: string;
    order: number;
  }>;
}

interface ColorScheme {
  bg: string;
  border: string;
  iconBg: string;
  iconText: string;
}

const LazerWhyUs = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<WhyUsData | null>(null);
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
            whyUsTitle: result.whyUsTitle,
            reasons: result.whyUs || [],
          });
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Why us fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Icon mapper
  const getIcon = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      lightning: Zap,
      users: Users,
      dollar: DollarSign,
      heart: Heart,
      shield: Shield,
      award: Award,
      star: Star,
      "check-circle": CheckCircle,
      "thumbs-up": ThumbsUp,
      clock: Clock,
    };
    return icons[iconName] || Heart;
  };

  // Color scheme mapper
  const getColorClasses = (colorScheme: string): ColorScheme => {
    const schemes: Record<string, ColorScheme> = {
      primary: {
        bg: "bg-gradient-to-br from-primary/10 to-primary/5",
        border: "border-primary/20",
        iconBg: "bg-primary/20",
        iconText: "text-primary",
      },
      secondary: {
        bg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
        border: "border-secondary/20",
        iconBg: "bg-secondary/20",
        iconText: "text-secondary-foreground",
      },
      accent: {
        bg: "bg-gradient-to-br from-accent/10 to-accent/5",
        border: "border-accent/20",
        iconBg: "bg-accent/20",
        iconText: "text-accent-foreground",
      },
      destructive: {
        bg: "bg-gradient-to-br from-destructive/10 to-destructive/5",
        border: "border-destructive/20",
        iconBg: "bg-destructive/20",
        iconText: "text-destructive",
      },
    };
    return schemes[colorScheme] || schemes.primary;
  };

  if (loading || !data) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.reasons.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-8">{data.whyUsTitle}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.reasons.map((reason) => {
          const Icon = getIcon(reason.icon);
          const colors = getColorClasses(reason.colorScheme);

          return (
            <div
              key={reason.id}
              className={`${colors.bg} p-6 rounded-xl border ${colors.border} hover:shadow-lg transition-all duration-300`}
            >
              <div
                className={`w-14 h-14 ${colors.iconBg} rounded-full flex items-center justify-center mb-4`}
              >
                <Icon className={`w-7 h-7 ${colors.iconText}`} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-foreground">
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
};

export default LazerWhyUs;
