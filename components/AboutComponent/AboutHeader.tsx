// components/AboutComponent/AboutHeader.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AboutHeaderData {
  headerTitle: string;
  headerTitleHighlight: string;
  headerSubtitle: string;
  headerDescription: string;
  headerButtonServices: string;
  headerButtonContact: string;
  headerImage: string;
  headerExperienceYears: string;
  headerExperienceText: string;
}

const AboutHeader = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<AboutHeaderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/about?locale=${locale}`);
        if (res.ok) {
          const aboutData = await res.json();
          setData({
            headerTitle: aboutData.headerTitle,
            headerTitleHighlight: aboutData.headerTitleHighlight,
            headerSubtitle: aboutData.headerSubtitle,
            headerDescription: aboutData.headerDescription,
            headerButtonServices: aboutData.headerButtonServices,
            headerButtonContact: aboutData.headerButtonContact,
            headerImage: aboutData.headerImage,
            headerExperienceYears: aboutData.headerExperienceYears,
            headerExperienceText: aboutData.headerExperienceText,
          });
        }
      } catch (error) {
        console.error("About header fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <section className="w-full max-w-7xl mx-auto lg:px-4 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="h-24 bg-gray-200 rounded w-full"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="aspect-[4/3] bg-gray-200 rounded-3xl"></div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto lg:px-4 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold font-playfair text-foreground"
        >
          {data.headerTitle}{" "}
          <span className="text-primary">{data.headerTitleHighlight}</span> ✨
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground font-montserrat"
        >
          {data.headerSubtitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {data.headerDescription}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <Button size="lg">{data.headerButtonServices}</Button>
          <Button size="lg" variant="secondary">
            {data.headerButtonContact}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[4/3] rounded-3xl overflow-hidden"
      >
        <Image
          src={data.headerImage}
          alt="About"
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary text-4xl font-bold">
              {data.headerExperienceYears}
            </span>
            <span className="text-sm text-muted-foreground whitespace-pre-line">
              {data.headerExperienceText}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHeader;
