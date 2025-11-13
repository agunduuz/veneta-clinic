"use client";

import { useSession } from "next-auth/react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">Veneta Clinic Yönetim Paneli</p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
          <div className="h-10 w-10 bg-gradient-to-br from-[#b2d6a1] to-[#68947c] rounded-full flex items-center justify-center text-white font-semibold">
            {session?.user?.name?.charAt(0) || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}
