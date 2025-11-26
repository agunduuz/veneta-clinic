// components/HairTransplant/FAQ.tsx
"use client";

import { useEffect, useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FAQData {
  faqTitle: string;
  faqs: FAQItem[];
}

interface FAQProps {
  locale: string;
}

export default function FAQ({ locale }: FAQProps) {
  const [data, setData] = useState<FAQData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/procedures/sac-ekimi?locale=${locale}`);
        if (res.ok) {
          const result = await res.json();
          setData({
            faqTitle: result.faqTitle,
            faqs: result.faqs || [],
          });
        }
      } catch (error) {
        console.error("FAQ fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8">{data.faqTitle}</h2>

      <div className="space-y-6">
        {data.faqs.map((faq, index) => {
          const isLast = index === data.faqs.length - 1;
          return (
            <div
              key={faq.id}
              className={`${!isLast ? "border-b border-border pb-6" : ""}`}
            >
              <h4 className="font-semibold text-lg mb-3 text-foreground">
                {faq.question}
              </h4>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
