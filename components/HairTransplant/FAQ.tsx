// components/HairTransplant/FAQ.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

export default function FAQ() {
  const { t } = useTranslation();

  const faqs = [
    {
      questionKey: "hairTransplant.faq.question1",
      answerKey: "hairTransplant.faq.answer1",
    },
    {
      questionKey: "hairTransplant.faq.question2",
      answerKey: "hairTransplant.faq.answer2",
    },
    {
      questionKey: "hairTransplant.faq.question3",
      answerKey: "hairTransplant.faq.answer3",
    },
    {
      questionKey: "hairTransplant.faq.question4",
      answerKey: "hairTransplant.faq.answer4",
    },
    {
      questionKey: "hairTransplant.faq.question5",
      answerKey: "hairTransplant.faq.answer5",
    },
    {
      questionKey: "hairTransplant.faq.question6",
      answerKey: "hairTransplant.faq.answer6",
    },
  ];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in">
      {/* Title */}
      <h2 className="mb-8">{t("hairTransplant.faq.title")}</h2>

      {/* FAQ List */}
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
