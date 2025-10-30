// components/AboutComponent/AboutHeader.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutHeader = () => {
  const { t } = useTranslation();

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
          {t("about.header.title")}{" "}
          <span className="text-primary">
            {t("about.header.titleHighlight")}
          </span>{" "}
          ✨
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground font-montserrat"
        >
          {t("about.header.subtitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {t("about.header.description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 pt-4"
        >
          <Button size="lg">{t("about.header.buttonServices")}</Button>
          <Button size="lg" variant="secondary">
            {t("about.header.buttonContact")}
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
          src="/images/doctors-team.jpg"
          alt={t("about.header.imageAlt")}
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
              {t("about.header.experienceYears")}
            </span>
            <span className="text-sm text-muted-foreground whitespace-pre-line">
              {t("about.header.experienceText")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHeader;
