// components/layout/Footer.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

interface FooterContent {
  phone: string;
  phoneSecondary?: string | null;
  email: string;
  address: string;
  mapLink?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  copyrightText: string;
}

interface FooterLink {
  id: string;
  title: string;
  href: string;
}

interface FooterGroup {
  id: string;
  title: string;
  slug: string;
  links: FooterLink[];
}

interface FooterData {
  content: FooterContent;
  groups: FooterGroup[];
}

export default function Footer() {
  const { locale } = useLocale();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/footer?locale=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setFooterData(data);
        }
      } catch (error) {
        console.error("Footer data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, [locale]);

  // Loading state
  if (loading) {
    return (
      <footer className="bg-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 bg-white/10 rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-4/5"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // No data fallback
  if (!footerData) {
    return null;
  }

  const { content, groups } = footerData;

  // Sosyal medya ikonları
  const socialLinks = [
    {
      url: content.facebookUrl,
      icon: Facebook,
      label: "Facebook",
    },
    {
      url: content.instagramUrl,
      icon: Instagram,
      label: "Instagram",
    },
    {
      url: content.twitterUrl,
      icon: Twitter,
      label: "Twitter",
    },
    {
      url: content.linkedinUrl,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      url: content.youtubeUrl,
      icon: Youtube,
      label: "YouTube",
    },
  ].filter((social) => social.url);

  return (
    <footer className="bg-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent transform -skew-x-12"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Link Grupları */}
            {groups.map((group, index) => (
              <div
                key={group.id}
                className={`
                  ${groups.length === 2 ? "lg:col-span-3" : "lg:col-span-2"}
                  ${index === 0 ? "lg:col-start-2" : ""}
                `}
              >
                <div className="relative">
                  <h4 className="font-bold mb-4 font-playfair text-lg md:text-xl text-primary-foreground relative">
                    {group.title}
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary to-accent"></div>
                  </h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          className="text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-1 transition-all duration-300 block text-sm md:text-base relative group"
                        >
                          <span className="relative z-10">{link.title}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 px-2 rounded"></div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* İletişim Bilgileri */}
            <div className="lg:col-span-3">
              <div className="relative">
                <h4 className="font-bold mb-4 font-playfair text-lg md:text-xl text-primary-foreground relative">
                  İletişim
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-secondary to-accent"></div>
                </h4>

                <div className="space-y-4">
                  {/* Telefon 1 */}
                  <div className="flex items-start gap-3 group">
                    <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg flex-shrink-0 shadow-sm">
                      <Phone className="text-primary h-4 w-4" />
                    </div>
                    <Link
                      href={`tel:${content.phone.replace(/\s/g, "")}`}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm md:text-base"
                    >
                      {content.phone}
                    </Link>
                  </div>

                  {/* Telefon 2 (varsa) */}
                  {content.phoneSecondary && (
                    <div className="flex items-start gap-3 group">
                      <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg flex-shrink-0 shadow-sm">
                        <Phone className="text-primary h-4 w-4" />
                      </div>
                      <Link
                        href={`tel:${content.phoneSecondary.replace(
                          /\s/g,
                          ""
                        )}`}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm md:text-base"
                      >
                        {content.phoneSecondary}
                      </Link>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex items-start gap-3 group">
                    <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg flex-shrink-0 shadow-sm">
                      <Mail className="text-primary h-4 w-4" />
                    </div>
                    <Link
                      href={`mailto:${content.email}`}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors break-all text-sm md:text-base"
                    >
                      {content.email}
                    </Link>
                  </div>

                  {/* Adres */}
                  <div className="flex items-start gap-3 group">
                    <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg flex-shrink-0 shadow-sm">
                      <MapPin className="text-primary h-4 w-4" />
                    </div>
                    {content.mapLink ? (
                      <Link
                        href={content.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm md:text-base"
                      >
                        {content.address}
                      </Link>
                    ) : (
                      <span className="text-primary-foreground/80 text-sm md:text-base">
                        {content.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sosyal Medya İkonları */}
                {socialLinks.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <Link
                            key={social.label}
                            href={social.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            aria-label={social.label}
                          >
                            <div className="bg-gradient-to-r from-secondary to-accent p-3 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 shadow-sm">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                              {social.label}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-primary/80 backdrop-blur-sm border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-primary-foreground/80 text-sm text-center md:text-left">
                {content.copyrightText}
              </p>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
                <span>Made with</span>
                <Link
                  href="https://www.linkedin.com/in/anilgunduuz/"
                  className="text-destructive animate-pulse"
                >
                  ♥
                </Link>
                <span>for a better web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
