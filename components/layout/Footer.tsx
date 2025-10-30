// components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useTranslation, useLocale } from "@/lib/i18n/context";
import { Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  // Dynamic links based on locale
  const corporateLinks = [
    {
      href: locale === "en" ? "/en/about" : "/hakkimizda",
      key: "common.footer.aboutUs",
    },
    {
      href: locale === "en" ? "/en/services" : "/hizmetlerimiz",
      key: "common.footer.ourServices",
    },
    {
      href: locale === "en" ? "/en/doctors" : "/doktorlarimiz",
      key: "common.footer.ourDoctors",
    },
    { href: locale === "en" ? "/en/blog" : "/blog", key: "common.footer.blog" },
    {
      href: locale === "en" ? "/en/contact" : "/iletisim",
      key: "common.nav.contact",
    },
  ];

  const serviceLinks = [
    {
      href: locale === "en" ? "/en/surgical-aesthetics" : "/ameliyatli-estetik",
      key: "common.footer.aesthetics",
    },
    {
      href: locale === "en" ? "/en/laser-hair-removal" : "/lazer-epilasyon",
      key: "common.nav.laserHairRemoval",
    },
    {
      href: locale === "en" ? "/en/skin-care" : "/cilt-bakimi",
      key: "common.footer.skinCare",
    },
    {
      href: locale === "en" ? "/en/fillers" : "/dolgu",
      key: "common.footer.fillers",
    },
    {
      href: locale === "en" ? "/en/wrinkle-treatment" : "/kirisiklik",
      key: "common.footer.wrinkleTreatment",
    },
  ];

  return (
    <footer className="bg-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-12 flex flex-col gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-start">
        {/* Links */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <h4 className="font-bold mb-3 font-playfair">
                {t("common.footer.corporate")}
              </h4>
              <ul className="space-y-2 text-sm">
                {corporateLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-accent transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col ">
              <h4 className="font-bold mb-3 font-playfair">
                {t("common.footer.services")}
              </h4>
              <ul className="space-y-2 text-sm">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-accent transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Contact */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <h4 className="font-bold mb-3 font-playfair">
                {t("common.footer.contact")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="text-accent h-5 w-5" />
                  <a
                    href="tel:+902125612322"
                    className="hover:text-accent transition-colors"
                  >
                    +90 212 561 23 22
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="text-accent h-5 w-5" />
                  <span>{t("common.footer.location")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-primary/80 py-4 text-center text-sm text-primary-foreground/80 border-t border-primary-foreground/10">
        &copy; {new Date().getFullYear()} Veneta Clinic.{" "}
        {t("common.footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
