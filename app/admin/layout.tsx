import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminSessionProvider from "@/components/admin/AdminSessionProvider";

export const metadata: Metadata = {
  title: "Admin Panel | Veneta Clinic",
  description: "Veneta Clinic Admin Yönetim Paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden md:block">
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AdminSessionProvider>
  );
}
