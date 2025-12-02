// components/SurgicalAesthetics/FAQ.tsx
"use client";

import type { FAQ } from "@/types/surgical-aesthetics";

interface FAQProps {
  faqs: FAQ[];
  title: string;
}

export default function FAQComponent({ faqs, title }: FAQProps) {
  // Filter active and sort
  const activeFaqs = faqs
    .filter((f) => f.active)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8">{title}</h2>

      <div className="space-y-6">
        {activeFaqs.map((faq, index) => {
          const isLast = index === activeFaqs.length - 1;
          return (
            <div
              key={faq.id}
              className={`${!isLast ? "border-b border-border pb-6" : ""}`}
            >
              {/* Question */}
              <h4 className="font-semibold text-lg mb-3 text-foreground">
                {faq.question}
              </h4>

              {/* Answer */}
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
