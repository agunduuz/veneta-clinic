import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="p-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            👋 Hoş Geldiniz, {session.user?.name || "Admin"}!
          </h3>
          <p className="text-gray-600">
            Veneta Clinic yönetim paneline hoş geldiniz. Sol menüden
            işlemlerinize başlayabilirsiniz.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#b2d6a1]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Toplam Mesaj
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="h-12 w-12 bg-[#f0f9ed] rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-[#b2d6a1]"
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
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Yakında aktif olacak</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sayfalar</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-500"
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
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Yönetilebilir sayfalar</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Kullanıcılar
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Admin kullanıcıları</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Sistem Durumu
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">✓</p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Tüm sistemler aktif</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              🚀 Hızlı İşlemler
            </h4>
            <div className="space-y-3">
              <a
                href="/admin/homepage"
                className="block p-4 bg-[#f0f9ed] hover:bg-[#e8f5e2] rounded-lg transition-colors"
              >
                <p className="font-medium text-gray-900">
                  Anasayfa İçeriğini Düzenle
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Hero, istatistikler ve hizmetleri yönetin
                </p>
              </a>
              <button className="w-full p-4 bg-gray-100 rounded-lg cursor-not-allowed opacity-60">
                <p className="font-medium text-gray-500">Mesajları Görüntüle</p>
                <p className="text-sm text-gray-400 mt-1">
                  Yakında aktif olacak
                </p>
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              📊 Sistem Bilgisi
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Panel Versiyonu</span>
                <span className="text-sm font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Son Güncelleme</span>
                <span className="text-sm font-medium text-gray-900">Bugün</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Kullanıcı Rolü</span>
                <span className="text-sm font-medium text-[#b2d6a1]">
                  {session.user?.role || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
