// components/LazerEpilasyon/LazerFAQ.tsx
"use client";
import { useTranslation } from "@/lib/i18n/context";

const LazerFAQ = () => {
  const { t } = useTranslation();
  const faqs = [
    { question: "laser.faq.question1", answer: "laser.faq.answer1" },
    { question: "laser.faq.question2", answer: "laser.faq.answer2" },
    { question: "laser.faq.question3", answer: "laser.faq.answer3" },
    { question: "laser.faq.question4", answer: "laser.faq.answer4" },
    { question: "laser.faq.question5", answer: "laser.faq.answer5" },
    { question: "laser.faq.question6", answer: "laser.faq.answer6" },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in mb-12">
      <h2 className="mb-8">{t("laser.faq.title")}</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`pb-6 ${
              index !== faqs.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <h4 className="font-semibold text-lg mb-3 text-foreground">
              {t(faq.question)}
            </h4>
            <p className="text-muted-foreground">{t(faq.answer)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LazerFAQ;
