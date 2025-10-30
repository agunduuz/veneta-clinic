// components/SurgicalAesthetics/FAQ.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function FAQ() {
  const { t } = useTranslation();

  const faqs = [
    {
      questionKey: "surgicalAesthetics.faq.question1",
      answerKey: "surgicalAesthetics.faq.answer1",
    },
    {
      questionKey: "surgicalAesthetics.faq.question2",
      answerKey: "surgicalAesthetics.faq.answer2",
    },
    {
      questionKey: "surgicalAesthetics.faq.question3",
      answerKey: "surgicalAesthetics.faq.answer3",
    },
    {
      questionKey: "surgicalAesthetics.faq.question4",
      answerKey: "surgicalAesthetics.faq.answer4",
    },
    {
      questionKey: "surgicalAesthetics.faq.question5",
      answerKey: "surgicalAesthetics.faq.answer5",
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      <h2 className="mb-8">{t("surgicalAesthetics.faq.title")}</h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => {
          const isLast = index === faqs.length - 1;
          return (
            <div
              key={index}
              className={`${!isLast ? "border-b border-border pb-6" : ""}`}
            >
              {/* Question */}
              <h4 className="font-semibold text-lg mb-3 text-foreground">
                {t(faq.questionKey)}
              </h4>

              {/* Answer */}
              <p className="text-muted-foreground">{t(faq.answerKey)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
