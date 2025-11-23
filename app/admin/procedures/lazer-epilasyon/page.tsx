// app/admin/procedures/lazer-epilasyon/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedPage from "@/components/admin/ProtectedPage";
import { Save, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Locale = "tr" | "en";
type TabType =
  | "main"
  | "features"
  | "device"
  | "areas"
  | "pricing"
  | "whyus"
  | "faqs";

interface ProcedurePageData {
  id: string;
  slug: string;
  locale: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroButtonReviews: string;
  heroButtonPhone: string;
  heroImage: string;
  heroImageAlt: string;
  deviceTitle: string;
  deviceDescription: string;
  deviceFeaturesTitle: string;
  deviceAdvantagesTitle: string;
  pricingTitle: string;
  pricingDescription: string;
  pricingCallText: string;
  whyUsTitle: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonPhone: string;
  ctaButtonWhatsApp: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

interface DeviceItem {
  id: string;
  type: string;
  text: string;
  order: number;
  active: boolean;
}

interface TreatmentArea {
  id: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

interface Pricing {
  id: string;
  title: string;
  description: string;
  priceText: string;
  colorScheme: string;
  order: number;
  active: boolean;
}

interface WhyUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  colorScheme: string;
  order: number;
  active: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export default function LazerEpilasyonAdmin() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeTab, setActiveTab] = useState<TabType>("main");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Main page data
  const [pageData, setPageData] = useState<ProcedurePageData | null>(null);

  // Related data
  const [features, setFeatures] = useState<Feature[]>([]);
  const [deviceItems, setDeviceItems] = useState<DeviceItem[]>([]);
  const [treatmentAreas, setTreatmentAreas] = useState<TreatmentArea[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [whyUs, setWhyUs] = useState<WhyUs[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Load main page data
  const loadPageData = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
      }
    } catch (error) {
      console.error("Page data fetch error:", error);
    }
  }, [locale]);

  // Load features
  const loadFeatures = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/features?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error("Features fetch error:", error);
    }
  }, [locale]);

  // Load device items
  const loadDeviceItems = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/device-items?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setDeviceItems(data);
      }
    } catch (error) {
      console.error("Device items fetch error:", error);
    }
  }, [locale]);

  // Load treatment areas
  const loadTreatmentAreas = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/treatment-areas?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setTreatmentAreas(data);
      }
    } catch (error) {
      console.error("Treatment areas fetch error:", error);
    }
  }, [locale]);

  // Load pricing
  const loadPricing = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/pricing?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setPricing(data);
      }
    } catch (error) {
      console.error("Pricing fetch error:", error);
    }
  }, [locale]);

  // Load why us
  const loadWhyUs = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/why-us?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setWhyUs(data);
      }
    } catch (error) {
      console.error("Why us fetch error:", error);
    }
  }, [locale]);

  // Load FAQs
  const loadFAQs = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/lazer-epilasyon/faqs?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error("FAQs fetch error:", error);
    }
  }, [locale]);

  // Load data based on active tab
  useEffect(() => {
    loadPageData();

    switch (activeTab) {
      case "features":
        loadFeatures();
        break;
      case "device":
        loadDeviceItems();
        break;
      case "areas":
        loadTreatmentAreas();
        break;
      case "pricing":
        loadPricing();
        break;
      case "whyus":
        loadWhyUs();
        break;
      case "faqs":
        loadFAQs();
        break;
    }
  }, [
    locale,
    activeTab,
    loadPageData,
    loadFeatures,
    loadDeviceItems,
    loadTreatmentAreas,
    loadPricing,
    loadWhyUs,
    loadFAQs,
  ]);

  // Save main page data
  const savePageData = async () => {
    if (!pageData) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/procedures/lazer-epilasyon", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pageData, locale }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update page data field
  const updatePageData = (field: string, value: string) => {
    if (!pageData) return;
    setPageData({ ...pageData, [field]: value });
  };

  // Feature operations
  const addFeature = async () => {
    const newFeature = {
      locale,
      icon: "zap",
      title: "Yeni Özellik",
      description: "Açıklama",
      order: features.length,
      active: true,
    };

    const res = await fetch("/api/admin/procedures/lazer-epilasyon/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeature),
    });

    if (res.ok) {
      loadFeatures();
    }
  };

  const updateFeature = async (id: string, data: Partial<Feature>) => {
    const res = await fetch(`/api/admin/procedures/features/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadFeatures();
    }
  };

  const deleteFeature = async (id: string) => {
    if (!confirm("Bu özelliği silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/features/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadFeatures();
    }
  };

  // Device item operations
  const addDeviceItem = async (type: "feature" | "advantage") => {
    const newItem = {
      locale,
      type,
      text: "Yeni özellik",
      order: deviceItems.filter((item) => item.type === type).length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/lazer-epilasyon/device-items",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      }
    );

    if (res.ok) {
      loadDeviceItems();
    }
  };

  const updateDeviceItem = async (id: string, data: Partial<DeviceItem>) => {
    const res = await fetch(`/api/admin/procedures/device-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadDeviceItems();
    }
  };

  const deleteDeviceItem = async (id: string) => {
    if (!confirm("Bu öğeyi silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/device-items/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadDeviceItems();
    }
  };

  // Treatment area operations
  const addTreatmentArea = async () => {
    const newArea = {
      locale,
      title: "Yeni Bölge",
      description: "Açıklama",
      order: treatmentAreas.length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/lazer-epilasyon/treatment-areas",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArea),
      }
    );

    if (res.ok) {
      loadTreatmentAreas();
    }
  };

  const updateTreatmentArea = async (
    id: string,
    data: Partial<TreatmentArea>
  ) => {
    const res = await fetch(`/api/admin/procedures/treatment-areas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadTreatmentAreas();
    }
  };

  const deleteTreatmentArea = async (id: string) => {
    if (!confirm("Bu tedavi bölgesini silmek istediğinize emin misiniz?"))
      return;

    const res = await fetch(`/api/admin/procedures/treatment-areas/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadTreatmentAreas();
    }
  };

  // Pricing operations
  const addPricing = async () => {
    const newPricing = {
      locale,
      title: "Yeni Paket",
      description: "Açıklama",
      priceText: "Fiyat için arayın",
      colorScheme: "primary",
      order: pricing.length,
      active: true,
    };

    const res = await fetch("/api/admin/procedures/lazer-epilasyon/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPricing),
    });

    if (res.ok) {
      loadPricing();
    }
  };

  const updatePricing = async (id: string, data: Partial<Pricing>) => {
    const res = await fetch(`/api/admin/procedures/pricing/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadPricing();
    }
  };

  const deletePricing = async (id: string) => {
    if (!confirm("Bu fiyatlandırma paketini silmek istediğinize emin misiniz?"))
      return;

    const res = await fetch(`/api/admin/procedures/pricing/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadPricing();
    }
  };

  // Why Us operations
  const addWhyUs = async () => {
    const newWhyUs = {
      locale,
      icon: "heart",
      title: "Yeni Neden",
      description: "Açıklama",
      colorScheme: "primary",
      order: whyUs.length,
      active: true,
    };

    const res = await fetch("/api/admin/procedures/lazer-epilasyon/why-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWhyUs),
    });

    if (res.ok) {
      loadWhyUs();
    }
  };

  const updateWhyUs = async (id: string, data: Partial<WhyUs>) => {
    const res = await fetch(`/api/admin/procedures/why-us/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadWhyUs();
    }
  };

  const deleteWhyUs = async (id: string) => {
    if (!confirm("Bu nedeni silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/why-us/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadWhyUs();
    }
  };

  // FAQ operations
  const addFAQ = async () => {
    const newFAQ = {
      locale,
      question: "Yeni Soru",
      answer: "Cevap",
      order: faqs.length,
      active: true,
    };

    const res = await fetch("/api/admin/procedures/lazer-epilasyon/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFAQ),
    });

    if (res.ok) {
      loadFAQs();
    }
  };

  const updateFAQ = async (id: string, data: Partial<FAQ>) => {
    const res = await fetch(`/api/admin/procedures/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadFAQs();
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/faqs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadFAQs();
    }
  };

  if (!pageData) {
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
                  Lazer Epilasyon Sayfası
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Lazer epilasyon sayfasının içeriğini buradan yönetebilirsiniz
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
              <div className="flex gap-1 p-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("main")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "main"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  📄 Ana Bilgiler
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "features"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  ⚡ Features ({features.length})
                </button>
                <button
                  onClick={() => setActiveTab("device")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "device"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  🔧 Cihaz ({deviceItems.length})
                </button>
                <button
                  onClick={() => setActiveTab("areas")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "areas"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  📍 Bölgeler ({treatmentAreas.length})
                </button>
                <button
                  onClick={() => setActiveTab("pricing")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "pricing"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  💰 Fiyat ({pricing.length})
                </button>
                <button
                  onClick={() => setActiveTab("whyus")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "whyus"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  ⭐ Neden Biz ({whyUs.length})
                </button>
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "faqs"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  ❓ SSS ({faqs.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* TAB CONTENTS WILL GO HERE */}
              <div className="p-6">
                {/* MAIN TAB - Ana Bilgiler */}
                {activeTab === "main" && (
                  <div className="space-y-8">
                    {/* Hero Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Hero Bölümü
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Başlık
                          </label>
                          <input
                            type="text"
                            value={pageData.heroTitle}
                            onChange={(e) =>
                              updatePageData("heroTitle", e.target.value)
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
                            value={pageData.heroTitleHighlight}
                            onChange={(e) =>
                              updatePageData(
                                "heroTitleHighlight",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama
                        </label>
                        <textarea
                          value={pageData.heroDescription}
                          onChange={(e) =>
                            updatePageData("heroDescription", e.target.value)
                          }
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton 1 (Yorumlar)
                          </label>
                          <input
                            type="text"
                            value={pageData.heroButtonReviews}
                            onChange={(e) =>
                              updatePageData(
                                "heroButtonReviews",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton 2 (Telefon)
                          </label>
                          <input
                            type="text"
                            value={pageData.heroButtonPhone}
                            onChange={(e) =>
                              updatePageData("heroButtonPhone", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <ImageUpload
                            currentImage={pageData.heroImage}
                            onUploadComplete={(url) =>
                              updatePageData("heroImage", url)
                            }
                            label="Hero Görseli"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Önerilen boyut: 1200x900px (4:3 oran)
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Görsel Alt Metni
                          </label>
                          <input
                            type="text"
                            value={pageData.heroImageAlt}
                            onChange={(e) =>
                              updatePageData("heroImageAlt", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Device Section */}
                    <div className="space-y-6 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Cihaz Bilgisi Bölümü
                        </h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cihaz Başlığı
                        </label>
                        <input
                          type="text"
                          value={pageData.deviceTitle}
                          onChange={(e) =>
                            updatePageData("deviceTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cihaz Açıklaması
                        </label>
                        <textarea
                          value={pageData.deviceDescription}
                          onChange={(e) =>
                            updatePageData("deviceDescription", e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Özellikler Başlığı
                          </label>
                          <input
                            type="text"
                            value={pageData.deviceFeaturesTitle}
                            onChange={(e) =>
                              updatePageData(
                                "deviceFeaturesTitle",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Avantajlar Başlığı
                          </label>
                          <input
                            type="text"
                            value={pageData.deviceAdvantagesTitle}
                            onChange={(e) =>
                              updatePageData(
                                "deviceAdvantagesTitle",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-6 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Fiyatlandırma Bölümü
                        </h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fiyatlandırma Başlığı
                        </label>
                        <input
                          type="text"
                          value={pageData.pricingTitle}
                          onChange={(e) =>
                            updatePageData("pricingTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fiyatlandırma Açıklaması
                        </label>
                        <textarea
                          value={pageData.pricingDescription}
                          onChange={(e) =>
                            updatePageData("pricingDescription", e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fiyat Çağrı Metni
                        </label>
                        <input
                          type="text"
                          value={pageData.pricingCallText}
                          onChange={(e) =>
                            updatePageData("pricingCallText", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Fiyat için arayın"
                        />
                      </div>
                    </div>

                    {/* Why Us Section */}
                    <div className="space-y-6 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Neden Biz Bölümü
                        </h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Neden Biz Başlığı
                        </label>
                        <input
                          type="text"
                          value={pageData.whyUsTitle}
                          onChange={(e) =>
                            updatePageData("whyUsTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          SSS Bölümü
                        </h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SSS Başlığı
                        </label>
                        <input
                          type="text"
                          value={pageData.faqTitle}
                          onChange={(e) =>
                            updatePageData("faqTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-6 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          CTA Bölümü
                        </h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Başlığı
                        </label>
                        <input
                          type="text"
                          value={pageData.ctaTitle}
                          onChange={(e) =>
                            updatePageData("ctaTitle", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Açıklaması
                        </label>
                        <textarea
                          value={pageData.ctaDescription}
                          onChange={(e) =>
                            updatePageData("ctaDescription", e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CTA Buton 1 (Telefon)
                          </label>
                          <input
                            type="text"
                            value={pageData.ctaButtonPhone}
                            onChange={(e) =>
                              updatePageData("ctaButtonPhone", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CTA Buton 2 (WhatsApp)
                          </label>
                          <input
                            type="text"
                            value={pageData.ctaButtonWhatsApp}
                            onChange={(e) =>
                              updatePageData(
                                "ctaButtonWhatsApp",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6">
                      <button
                        onClick={savePageData}
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
              </div>
              {/* FEATURES TAB */}
              {activeTab === "features" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Özellikler Listesi
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Hero bölümünde gösterilecek 3 özellik kartı
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
                        <Plus className="h-6 w-6 text-gray-400" />
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {features.map((feature, index) => (
                        <div
                          key={feature.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Özellik {index + 1}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  Sıra: {feature.order}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteFeature(feature.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                İkon
                                <span className="text-xs text-gray-500 ml-2">
                                  (lucide-react)
                                </span>
                              </label>
                              <select
                                value={feature.icon}
                                onChange={(e) =>
                                  updateFeature(feature.id, {
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="zap">⚡ Zap (Hız)</option>
                                <option value="users">👥 Users (Ekip)</option>
                                <option value="check-circle">
                                  ✓ Check Circle (Onay)
                                </option>
                                <option value="shield">
                                  🛡️ Shield (Güvenlik)
                                </option>
                                <option value="heart">❤️ Heart (Sevgi)</option>
                                <option value="star">⭐ Star (Yıldız)</option>
                                <option value="award">🏆 Award (Ödül)</option>
                                <option value="target">
                                  🎯 Target (Hedef)
                                </option>
                              </select>
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

                            <div className="grid grid-cols-2 gap-3">
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

                              <div className="flex flex-col">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Aktif
                                </label>
                                <div className="flex items-center h-full">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={feature.active}
                                      onChange={(e) =>
                                        updateFeature(feature.id, {
                                          active: e.target.checked,
                                        })
                                      }
                                      className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {features.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-blue-600 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Önerilen: 3 özellik
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            Daha fazla özellik ekleyebilirsiniz ancak tasarım
                            için 3 özellik önerilir.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* DEVICE ITEMS TAB */}
              {activeTab === "device" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cihaz Özellikleri ve Avantajları
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Cihaz bilgisi bölümünde gösterilecek özellikler ve
                      avantajlar
                    </p>
                  </div>

                  {/* Features (Özellikler) */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          🔹 Teknolojik Özellikler
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {pageData.deviceFeaturesTitle}
                        </p>
                      </div>
                      <button
                        onClick={() => addDeviceItem("feature")}
                        className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Ekle
                      </button>
                    </div>

                    <div className="space-y-3">
                      {deviceItems
                        .filter((item) => item.type === "feature")
                        .map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold mt-1">
                              {index + 1}
                            </div>

                            <div className="flex-1">
                              <textarea
                                value={item.text}
                                onChange={(e) =>
                                  updateDeviceItem(item.id, {
                                    text: e.target.value,
                                  })
                                }
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                                placeholder="Özellik açıklaması..."
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={item.order}
                                onChange={(e) =>
                                  updateDeviceItem(item.id, {
                                    order: parseInt(e.target.value),
                                  })
                                }
                                className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
                                title="Sıra"
                              />

                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.active}
                                  onChange={(e) =>
                                    updateDeviceItem(item.id, {
                                      active: e.target.checked,
                                    })
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>

                              <button
                                onClick={() => deleteDeviceItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                      {deviceItems.filter((item) => item.type === "feature")
                        .length === 0 && (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          Henüz özellik eklenmemiş. Üstteki butona tıklayarak
                          ekleyebilirsiniz.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Advantages (Avantajlar) */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          ✨ Avantajları
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {pageData.deviceAdvantagesTitle}
                        </p>
                      </div>
                      <button
                        onClick={() => addDeviceItem("advantage")}
                        className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Ekle
                      </button>
                    </div>

                    <div className="space-y-3">
                      {deviceItems
                        .filter((item) => item.type === "advantage")
                        .map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm font-bold mt-1">
                              {index + 1}
                            </div>

                            <div className="flex-1">
                              <textarea
                                value={item.text}
                                onChange={(e) =>
                                  updateDeviceItem(item.id, {
                                    text: e.target.value,
                                  })
                                }
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                                placeholder="Avantaj açıklaması..."
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={item.order}
                                onChange={(e) =>
                                  updateDeviceItem(item.id, {
                                    order: parseInt(e.target.value),
                                  })
                                }
                                className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-center"
                                title="Sıra"
                              />

                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.active}
                                  onChange={(e) =>
                                    updateDeviceItem(item.id, {
                                      active: e.target.checked,
                                    })
                                  }
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>

                              <button
                                onClick={() => deleteDeviceItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                      {deviceItems.filter((item) => item.type === "advantage")
                        .length === 0 && (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          Henüz avantaj eklenmemiş. Üstteki butona tıklayarak
                          ekleyebilirsiniz.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-amber-600 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          İpucu
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          Özellikler ve avantajlar yan yana 2 kolon halinde
                          gösterilir. Her birinden 4 adet eklemek önerilir.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          deviceItems.filter((item) => item.type === "feature")
                            .length
                        }
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Teknolojik Özellik
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          deviceItems.filter(
                            (item) => item.type === "advantage"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-green-700 mt-1">Avantaj</div>
                    </div>
                  </div>
                </div>
              )}
              {/* TREATMENT AREAS TAB */}
              {activeTab === "areas" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Tedavi Bölgeleri
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Lazer epilasyon uygulanabilecek bölgeler
                      </p>
                    </div>
                    <button
                      onClick={addTreatmentArea}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Bölge
                    </button>
                  </div>

                  {treatmentAreas.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz tedavi bölgesi eklenmemiş
                      </p>
                      <button
                        onClick={addTreatmentArea}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Bölgeyi Ekle
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatmentAreas.map((area, index) => (
                          <div
                            key={area.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Sıra: {area.order}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => deleteTreatmentArea(area.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Bölge Adı
                                </label>
                                <input
                                  type="text"
                                  value={area.title}
                                  onChange={(e) =>
                                    updateTreatmentArea(area.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Örn: Yüz Bölgesi"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Açıklama
                                </label>
                                <textarea
                                  value={area.description}
                                  onChange={(e) =>
                                    updateTreatmentArea(area.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  rows={3}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  placeholder="Örn: Üst dudak, çene, yanaklar"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sıra
                                  </label>
                                  <input
                                    type="number"
                                    value={area.order}
                                    onChange={(e) =>
                                      updateTreatmentArea(area.id, {
                                        order: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Aktif
                                  </label>
                                  <div className="flex items-center h-full">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={area.active}
                                        onChange={(e) =>
                                          updateTreatmentArea(area.id, {
                                            active: e.target.checked,
                                          })
                                        }
                                        className="sr-only peer"
                                      />
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info Box */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <svg
                            className="h-5 w-5 text-purple-600 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-purple-800">
                              Önerilen: 6 bölge
                            </p>
                            <p className="text-sm text-purple-700 mt-1">
                              Bölgeler 3 kolonlu grid`de gösterilir. 6 bölge
                              eklemek ideal görünüm sağlar.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {treatmentAreas.length}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Toplam Bölge
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {
                              treatmentAreas.filter((area) => area.active)
                                .length
                            }
                          </div>
                          <div className="text-sm text-green-700 mt-1">
                            Aktif
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {
                              treatmentAreas.filter((area) => !area.active)
                                .length
                            }
                          </div>
                          <div className="text-sm text-red-700 mt-1">Pasif</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* PRICING TAB */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Fiyatlandırma Paketleri
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Farklı paket seçenekleri ve fiyatları
                      </p>
                    </div>
                    <button
                      onClick={addPricing}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Paket
                    </button>
                  </div>

                  {pricing.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz fiyatlandırma paketi eklenmemiş
                      </p>
                      <button
                        onClick={addPricing}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Paketi Ekle
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricing.map((price, index) => (
                          <div
                            key={price.id}
                            className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${
                              price.colorScheme === "primary"
                                ? "border-blue-200 hover:border-blue-400"
                                : price.colorScheme === "secondary"
                                ? "border-purple-200 hover:border-purple-400"
                                : "border-green-200 hover:border-green-400"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                                    price.colorScheme === "primary"
                                      ? "bg-blue-100 text-blue-600"
                                      : price.colorScheme === "secondary"
                                      ? "bg-purple-100 text-purple-600"
                                      : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Sıra: {price.order}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => deletePricing(price.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Paket Adı
                                </label>
                                <input
                                  type="text"
                                  value={price.title}
                                  onChange={(e) =>
                                    updatePricing(price.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Örn: Tüm Vücut"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Açıklama
                                </label>
                                <textarea
                                  value={price.description}
                                  onChange={(e) =>
                                    updatePricing(price.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  rows={2}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  placeholder="Örn: Yüz dahil tüm bölgeler"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Fiyat Metni
                                </label>
                                <input
                                  type="text"
                                  value={price.priceText}
                                  onChange={(e) =>
                                    updatePricing(price.id, {
                                      priceText: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Örn: Fiyat için arayın veya 5000₺"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Renk Teması
                                </label>
                                <select
                                  value={price.colorScheme}
                                  onChange={(e) =>
                                    updatePricing(price.id, {
                                      colorScheme: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="primary">
                                    🔵 Mavi (Primary)
                                  </option>
                                  <option value="secondary">
                                    🟣 Mor (Secondary)
                                  </option>
                                  <option value="accent">
                                    🟢 Yeşil (Accent)
                                  </option>
                                </select>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sıra
                                  </label>
                                  <input
                                    type="number"
                                    value={price.order}
                                    onChange={(e) =>
                                      updatePricing(price.id, {
                                        order: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Aktif
                                  </label>
                                  <div className="flex items-center h-full">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={price.active}
                                        onChange={(e) =>
                                          updatePricing(price.id, {
                                            active: e.target.checked,
                                          })
                                        }
                                        className="sr-only peer"
                                      />
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info Box */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <svg
                            className="h-5 w-5 text-blue-600 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-blue-800">
                              Önerilen: 3 paket
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              Fiyatlandırma kartları 3 kolonlu grid`de
                              gösterilir. Her renk teması farklı paket için
                              kullanılabilir.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Color Scheme Preview */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Renk Teması Önizleme
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              Primary
                            </div>
                            <div className="text-xs text-blue-700">
                              Mavi teması
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              Secondary
                            </div>
                            <div className="text-xs text-purple-700">
                              Mor teması
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              Accent
                            </div>
                            <div className="text-xs text-green-700">
                              Yeşil teması
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {pricing.length}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Toplam Paket
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {pricing.filter((p) => p.active).length}
                          </div>
                          <div className="text-sm text-green-700 mt-1">
                            Aktif
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {pricing.filter((p) => !p.active).length}
                          </div>
                          <div className="text-sm text-red-700 mt-1">Pasif</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* WHY US TAB */}
              {activeTab === "whyus" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Neden Bizi Tercih Etmelisiniz
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Klinik olarak neden tercih edilmelisiniz nedenler
                      </p>
                    </div>
                    <button
                      onClick={addWhyUs}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Neden
                    </button>
                  </div>

                  {whyUs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz neden eklenmemiş
                      </p>
                      <button
                        onClick={addWhyUs}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Nedeni Ekle
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyUs.map((reason, index) => (
                          <div
                            key={reason.id}
                            className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${
                              reason.colorScheme === "primary"
                                ? "border-blue-200 hover:border-blue-400"
                                : reason.colorScheme === "secondary"
                                ? "border-purple-200 hover:border-purple-400"
                                : reason.colorScheme === "accent"
                                ? "border-green-200 hover:border-green-400"
                                : "border-red-200 hover:border-red-400"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                                    reason.colorScheme === "primary"
                                      ? "bg-blue-100 text-blue-600"
                                      : reason.colorScheme === "secondary"
                                      ? "bg-purple-100 text-purple-600"
                                      : reason.colorScheme === "accent"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Sıra: {reason.order}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => deleteWhyUs(reason.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  İkon
                                  <span className="text-xs text-gray-500 ml-2">
                                    (lucide-react)
                                  </span>
                                </label>
                                <select
                                  value={reason.icon}
                                  onChange={(e) =>
                                    updateWhyUs(reason.id, {
                                      icon: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="lightning">
                                    ⚡ Lightning
                                  </option>
                                  <option value="users">👥 Users</option>
                                  <option value="dollar">💰 Dollar</option>
                                  <option value="heart">❤️ Heart</option>
                                  <option value="shield">🛡️ Shield</option>
                                  <option value="award">🏆 Award</option>
                                  <option value="star">⭐ Star</option>
                                  <option value="check-circle">✓ Check</option>
                                  <option value="thumbs-up">
                                    👍 Thumbs Up
                                  </option>
                                  <option value="clock">⏰ Clock</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Başlık
                                </label>
                                <input
                                  type="text"
                                  value={reason.title}
                                  onChange={(e) =>
                                    updateWhyUs(reason.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Örn: Hızlı İşlem"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Açıklama
                                </label>
                                <textarea
                                  value={reason.description}
                                  onChange={(e) =>
                                    updateWhyUs(reason.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  rows={3}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  placeholder="Kısa açıklama..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Renk Teması
                                </label>
                                <select
                                  value={reason.colorScheme}
                                  onChange={(e) =>
                                    updateWhyUs(reason.id, {
                                      colorScheme: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="primary">🔵 Mavi</option>
                                  <option value="secondary">🟣 Mor</option>
                                  <option value="accent">🟢 Yeşil</option>
                                  <option value="destructive">
                                    🔴 Kırmızı
                                  </option>
                                </select>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sıra
                                  </label>
                                  <input
                                    type="number"
                                    value={reason.order}
                                    onChange={(e) =>
                                      updateWhyUs(reason.id, {
                                        order: parseInt(e.target.value),
                                      })
                                    }
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Aktif
                                  </label>
                                  <div className="flex items-center h-full">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={reason.active}
                                        onChange={(e) =>
                                          updateWhyUs(reason.id, {
                                            active: e.target.checked,
                                          })
                                        }
                                        className="sr-only peer"
                                      />
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info Box */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <svg
                            className="h-5 w-5 text-amber-600 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-amber-800">
                              Önerilen: 4 neden
                            </p>
                            <p className="text-sm text-amber-700 mt-1">
                              Nedenler 4 kolonlu grid`de gösterilir. Her renk
                              teması farklı neden için kullanılabilir.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Color Scheme Preview */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Renk Teması Önizleme
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-blue-600 mb-1">
                              Primary
                            </div>
                            <div className="text-xs text-blue-700">Mavi</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-purple-600 mb-1">
                              Secondary
                            </div>
                            <div className="text-xs text-purple-700">Mor</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-green-600 mb-1">
                              Accent
                            </div>
                            <div className="text-xs text-green-700">Yeşil</div>
                          </div>
                          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-red-600 mb-1">
                              Destructive
                            </div>
                            <div className="text-xs text-red-700">Kırmızı</div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {whyUs.length}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Toplam Neden
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {whyUs.filter((w) => w.active).length}
                          </div>
                          <div className="text-sm text-green-700 mt-1">
                            Aktif
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {whyUs.filter((w) => !w.active).length}
                          </div>
                          <div className="text-sm text-red-700 mt-1">Pasif</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* FAQs TAB */}
              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Sıkça Sorulan Sorular
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Müşterilerin en çok sorduğu sorular ve cevapları
                      </p>
                    </div>
                    <button
                      onClick={addFAQ}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Soru
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz soru eklenmemiş
                      </p>
                      <button
                        onClick={addFAQ}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Soruyu Ekle
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div
                            key={faq.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-4">
                              {/* Number Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-md">
                                  {index + 1}
                                </div>
                                <div className="text-center mt-2">
                                  <p className="text-xs text-gray-500">
                                    Sıra: {faq.order}
                                  </p>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-4">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Soru
                                    </label>
                                    <button
                                      onClick={() => deleteFAQ(faq.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Sil"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={faq.question}
                                    onChange={(e) =>
                                      updateFAQ(faq.id, {
                                        question: e.target.value,
                                      })
                                    }
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Soru yazın..."
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cevap
                                  </label>
                                  <textarea
                                    value={faq.answer}
                                    onChange={(e) =>
                                      updateFAQ(faq.id, {
                                        answer: e.target.value,
                                      })
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Cevap yazın..."
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sıra
                                      </label>
                                      <input
                                        type="number"
                                        value={faq.order}
                                        onChange={(e) =>
                                          updateFAQ(faq.id, {
                                            order: parseInt(e.target.value),
                                          })
                                        }
                                        className="w-24 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Durum
                                      </label>
                                      <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={faq.active}
                                          onChange={(e) =>
                                            updateFAQ(faq.id, {
                                              active: e.target.checked,
                                            })
                                          }
                                          className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-700">
                                          {faq.active ? "Aktif" : "Pasif"}
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  {/* Karakter Sayısı */}
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">
                                      Soru: {faq.question.length} karakter
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Cevap: {faq.answer.length} karakter
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info Box */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <svg
                            className="h-5 w-5 text-blue-600 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-blue-800">
                              İpuçları
                            </p>
                            <ul className="text-sm text-blue-700 mt-1 space-y-1 list-disc list-inside">
                              <li>Soruları kısa ve net tutun</li>
                              <li>Cevaplarda açıklayıcı olun</li>
                              <li>Önerilen: 5-10 soru</li>
                              <li>En çok sorulan soruları üste koyun</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {faqs.length}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Toplam Soru
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {faqs.filter((f) => f.active).length}
                          </div>
                          <div className="text-sm text-green-700 mt-1">
                            Aktif
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {faqs.filter((f) => !f.active).length}
                          </div>
                          <div className="text-sm text-red-700 mt-1">Pasif</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(
                              faqs.reduce(
                                (acc, f) => acc + f.answer.length,
                                0
                              ) / faqs.length || 0
                            )}
                          </div>
                          <div className="text-sm text-blue-700 mt-1">
                            Ort. Cevap Uzunluğu
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Hızlı İşlemler
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              const sortedFaqs = [...faqs].sort(
                                (a, b) => a.order - b.order
                              );
                              sortedFaqs.forEach((faq, idx) => {
                                updateFAQ(faq.id, { order: idx + 1 });
                              });
                            }}
                            className="px-4 py-3 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            🔢 Sıralamayı Düzenle
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Tüm soruları aktif hale getirmek istediğinize emin misiniz?"
                                )
                              ) {
                                faqs.forEach((faq) => {
                                  updateFAQ(faq.id, { active: true });
                                });
                              }
                            }}
                            className="px-4 py-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                          >
                            ✅ Hepsini Aktif Et
                          </button>
                        </div>
                      </div>
                    </>
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
