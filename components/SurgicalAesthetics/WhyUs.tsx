// components/SurgicalAesthetics/WhyUs.tsx
"use client";

import {
  Clock,
  Users,
  Shield,
  Heart,
  Award,
  Star,
  CheckCircle,
  Headphones,
} from "lucide-react";
import type { WhyUsReason } from "@/types/surgical-aesthetics";

interface WhyUsProps {
  reasons: WhyUsReason[];
  title: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  users: Users,
  "user-check": Users,
  shield: Shield,
  "shield-check": Shield,
  heart: Heart,
  award: Award,
  star: Star,
  "check-circle": CheckCircle,
  headphones: Headphones,
  "thumbs-up": Heart,
};

// Color scheme mapping
const colorSchemeMap: Record<string, { bgColor: string; iconColor: string }> = {
  primary: { bgColor: "bg-primary/20", iconColor: "text-primary" },
  secondary: {
    bgColor: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
  },
  accent: { bgColor: "bg-accent/20", iconColor: "text-accent-foreground" },
  destructive: { bgColor: "bg-destructive/20", iconColor: "text-destructive" },
};

export default function WhyUs({ reasons, title }: WhyUsProps) {
  // Filter active and sort
  const activeReasons = reasons
    .filter((r) => r.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 animate-fade-in">
      <h2 className="mb-8 text-center">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeReasons.map((reason) => {
          const Icon = iconMap[reason.icon] || Heart;
          const colors =
            colorSchemeMap[reason.colorScheme] || colorSchemeMap.primary;

          return (
            <div key={reason.id} className="text-center">
              {/* Icon Circle */}
              <div
                className={`w-16 h-16 ${colors.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className={`w-8 h-8 ${colors.iconColor}`} />
              </div>

              {/* Title */}
              <h4 className="font-semibold mb-2 text-foreground">
                {reason.title}
              </h4>

              {/* Description */}
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
