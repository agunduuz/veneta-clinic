// components/SurgicalAesthetics/Features.tsx
"use client";

import {
  Users,
  Award,
  CheckCircle,
  Shield,
  Heart,
  Star,
  Clock,
  Headphones,
  ThumbsUp,
} from "lucide-react";
import type { Feature } from "@/types/surgical-aesthetics";

interface FeaturesProps {
  features: Feature[];
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "user-check": Users,
  users: Users,
  award: Award,
  "check-circle": CheckCircle,
  "shield-check": Shield,
  shield: Shield,
  heart: Heart,
  star: Star,
  clock: Clock,
  headphones: Headphones,
  "thumbs-up": ThumbsUp,
};

// Color schemes (matching admin panel)
const colorSchemes = [
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

export default function Features({ features }: FeaturesProps) {
  // Filter only active features and sort by order
  const activeFeatures = features
    .filter((f) => f.active)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-16">
      {activeFeatures.map((feature, index) => {
        const Icon = iconMap[feature.icon] || CheckCircle;
        const colorScheme = colorSchemes[index % colorSchemes.length];

        return (
          <div
            key={feature.id}
            className={`feature-card bg-gradient-to-br ${colorScheme.gradient} p-8 rounded-xl border ${colorScheme.border}`}
          >
            <div
              className={`icon-container w-16 h-16 ${colorScheme.iconBg} rounded-full flex items-center justify-center mb-4 transition-transform duration-300`}
            >
              <Icon className={`w-8 h-8 ${colorScheme.iconColor}`} />
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
