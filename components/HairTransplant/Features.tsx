// components/HairTransplant/Features.tsx
"use client";

import { useEffect, useState } from "react";
import { Scissors, Users, CheckCircle } from "lucide-react";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

interface FeaturesProps {
  locale: string;
}

export default function Features({ locale }: FeaturesProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
        if (res.ok) {
          const result = await res.json();
          setFeatures(result.features || []);
        }
      } catch (error) {
        console.error("Features fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "scissors":
        return Scissors;
      case "users":
        return Users;
      case "check-circle":
        return CheckCircle;
      default:
        return CheckCircle;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      {
        gradient: "from-primary/10 to-primary/5",
        border: "border-primary/20",
        iconBg: "bg-primary/20",
        iconColor: "text-primary",
      },
      {
        gradient: "from-secondary/10 to-secondary/5",
        border: "border-secondary/20",
        iconBg: "bg-secondary/20",
        iconColor: "text-secondary-foreground",
      },
      {
        gradient: "from-accent/10 to-accent/5",
        border: "border-accent/20",
        iconBg: "bg-accent/20",
        iconColor: "text-accent-foreground",
      },
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);
        const style = getGradient(index);
        return (
          <div
            key={feature.id}
            className={`feature-card bg-gradient-to-br ${style.gradient} p-8 rounded-xl border ${style.border}`}
          >
            <div
              className={`icon-container w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              <Icon className={`w-8 h-8 ${style.iconColor}`} />
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
}
