// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Veneta Clinic",
  description: "Veneta Clinic Admin Yönetim Paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Header ve Footer render etme, sadece children
  return <div className="min-h-screen">{children}</div>;
}
