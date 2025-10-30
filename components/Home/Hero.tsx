"use client";

import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Hospital,
  Calendar,
  ChevronRight,
  Info,
} from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    const counters: NodeListOf<HTMLElement> =
      document.querySelectorAll(".counter");

    const animateCounter = (counter: HTMLElement) => {
      const target = parseInt(counter.getAttribute("data-target") || "0", 10);
      const duration = parseInt(
        counter.getAttribute("data-duration") || "2000",
        10
      );
      const steps = 30;
      const stepDuration = duration / steps;
      const stepValue = target / steps;
      let current = 0;

      const updateCounter = () => {
        current += stepValue;
        if (current <= target) {
          counter.textContent = Math.round(current).toString();
          requestAnimationFrame(() => setTimeout(updateCounter, stepDuration));
        } else {
          counter.textContent = target.toString();
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-muted to-background min-h-[90vh] flex items-center sm:py-5 overflow-hidden pb-5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Sol Kolon - İçerik */}
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            {/* Başlık Grubu */}
            <div className="relative">
              <div className="absolute -left-3 top-0 w-1 h-full bg-primary rounded-full transform origin-top scale-y-0 animate-scale-y" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-tight">
                <span className="block transform translate-y-8 opacity-0 animate-title-slide-up [--animation-delay:200ms]">
                  {t("home.hero.titleLine1")}
                </span>
                <span className="block transform translate-y-8 opacity-0 animate-title-slide-up [--animation-delay:400ms]">
                  <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                    {t("home.hero.titleLine2")}
                  </span>
                </span>
                <span className="block transform translate-y-8 opacity-0 animate-title-slide-up [--animation-delay:600ms]">
                  {t("home.hero.titleLine3")}
                </span>
              </h1>
            </div>

            {/* Açıklama */}
            <p className="text-base sm:text-lg text-muted-foreground font-montserrat leading-relaxed animate-fade-up mt-6">
              <span className="sm:block opacity-0 animate-fade-in [--animation-delay:800ms]">
                {t("home.hero.descriptionLine1")}
                <span className="font-semibold text-primary">
                  {" "}
                  {t("home.hero.descriptionHighlight")}{" "}
                </span>
                {t("home.hero.descriptionLine2")}
              </span>
              <span className="sm:block relative opacity-0 animate-fade-in [--animation-delay:1000ms]">
                <span className="italic">
                  {t("home.hero.descriptionItalic")}
                </span>{" "}
                {t("home.hero.descriptionLine3")}
                <span className="relative inline-block sm:ml-2">
                  {t("home.hero.descriptionEnd")}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-1 text-primary"
                    viewBox="0 0 120 4"
                  >
                    <path
                      d="M0 2 Q30 0, 60 2 T120 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </span>
            </p>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div className="stats-card hover:scale-105 transition-transform">
                <div className="relative">
                  <Hospital className="w-8 h-8 text-primary transition-transform hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="counter text-2xl font-bold text-primary"
                      data-target="2"
                      data-duration="2000"
                    >
                      0
                    </span>
                    <span className="text-xl text-primary">+</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("home.hero.statsDoctor")}
                  </span>
                </div>
              </div>

              <div className="stats-card hover:scale-105 transition-transform">
                <div className="relative">
                  <CalendarDays className="w-8 h-8 text-primary transition-transform hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="counter text-2xl font-bold text-primary"
                      data-target="12"
                      data-duration="2000"
                    >
                      0
                    </span>
                    <span className="text-xl text-primary">+</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("home.hero.statsExperience")}
                  </span>
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2 z-10">
                  <Calendar className="w-5 h-5 animate-float" />
                  {t("home.hero.ctaAppointment")}
                  <ChevronRight className="w-4 h-4 transition-transform hover:translate-x-1" />
                </span>
              </Button>

              <Link
                href={locale === "en" ? "/en/about" : "/hakkimizda"}
                className="inline-flex items-center justify-center px-8 py-2 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30"
              >
                <Info className="w-5 h-5 mr-2" />
                {t("home.hero.ctaAbout")}
              </Link>
            </div>
          </div>

          {/* Sağ Kolon - Görsel */}
          <div className="relative aspect-[4/3] lg:aspect-square w-full max-w-2xl mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-2xl transform lg:translate-x-0 opacity-0 animate-slide-in-right hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/doctors-team.jpg"
              alt={t("home.hero.imageAlt")}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
