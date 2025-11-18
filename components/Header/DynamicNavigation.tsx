// components/Header/DynamicNavigation.tsx
"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/context";
import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
  href: string;
  openInNewTab: boolean;
  children?: NavItem[];
}

export const DynamicNavigation = ({
  isMobile,
  onNavigate,
}: {
  isMobile?: boolean;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch navigation items
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/header?locale=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setNavItems(data);
        }
      } catch (error) {
        console.error("Navigation fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavItems();
  }, [locale]);

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

  if (!mounted || loading) {
    return (
      <div className="animate-pulse flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        {navItems.map((item, index) => {
          return (
            <div key={item.id} className="relative">
              {item.children && item.children.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={
                        item.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className={`w-full text-left py-2 flex items-center justify-between text-lg font-medium ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-accent-foreground"
                      }`}
                    >
                      {item.title}
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
                      {item.children.map((subItem) => {
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            target={subItem.openInNewTab ? "_blank" : undefined}
                            rel={
                              subItem.openInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block py-2 text-accent-foreground hover:text-primary transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className={`block py-2 text-lg font-medium ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-accent-foreground"
                  }`}
                >
                  {item.title}
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
      {navItems.map((item) => {
        return (
          <div key={item.id} className="relative group">
            <Link
              href={item.href}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              className={`text-accent-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 font-medium ${
                pathname === item.href ? "text-primary" : ""
              }`}
            >
              {item.title}
              {item.children && item.children.length > 0 && (
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </Link>
            {item.children && item.children.length > 0 && (
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all mt-2 -left-4 bg-background rounded-lg shadow-xl p-4 min-w-[350px] border-t-4 border-primary z-20">
                <div className="flex flex-col space-y-2">
                  {item.children.map((subItem) => {
                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        target={subItem.openInNewTab ? "_blank" : undefined}
                        rel={
                          subItem.openInNewTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-background-foreground hover:text-primary flex items-center justify-between p-2 rounded-md hover:bg-muted transition-all"
                      >
                        {subItem.title}
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
