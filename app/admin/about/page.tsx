// app/admin/about/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedPage from "@/components/admin/ProtectedPage";
import { Save, Plus, Trash2, Info } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Locale = "tr" | "en";

interface AboutPageData {
  id: string;
  locale: string;
  headerTitle: string;
  headerTitleHighlight: string;
  headerSubtitle: string;
  headerDescription: string;
  headerButtonServices: string;
  headerButtonContact: string;
  headerImage: string;
  headerExperienceYears: string;
  headerExperienceText: string;
  featuresTitle: string;
  featuresTitleHighlight: string;
  featuresSubtitle: string;
  missionDoctorImage: string;
  missionQuote: string;
  missionTitle: string;
  missionSubtitle: string;
  missionDescription1: string;
  missionDescription2: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
}

interface Feature {
  id: string;
  featureId: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
}

export default function AboutAdmin() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeTab, setActiveTab] = useState<"content" | "features">("content");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState<AboutPageData | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);

  // Load content
  const loadContent = useCallback(async () => {
    const res = await fetch(`/api/about/content?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setContent(data);
    }
  }, [locale]);

  // Load features
  const loadFeatures = useCallback(async () => {
    const res = await fetch(`/api/about/features?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setFeatures(data);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
    if (activeTab === "features") {
      loadFeatures();
    }
  }, [locale, activeTab, loadContent, loadFeatures]);

  // Save content
  const saveContent = async () => {
    if (!content) return;

    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/about/content", {
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

  // Add feature
  const addFeature = async () => {
    const newFeature = {
      locale,
      featureId: String(features.length + 1).padStart(2, "0"),
      title: "Yeni Özellik",
      description: "Açıklama",
      image:
        "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?q=80&w=1200",
      order: features.length,
      active: true,
    };

    const res = await fetch("/api/about/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeature),
    });

    if (res.ok) {
      loadFeatures();
    }
  };

  // Update feature
  const updateFeature = async (id: string, data: Partial<Feature>) => {
    const res = await fetch(`/api/about/features/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadFeatures();
    }
  };

  // Delete feature
  const deleteFeature = async (id: string) => {
    if (!confirm("Bu özelliği silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/about/features/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadFeatures();
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
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Yükleniyor...</p>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hakkımızda Sayfası
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Hakkımızda sayfasının içeriğini buradan yönetebilirsiniz
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Dil:</span>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as Locale)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="tr">🇹🇷 Türkçe</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Success Alert */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-green-800">
                  Değişiklikler başarıyla kaydedildi!
                </p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex gap-1 p-1">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "content"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  📝 Sayfa İçeriği
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "features"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  ⭐ Özellikler ({features.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-8">
                  {/* Header Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Header Bölümü
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık
                        </label>
                        <input
                          type="text"
                          value={content.headerTitle}
                          onChange={(e) =>
                            updateContent("headerTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık Vurgusu
                        </label>
                        <input
                          type="text"
                          value={content.headerTitleHighlight}
                          onChange={(e) =>
                            updateContent(
                              "headerTitleHighlight",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={content.headerSubtitle}
                        onChange={(e) =>
                          updateContent("headerSubtitle", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Buton 1 (Hizmetler)
                        </label>
                        <input
                          type="text"
                          value={content.headerButtonServices}
                          onChange={(e) =>
                            updateContent(
                              "headerButtonServices",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Buton 2 (İletişim)
                        </label>
                        <input
                          type="text"
                          value={content.headerButtonContact}
                          onChange={(e) =>
                            updateContent("headerButtonContact", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <ImageUpload
                      currentImage={content.headerImage}
                      onUploadComplete={(url) =>
                        updateContent("headerImage", url)
                      }
                      label="Header Görseli"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tecrübe Yılı
                        </label>
                        <input
                          type="text"
                          value={content.headerExperienceYears}
                          onChange={(e) =>
                            updateContent(
                              "headerExperienceYears",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="15+"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tecrübe Metni
                          <span className="text-xs text-gray-500 ml-2">
                            (\n ile satır ayırın)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={content.headerExperienceText}
                          onChange={(e) =>
                            updateContent(
                              "headerExperienceText",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Yıl\nTecrübe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Özellikler Bölümü
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık
                        </label>
                        <input
                          type="text"
                          value={content.featuresTitle}
                          onChange={(e) =>
                            updateContent("featuresTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık Vurgusu
                        </label>
                        <input
                          type="text"
                          value={content.featuresTitleHighlight}
                          onChange={(e) =>
                            updateContent(
                              "featuresTitleHighlight",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={content.featuresSubtitle}
                        onChange={(e) =>
                          updateContent("featuresSubtitle", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Mission Section */}
                  <div className="space-y-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Misyon Bölümü
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ImageUpload
                        currentImage={content.missionDoctorImage}
                        onUploadComplete={(url) =>
                          updateContent("missionDoctorImage", url)
                        }
                        label="Doktor Görseli"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Misyon Başlığı
                        </label>
                        <input
                          type="text"
                          value={content.missionTitle}
                          onChange={(e) =>
                            updateContent("missionTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alıntı (Quote)
                      </label>
                      <textarea
                        value={content.missionQuote}
                        onChange={(e) =>
                          updateContent("missionQuote", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={content.missionSubtitle}
                        onChange={(e) =>
                          updateContent("missionSubtitle", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama 1
                      </label>
                      <textarea
                        value={content.missionDescription1}
                        onChange={(e) =>
                          updateContent("missionDescription1", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama 2
                      </label>
                      <textarea
                        value={content.missionDescription2}
                        onChange={(e) =>
                          updateContent("missionDescription2", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">
                        İstatistikler
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Stat 1 */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            İstatistik 1
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Değer
                            </label>
                            <input
                              type="text"
                              value={content.stat1Value}
                              onChange={(e) =>
                                updateContent("stat1Value", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Etiket
                            </label>
                            <input
                              type="text"
                              value={content.stat1Label}
                              onChange={(e) =>
                                updateContent("stat1Label", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Mutlu Müşteri"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            İstatistik 2
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Değer
                            </label>
                            <input
                              type="text"
                              value={content.stat2Value}
                              onChange={(e) =>
                                updateContent("stat2Value", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="15"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Etiket
                            </label>
                            <input
                              type="text"
                              value={content.stat2Label}
                              onChange={(e) =>
                                updateContent("stat2Label", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Yıl Tecrübe"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            İstatistik 3
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Değer
                            </label>
                            <input
                              type="text"
                              value={content.stat3Value}
                              onChange={(e) =>
                                updateContent("stat3Value", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="25"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Etiket
                            </label>
                            <input
                              type="text"
                              value={content.stat3Label}
                              onChange={(e) =>
                                updateContent("stat3Label", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Uzman Ekip"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stat 4 */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                            4
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            İstatistik 4
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Değer
                            </label>
                            <input
                              type="text"
                              value={content.stat4Value}
                              onChange={(e) =>
                                updateContent("stat4Value", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="10000"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Etiket
                            </label>
                            <input
                              type="text"
                              value={content.stat4Label}
                              onChange={(e) =>
                                updateContent("stat4Label", e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Başarılı İşlem"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      onClick={saveContent}
                      disabled={loading}
                      className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Kaydediliyor...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Değişiklikleri Kaydet
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Özellikler Listesi
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Hakkımızda sayfasında gösterilecek özellikleri yönetin
                      </p>
                    </div>
                    <button
                      onClick={addFeature}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Özellik
                    </button>
                  </div>

                  {features.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Info className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz özellik eklenmemiş
                      </p>
                      <button
                        onClick={addFeature}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Özelliği Ekle
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div
                          key={feature.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                                {feature.featureId}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Özellik {index + 1}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  ID: {feature.id.slice(0, 8)}...
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteFeature(feature.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  ID
                                </label>
                                <input
                                  type="text"
                                  value={feature.featureId}
                                  onChange={(e) =>
                                    updateFeature(feature.id, {
                                      featureId: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="01"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Sıra
                                </label>
                                <input
                                  type="number"
                                  value={feature.order}
                                  onChange={(e) =>
                                    updateFeature(feature.id, {
                                      order: parseInt(e.target.value),
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Başlık
                              </label>
                              <input
                                type="text"
                                value={feature.title}
                                onChange={(e) =>
                                  updateFeature(feature.id, {
                                    title: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Açıklama
                              </label>
                              <textarea
                                value={feature.description}
                                onChange={(e) =>
                                  updateFeature(feature.id, {
                                    description: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              />
                            </div>

                            <ImageUpload
                              currentImage={feature.image}
                              onUploadComplete={(url) =>
                                updateFeature(feature.id, { image: url })
                              }
                              label="Özellik Görseli"
                            />

                            <div className="flex items-center gap-2 pt-2">
                              <input
                                type="checkbox"
                                checked={feature.active}
                                onChange={(e) =>
                                  updateFeature(feature.id, {
                                    active: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <label className="text-sm font-medium text-gray-700">
                                Aktif
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
