// components/layout/Header.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { navigationItems } from "@/data/navigation";
import { ThemeSwitcher } from "@/components/Header/ThemeSwitcher";
import LanguageSwitcher from "@/components/Header/LanguageSwitcher";
import { Navigation } from "@/components/Header/Navigation";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale } = useLocale();

  // Mobil menü açıldığında scroll'u engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isMenuOpen]);

  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <header className="pt-4 pb-4 bg-background">
      <div className="container">
        <nav className="flex justify-between items-center">
          <Link href={homeHref} className="logo w-20 h-12">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 244.44 167.63"
            >
              <defs></defs>
              <path
                className="cls-1"
                d="M127.16,70.27l12.1-4.08,10.51,33.14.4.08c3.46-10.9,6.92-21.81,10.54-33.2l12.16,4.06C168.8,78.46,165.27,86.45,161,94c-4.76,8.3-17.11,8-22.21-.27-.64-1-1.16-2.16-1.7-3.26Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M119.94,161.36,110.46,153l23.47-25.6-.17-.39-34,7.46L97.24,122c6.34-.45,12.23-.87,18.12-1.27,2.38-.17,4.76-.39,7.14-.44a13.16,13.16,0,0,1,11.44,20.42c-4.32,6.53-8.73,13-13.1,19.49C120.65,160.49,120.43,160.73,119.94,161.36Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M172.81,165.53l-12.09,4.05-10.55-33.19-.39.06c-3.48,10.93-6.95,21.86-10.53,33.13l-12.07-4.05c1.24-2.57,2.29-4.76,3.36-6.94,2.45-5,4.89-10,7.39-15s6.65-7.81,12.42-7.69c5.42.12,9.27,2.8,11.64,7.61C165.55,150.67,169.07,157.89,172.81,165.53Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M202.76,122c-.86,4.28-1.66,8.25-2.5,12.46l-34-7.47-.27.34c7.76,8.48,15.53,17,23.5,25.65l-9.38,8.26a16.37,16.37,0,0,1-1.27-1.45c-4.31-6.37-8.67-12.71-12.87-19.15a12.94,12.94,0,0,1,5.08-19,18.87,18.87,0,0,1,5.47-1.38,15.56,15.56,0,0,1,3.47.09Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M134.14,108.92c-2.51-2.84-5-5.72-7.54-8.53-5.26-5.77-10.56-11.52-16.13-17.58l9.47-8.38c.54.71.92,1.16,1.25,1.65q6.33,9.38,12.65,18.77a12.8,12.8,0,0,1,1.45,12.24,9.28,9.28,0,0,1-1.19,1.79Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M165.39,109.16c-.51-2.76-1.35-5.52-1.4-8.29a10.25,10.25,0,0,1,1.76-5.32c4.43-6.85,9.07-13.57,13.64-20.33a5.83,5.83,0,0,1,.71-.69l9.41,8.24c-8.19,9-16.16,17.69-24.12,26.42Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M134.1,108.88c-1.24,3.67-6.12,6.75-11,6.57-5.71-.21-11.41-.69-17.11-1.07-2.77-.19-5.53-.4-8.77-.64.84-4.22,1.63-8.23,2.47-12.44l34.42,7.62Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M165.39,109.19c3.82-.92,7.64-1.88,11.48-2.74,7-1.57,13.95-3.08,20.94-4.61.65-.15,1.31-.26,2.44-.49.84,4.13,1.64,8.14,2.5,12.41-5.81.42-11.16.82-16.5,1.19-2.85.2-5.71.38-8.57.52a12.85,12.85,0,0,1-11.59-5.64,4.94,4.94,0,0,0-.7-.67Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M52.48,226.14l15.24-35.77a3.13,3.13,0,0,1,3-2.15h2.15L53.61,233.81H50.33a7,7,0,0,1-1.92-.22,2.9,2.9,0,0,1-1.3-.77,5.9,5.9,0,0,1-.78-1c-.17-.29-.39-.72-.65-1.29l-17.9-42.34h8.64Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M103.82,213.05h-18v16.77h19.3a1.78,1.78,0,0,1,2,2v2H77.89V192.22a4.25,4.25,0,0,1,.91-3.07,4.14,4.14,0,0,1,3-.93h24v4h-20v16.83h18Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M152,188.22v45.59h-3.44q-3.22,0-6-3.44L118.7,197.74v36.07h-4V191.7a3.68,3.68,0,0,1,.8-2.67,3.6,3.6,0,0,1,2.64-.81h3.48L148,224.29V188.22Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M187.93,213.05H170v16.77h19.31a1.78,1.78,0,0,1,2,2v2H162V192.22a4.3,4.3,0,0,1,.91-3.07,4.18,4.18,0,0,1,3.06-.93h24v4H170v16.83h18Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M194.16,190.24a1.73,1.73,0,0,1,2-2h34.61v4H216.46v41.59h-8V192.22H194.16Z"
                transform="translate(-27.78 -66.19)"
              />
              <path
                className="cls-1"
                d="M227.08,233.81,245,191.47a6.23,6.23,0,0,1,1.8-2.45,4.66,4.66,0,0,1,2.85-.8h3.28l19.3,45.59h-4.35c-2.91,0-5-1.44-6.18-4.32l-3.05-7.31H236.35l-4.94,11.63Zm11-15.63H257l-9.46-22.29Z"
                transform="translate(-27.78 -66.19)"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation items={navigationItems} />
          </div>

          {/* Kontroller (Theme + Dil) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors duration-200 z-30"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 z-20 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden overflow-y-auto`}
        >
          <div className="flex flex-col h-full px-6 pt-16">
            <div className="mobile-navigation">
              <Navigation
                items={navigationItems}
                isMobile={true}
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
