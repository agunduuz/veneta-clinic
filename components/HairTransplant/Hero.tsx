// components/HairTransplant/Hero.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-12 mb-16">
      {/* Left: Text Content */}
      <div className="flex-1 space-y-6">
        <h1
          className="animate-title-slide-up"
          style={
            {
              "--animation-delay": "200ms",
            } as React.CSSProperties
          }
        >
          {t("hairTransplant.hero.title")}
          <span className="block text-primary mt-2">
            {t("hairTransplant.hero.subtitle")}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground animate-fade-up">
          {t("hairTransplant.hero.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
          <Link
            href="https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2"
            target="_blank"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold 
                   shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t("hairTransplant.hero.ctaReviews")}
          </Link>
          <Link
            href="tel:+902125612322"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold 
                   shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-6 h-6" />
            {t("hairTransplant.hero.ctaPhone")}
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="flex-1 flex justify-center animate-float">
        <Image
          src="/images/hair-transplant.jpg"
          alt={t("hairTransplant.hero.imageAlt")}
          width={500}
          height={350}
          className="rounded-2xl shadow-2xl object-cover"
          priority
        />
      </div>
    </section>
  );
}
