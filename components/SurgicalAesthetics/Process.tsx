// components/SurgicalAesthetics/Process.tsx
"use client";

import type { ProcessStep } from "@/types/surgical-aesthetics";

interface ProcessProps {
  steps: ProcessStep[];
}

export default function Process({ steps }: ProcessProps) {
  // Filter active and sort
  const activeSteps = steps
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8 text-center">Ameliyat Süreci</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {activeSteps.map((step) => (
          <div key={step.id} className="text-center">
            {/* Number Circle */}
            <div
              className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <span className={`text-3xl font-bold ${step.textColor}`}>
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-semibold mb-4 text-foreground">{step.title}</h4>

            {/* Description */}
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
