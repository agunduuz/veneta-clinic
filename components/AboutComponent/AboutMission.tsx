// components/AboutComponent/AboutMission.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface AboutMissionData {
  missionDoctorImage: string;
  missionQuote: string;
  missionTitle: string;
  missionSubtitle: string;
  missionDescription1: string;
  missionDescription2: string;
  stats: Stat[];
}

const AboutMission = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<AboutMissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/about?locale=${locale}`);
        if (res.ok) {
          const aboutData = await res.json();
          setData({
            missionDoctorImage: aboutData.missionDoctorImage,
            missionQuote: aboutData.missionQuote,
            missionTitle: aboutData.missionTitle,
            missionSubtitle: aboutData.missionSubtitle,
            missionDescription1: aboutData.missionDescription1,
            missionDescription2: aboutData.missionDescription2,
            stats: [
              {
                value: aboutData.stat1Value,
                label: aboutData.stat1Label,
              },
              {
                value: aboutData.stat2Value,
                label: aboutData.stat2Label,
              },
              {
                value: aboutData.stat3Value,
                label: aboutData.stat3Label,
              },
              {
                value: aboutData.stat4Value,
                label: aboutData.stat4Label,
              },
            ],
          });
        }
      } catch (error) {
        console.error("About mission fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  useEffect(() => {
    if (!data) return;

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
  }, [data]);

  if (loading || !data) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="animate-pulse">
          <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <div className="h-24 bg-gray-200 rounded mb-6"></div>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

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
            src={data.missionDoctorImage}
            alt="Doctor"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="192px"
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
            &ldquo;{data.missionQuote}&rdquo;
          </blockquote>
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
            {data.missionTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {data.missionSubtitle}
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {data.missionDescription1}
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {data.missionDescription2}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 gap-8"
        >
          {data.stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span
                className="stat-number text-4xl md:text-5xl font-bold text-primary"
                data-value={stat.value}
              >
                0
              </span>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMission;
