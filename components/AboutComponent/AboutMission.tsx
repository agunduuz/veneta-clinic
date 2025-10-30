// components/AboutComponent/AboutMission.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutMission = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");

    const animateCounter = (counter: HTMLElement) => {
      const target = parseInt(counter.getAttribute("data-value") || "0");
      const duration = 2000;
      const steps = 50;
      const stepValue = target / steps;
      let current = 0;

      const updateCounter = () => {
        current += stepValue;
        if (current <= target) {
          counter.textContent = Math.round(current).toString() + "+";
          setTimeout(updateCounter, duration / steps);
        } else {
          counter.textContent = target.toString() + "+";
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      if (counter instanceof HTMLElement) {
        observer.observe(counter);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-primary/10 rounded-2xl p-8 md:p-12 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-48 h-48 mb-8 rounded-full overflow-hidden"
        >
          <Image
            src="/images/doctors-team.jpg"
            alt={t("about.mission.doctorImageAlt")}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10"
        >
          <blockquote className="text-xl md:text-2xl italic text-foreground mb-6">
            &ldquo;{t("about.mission.quote")}&rdquo;
          </blockquote>
          {/* <div className="flex flex-col">
            <cite className="text-lg font-semibold text-foreground not-italic">
              {t("about.mission.doctorName")}
            </cite>
            <span className="text-sm text-muted-foreground mb-2">
              {t("about.mission.doctorTitle")}
            </span>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>{t("about.mission.doctorInfo1")}</p>
              <p>{t("about.mission.doctorInfo2")}</p>
              <p>{t("about.mission.doctorInfo3")}</p>
              <p>{t("about.mission.doctorInfo4")}</p>
              <p>{t("about.mission.doctorInfo5")}</p>
            </div>
          </div> */}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">
            {t("about.mission.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {t("about.mission.subtitle")}
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("about.mission.description1")}
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("about.mission.description2")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 gap-8"
        >
          <div className="stat-item">
            <span
              className="stat-number text-4xl md:text-5xl font-bold text-primary"
              data-value={t("about.mission.stat1Value")}
            >
              0
            </span>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("about.mission.stat1Label")}
            </p>
          </div>
          <div className="stat-item">
            <span
              className="stat-number text-4xl md:text-5xl font-bold text-primary"
              data-value={t("about.mission.stat2Value")}
            >
              0
            </span>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("about.mission.stat2Label")}
            </p>
          </div>
          <div className="stat-item">
            <span
              className="stat-number text-4xl md:text-5xl font-bold text-primary"
              data-value={t("about.mission.stat3Value")}
            >
              0
            </span>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("about.mission.stat3Label")}
            </p>
          </div>
          <div className="stat-item">
            <span
              className="stat-number text-4xl md:text-5xl font-bold text-primary"
              data-value={t("about.mission.stat4Value")}
            >
              0
            </span>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("about.mission.stat4Label")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMission;
