// app/admin/contact/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedPage from "@/components/admin/ProtectedPage";
import { Save, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

type Locale = "tr" | "en";

interface ContactPageData {
  id: string;
  locale: string;
  headerTitle: string;
  headerDescription: string;
  headerButtonText: string;
  headerImage: string;
  formTitle: string;
  formDescription: string;
  happyCustomersText: string;
  reviewsRating: string;
  reviewsText: string;
  reviewsLink: string;
  addressLabel: string;
  addressText: string;
  addressLink: string;
  phoneLabel: string;
  phoneText: string;
  phoneLink: string;
  hoursLabel: string;
  hoursText: string;
  formTitleBox: string;
  formSubtitle: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  submitButtonText: string;
  submittingButtonText: string;
  successMessage: string;
  errorMessage: string;
  emailRecipient: string;
  emailSubject: string;
}

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactAdmin() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeTab, setActiveTab] = useState<"content" | "submissions">(
    "content"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState<ContactPageData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  // Load content
  const loadContent = useCallback(async () => {
    const res = await fetch(`/api/contact/content?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setContent(data);
    }
  }, [locale]);

  // Load submissions
  const loadSubmissions = useCallback(async () => {
    const res = await fetch(`/api/contact/submissions?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setSubmissions(data);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
    if (activeTab === "submissions") {
      loadSubmissions();
    }
  }, [locale, activeTab, loadContent, loadSubmissions]);

  // Save content
  const saveContent = async () => {
    if (!content) return;

    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/contact/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...content, locale }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  // Update submission status
  const updateSubmissionStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/contact/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    }
  };

  // Delete submission
  const deleteSubmission = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/contact/submissions/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const updateContent = (field: string, value: string) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
  };

  if (!content) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="p-8">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />

        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                İletişim Sayfası Yönetimi
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                İletişim sayfası içeriğini ve mesajları yönetin
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Dil:
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent bg-white"
              >
                <option value="tr">🇹🇷 Türkçe</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 md:mb-6 bg-green-50 border border-green-200 text-green-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm">
              ✅ Değişiklikler başarıyla kaydedildi!
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("content")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "content"
                    ? "border-[#b2d6a1] text-[#68947c]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                📝 Sayfa İçeriği
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "submissions"
                    ? "border-[#b2d6a1] text-[#68947c]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                📬 Gelen Mesajlar ({submissions.length})
              </button>
            </div>
          </div>

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  🎯 Header Section
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık (Çok satırlı için \n kullanın)
                    </label>
                    <textarea
                      value={content.headerTitle}
                      onChange={(e) =>
                        updateContent("headerTitle", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={content.headerDescription}
                      onChange={(e) =>
                        updateContent("headerDescription", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buton Metni
                      </label>
                      <input
                        type="text"
                        value={content.headerButtonText}
                        onChange={(e) =>
                          updateContent("headerButtonText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Görsel URL
                      </label>
                      <input
                        type="text"
                        value={content.headerImage}
                        onChange={(e) =>
                          updateContent("headerImage", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  📞 İletişim Bilgileri
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres Etiketi
                      </label>
                      <input
                        type="text"
                        value={content.addressLabel}
                        onChange={(e) =>
                          updateContent("addressLabel", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres Metni
                      </label>
                      <input
                        type="text"
                        value={content.addressText}
                        onChange={(e) =>
                          updateContent("addressText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Maps Link
                    </label>
                    <input
                      type="text"
                      value={content.addressLink}
                      onChange={(e) =>
                        updateContent("addressLink", e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Etiketi
                      </label>
                      <input
                        type="text"
                        value={content.phoneLabel}
                        onChange={(e) =>
                          updateContent("phoneLabel", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Numarası
                      </label>
                      <input
                        type="text"
                        value={content.phoneText}
                        onChange={(e) =>
                          updateContent("phoneText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Link (tel:...)
                      </label>
                      <input
                        type="text"
                        value={content.phoneLink}
                        onChange={(e) =>
                          updateContent("phoneLink", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çalışma Saatleri (Çok satır için \n kullanın)
                    </label>
                    <textarea
                      value={content.hoursText}
                      onChange={(e) =>
                        updateContent("hoursText", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  📝 Form Ayarları
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.formTitleBox}
                        onChange={(e) =>
                          updateContent("formTitleBox", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={content.formSubtitle}
                        onChange={(e) =>
                          updateContent("formSubtitle", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Placeholder
                      </label>
                      <input
                        type="text"
                        value={content.firstNamePlaceholder}
                        onChange={(e) =>
                          updateContent("firstNamePlaceholder", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soyad Placeholder
                      </label>
                      <input
                        type="text"
                        value={content.lastNamePlaceholder}
                        onChange={(e) =>
                          updateContent("lastNamePlaceholder", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Placeholder
                      </label>
                      <input
                        type="text"
                        value={content.emailPlaceholder}
                        onChange={(e) =>
                          updateContent("emailPlaceholder", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Placeholder
                      </label>
                      <input
                        type="text"
                        value={content.phonePlaceholder}
                        onChange={(e) =>
                          updateContent("phonePlaceholder", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj Placeholder
                    </label>
                    <input
                      type="text"
                      value={content.messagePlaceholder}
                      onChange={(e) =>
                        updateContent("messagePlaceholder", e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gönder Butonu
                      </label>
                      <input
                        type="text"
                        value={content.submitButtonText}
                        onChange={(e) =>
                          updateContent("submitButtonText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gönderiliyor Butonu
                      </label>
                      <input
                        type="text"
                        value={content.submittingButtonText}
                        onChange={(e) =>
                          updateContent("submittingButtonText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başarılı Mesajı
                    </label>
                    <textarea
                      value={content.successMessage}
                      onChange={(e) =>
                        updateContent("successMessage", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hata Mesajı
                    </label>
                    <textarea
                      value={content.errorMessage}
                      onChange={(e) =>
                        updateContent("errorMessage", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Google Reviews Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  ⭐ Google Yorumları
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (Puan)
                      </label>
                      <input
                        type="text"
                        value={content.reviewsRating}
                        onChange={(e) =>
                          updateContent("reviewsRating", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yorum Metni
                      </label>
                      <input
                        type="text"
                        value={content.reviewsText}
                        onChange={(e) =>
                          updateContent("reviewsText", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Link
                    </label>
                    <input
                      type="text"
                      value={content.reviewsLink}
                      onChange={(e) =>
                        updateContent("reviewsLink", e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mutlu Müşteri Badge Metni
                    </label>
                    <input
                      type="text"
                      value={content.happyCustomersText}
                      onChange={(e) =>
                        updateContent("happyCustomersText", e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  📧 Email Ayarları
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alıcı Email
                      </label>
                      <input
                        type="email"
                        value={content.emailRecipient}
                        onChange={(e) =>
                          updateContent("emailRecipient", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Konusu
                      </label>
                      <input
                        type="text"
                        value={content.emailSubject}
                        onChange={(e) =>
                          updateContent("emailSubject", e.target.value)
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="sticky bottom-4 flex justify-end">
                <button
                  onClick={saveContent}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === "submissions" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submissions List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Mesaj Listesi
                  </h2>

                  {submissions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Henüz mesaj yok
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => setSelectedSubmission(sub)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedSubmission?.id === sub.id
                              ? "bg-[#b2d6a1]/20 border border-[#b2d6a1]"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <div className="font-medium text-sm">
                              {sub.firstName} {sub.lastName}
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                sub.status === "new"
                                  ? "bg-blue-100 text-blue-800"
                                  : sub.status === "read"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {sub.status === "new"
                                ? "Yeni"
                                : sub.status === "read"
                                ? "Okundu"
                                : "Cevaplandı"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(sub.createdAt).toLocaleDateString(
                              "tr-TR"
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {sub.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Detail */}
              <div className="lg:col-span-2">
                {selectedSubmission ? (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Mesaj Detayı
                      </h2>
                      <button
                        onClick={() => deleteSubmission(selectedSubmission.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Sil
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ad Soyad
                          </label>
                          <p className="text-gray-900">
                            {selectedSubmission.firstName}{" "}
                            {selectedSubmission.lastName}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tarih
                          </label>
                          <p className="text-gray-900">
                            {new Date(
                              selectedSubmission.createdAt
                            ).toLocaleString("tr-TR")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Link
                            href={`mailto:${selectedSubmission.email}`}
                            className="text-[#68947c] hover:underline"
                          >
                            {selectedSubmission.email}
                          </Link>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon
                          </label>
                          <Link
                            href={`tel:${selectedSubmission.phone}`}
                            className="text-[#68947c] hover:underline"
                          >
                            {selectedSubmission.phone}
                          </Link>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mesaj
                        </label>
                        <p className="text-gray-900 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                          {selectedSubmission.message}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Durum
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateSubmissionStatus(
                                selectedSubmission.id,
                                "new"
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedSubmission.status === "new"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Yeni
                          </button>
                          <button
                            onClick={() =>
                              updateSubmissionStatus(
                                selectedSubmission.id,
                                "read"
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedSubmission.status === "read"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Okundu
                          </button>
                          <button
                            onClick={() =>
                              updateSubmissionStatus(
                                selectedSubmission.id,
                                "replied"
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedSubmission.status === "replied"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Cevaplandı
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-500">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Mesaj detayını görmek için listeden seçin</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}
