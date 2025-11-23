// components/LazerEpilasyon/LazerFAQ.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FAQData {
  faqTitle: string;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    order: number;
  }>;
}

const LazerFAQ = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<FAQData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            faqTitle: result.faqTitle,
            faqs: result.faqs || [],
          });
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("FAQ fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading || !data) {
    return (
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.faqs.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-8">{data.faqTitle}</h2>
      <div className="space-y-4">
        {data.faqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`border border-border rounded-lg overflow-hidden transition-all duration-300 ${
              openIndex === index ? "bg-primary/5" : "bg-background"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-lg text-foreground pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-6 pt-0 text-muted-foreground">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LazerFAQ;
