// components/Header/Navigation.tsx
"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation, useLocale } from "@/lib/i18n/context";
import type { MenuItem } from "@/data/navigation";
import { useState, useEffect } from "react";

export const Navigation = ({
  items,
  isMobile,
  onNavigate,
}: {
  items: MenuItem[];
  isMobile?: boolean;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close all submenus when pathname changes
  useEffect(() => {
    setOpenMenus([]);
  }, [pathname]);

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        {items.map((item, index) => {
          const href = item.href[locale];
          const title = t(`common.${item.titleKey}`);

          return (
            <div key={index} className="relative">
              {item.subMenus ? (
                <div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={href}
                      onClick={handleLinkClick}
                      className={`w-full text-left py-2 flex items-center justify-between text-lg font-medium ${
                        pathname === href
                          ? "text-primary"
                          : "text-accent-foreground"
                      }`}
                    >
                      {title}
                    </Link>
                    <ChevronDown
                      onClick={() => toggleMenu(index)}
                      className={`h-5 w-5 transition-transform duration-200 ${
                        openMenus.includes(index) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openMenus.includes(index) && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.subMenus.map((subMenu, subIndex) => {
                        const subHref = subMenu.href[locale];
                        const subTitle = t(`common.${subMenu.titleKey}`);

                        return (
                          <Link
                            key={subIndex}
                            href={subHref}
                            onClick={handleLinkClick}
                            className="block py-2 text-accent-foreground hover:text-primary transition-colors"
                          >
                            {subTitle}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={href}
                  onClick={handleLinkClick}
                  className={`block py-2 text-lg font-medium ${
                    pathname === href
                      ? "text-primary"
                      : "text-accent-foreground"
                  }`}
                >
                  {title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="links flex justify-between items-center gap-8">
      {items.map((item, index) => {
        const href = item.href[locale];
        const title = t(`common.${item.titleKey}`);

        return (
          <div key={index} className="relative group">
            <Link
              href={href}
              className={`text-accent-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 font-medium ${
                pathname === href ? "text-primary" : ""
              }`}
            >
              {title}
              {item.subMenus && (
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </Link>
            {item.subMenus && (
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all mt-2 -left-4 bg-background rounded-lg shadow-xl p-4 min-w-[350px] border-t-4 border-primary z-20">
                <div className="flex flex-col space-y-2">
                  {item.subMenus.map((subMenu, subIndex) => {
                    const subHref = subMenu.href[locale];
                    const subTitle = t(`common.${subMenu.titleKey}`);

                    return (
                      <Link
                        key={subIndex}
                        href={subHref}
                        className="text-background-foreground hover:text-primary flex items-center justify-between p-2 rounded-md hover:bg-muted transition-all"
                      >
                        {subTitle}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
