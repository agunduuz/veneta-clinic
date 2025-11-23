// components/AboutComponent/AboutFeatures.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Feature {
  id: string;
  featureId: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

interface AboutFeaturesData {
  featuresTitle: string;
  featuresTitleHighlight: string;
  featuresSubtitle: string;
  features: Feature[];
}

const AboutFeatures = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<AboutFeaturesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/about?locale=${locale}`);
        if (res.ok) {
          const aboutData = await res.json();
          setData({
            featuresTitle: aboutData.featuresTitle,
            featuresTitleHighlight: aboutData.featuresTitleHighlight,
            featuresSubtitle: aboutData.featuresSubtitle,
            features: aboutData.features || [],
          });
        }
      } catch (error) {
        console.error("About features fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <section className="relative w-full bg-primary/5 py-24 md:py-32 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-64 bg-gray-200 rounded-3xl"></div>
              <div className="h-64 bg-gray-200 rounded-3xl"></div>
              <div className="h-64 bg-gray-200 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-primary/5 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            {data.featuresTitle}{" "}
            <span className="text-primary">{data.featuresTitleHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {data.featuresSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {data.features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-card hover:bg-card/80 rounded-3xl p-6 md:p-8 overflow-hidden"
            >
              <div className="relative z-10">
                <span className="inline-block text-5xl font-bold text-primary/20 mb-4 font-playfair">
                  {feature.featureId}
                </span>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <motion.div
                className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </motion.div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
