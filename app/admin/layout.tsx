// app/admin/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <SessionProvider>
      {isLoginPage ? (
        // Login sayfası - Sidebar YOK
        <>{children}</>
      ) : (
        // Diğer admin sayfalar - Sidebar VAR
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <AdminSidebar />
          </aside>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      )}
    </SessionProvider>
  );
}
