// components/Home/Features.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { UserCircle2, Target, Sparkles, Clock } from "lucide-react";
import { FeatureData } from "@/lib/homepage";

interface FeaturesProps {
  data?: FeatureData[] | null;
}

const Features = ({ data }: FeaturesProps) => {
  const { t } = useTranslation();

  // Fallback icons if no data
  const defaultIcons = [
    <UserCircle2 key="1" className="w-8 h-8 text-primary" />,
    <Target key="2" className="w-8 h-8 text-primary" />,
    <Sparkles key="3" className="w-8 h-8 text-primary" />,
    <Clock key="4" className="w-8 h-8 text-primary" />,
  ];

  // Use database data if available, otherwise use translation keys
  const features =
    data && data.length > 0
      ? data.map((feature, index) => ({
          icon: defaultIcons[index] || defaultIcons[0],
          title: feature.title,
          description: feature.description,
        }))
      : [
          {
            icon: defaultIcons[0],
            title: t("home.features.feature1Title"),
            description: t("home.features.feature1Description"),
          },
          {
            icon: defaultIcons[1],
            title: t("home.features.feature2Title"),
            description: t("home.features.feature2Description"),
          },
          {
            icon: defaultIcons[2],
            title: t("home.features.feature3Title"),
            description: t("home.features.feature3Description"),
          },
          {
            icon: defaultIcons[3],
            title: t("home.features.feature4Title"),
            description: t("home.features.feature4Description"),
          },
        ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-secondary/30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group"
            >
              <div
                className="relative p-6 bg-background rounded-xl shadow-md hover:shadow-xl 
                            transition-all duration-300 border border-primary/10 
                            hover:border-primary/30 h-full"
              >
                <div
                  className="absolute -top-4 left-6 p-2 bg-accent rounded-lg 
                              group-hover:scale-110 transition-transform duration-300"
                >
                  {feature.icon}
                </div>
                <div className="mt-6 space-y-3">
                  <h3 className="text-xl font-semibold font-playfair">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
