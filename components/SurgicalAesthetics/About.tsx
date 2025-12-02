// components/SurgicalAesthetics/About.tsx
"use client";

import type {
  AboutSection,
  AboutArea,
  AboutAdvantage,
} from "@/types/surgical-aesthetics";

interface AboutProps {
  aboutSection: AboutSection;
  areas: AboutArea[];
  advantages: AboutAdvantage[];
}

export default function About({ aboutSection, areas, advantages }: AboutProps) {
  // Filter active and sort
  const activeAreas = areas
    .filter((a) => a.active)
    .sort((a, b) => a.order - b.order);
  const activeAdvantages = advantages
    .filter((a) => a.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-6">{aboutSection.title}</h2>
      <p className="text-muted-foreground mb-8">{aboutSection.description}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Areas */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {aboutSection.areasTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {activeAreas.map((area) => (
              <li key={area.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {area.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Advantages */}
        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20">
          <h4 className="font-semibold text-lg mb-4 text-foreground">
            {aboutSection.advantagesTitle}
          </h4>
          <ul className="space-y-3 text-muted-foreground">
            {activeAdvantages.map((advantage) => (
              <li key={advantage.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                {advantage.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
