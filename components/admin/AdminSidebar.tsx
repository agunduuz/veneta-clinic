// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ProtectedPage from "./ProtectedPage";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Anasayfa",
    href: "/admin/homepage",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    name: "Header",
    href: "/admin/header",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    ),
  },
  {
    name: "Footer",
    href: "/admin/footer",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a2 2 0 012 2v14a2 2 0 01-2 2H5a1 1 0 01-1-1V5z"
        />
      </svg>
    ),
  },
  {
    name: "İletişim",
    href: "/admin/contact",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Hakkımızda",
    href: "/admin/about",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Lazer Epilasyon",
    href: "/admin/procedures/lazer-epilasyon",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    name: "Saç Ekimi",
    href: "/admin/procedures/sac-ekimi",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  // ✅ YENİ: Ameliyatlı Estetik (Dropdown)
  {
    name: "Ameliyatlı Estetik",
    href: "/admin/procedures/ameliyatli-estetik",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    hasDropdown: true,
    subItems: [
      {
        name: "Burun Estetiği",
        href: "/admin/procedures/burun-estetigi",
        badge: "Yakında",
      },
      {
        name: "Göğüs Estetiği",
        href: "/admin/procedures/gogus-estetigi",
        badge: "Yakında",
      },
      {
        name: "Karın Germe",
        href: "/admin/procedures/karin-germe",
        badge: "Yakında",
      },
    ],
  },
  {
    name: "Ayarlar",
    href: "/admin/settings",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    badge: "Yakında",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([
    "Ameliyatlı Estetik", // Default açık
  ]);

  const handleLogout = async () => {
    await signOut({ redirectTo: "/admin/login" });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <ProtectedPage>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          w-64 flex flex-col h-full bg-white border-r border-gray-200
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 px-6 py-5 border-b border-gray-200">
          <Image
            src="/veneta-logo.svg"
            alt="Veneta Clinic"
            width={120}
            height={40}
            className="flex-shrink-0"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const isDisabled = item.badge === "Yakında" && !item.hasDropdown;
            const isDropdownOpen = openDropdowns.includes(item.name);
            const hasActiveSubItem = item.subItems?.some(
              (sub) => pathname === sub.href
            );

            return (
              <div key={item.name}>
                {/* Main Item */}
                {/* Main Item */}
                {item.hasDropdown ? (
                  <div className="flex items-center gap-1">
                    {/* Link kısmı (ana sayfa) */}
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex-1 flex items-center gap-1 px-4 py-3 pr-1 rounded-l-lg transition-all duration-200 group ${
                        isActive || hasActiveSubItem
                          ? "bg-[#68947c] text-white shadow-md"
                          : "text-gray-700 hover:bg-[#f0f9ed]"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>

                    {/* Dropdown toggle button */}
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`px-1 py-3 rounded-r-lg transition-all duration-200 ${
                        isActive || hasActiveSubItem
                          ? "bg-[#68947c] text-white"
                          : "text-gray-700 hover:bg-[#f0f9ed]"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={isDisabled ? "#" : item.href}
                    onClick={() => {
                      if (isDisabled) return;
                      closeMobileMenu();
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white shadow-md"
                        : isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-[#f0f9ed]"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Dropdown Sub Items */}
                {item.hasDropdown && isDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                    {item.subItems?.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      const isSubDisabled = subItem.badge === "Yakında";

                      return (
                        <Link
                          key={subItem.name}
                          href={isSubDisabled ? "#" : subItem.href}
                          onClick={() => {
                            if (isSubDisabled) return;
                            closeMobileMenu();
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isSubActive
                              ? "bg-[#68947c] text-white"
                              : isSubDisabled
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-600 hover:bg-[#f0f9ed]"
                          }`}
                        >
                          <span>{subItem.name}</span>
                          {subItem.badge && (
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </ProtectedPage>
  );
}
