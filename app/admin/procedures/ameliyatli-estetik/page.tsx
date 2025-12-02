// app/admin/procedures/ameliyatli-estetik/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedPage from "@/components/admin/ProtectedPage";
import { Save, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Locale = "tr" | "en";
type TabType = "main" | "features" | "about" | "process" | "whyus" | "faqs";

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
  categoriesIntroTitle?: string;
  categoriesIntroDescription?: string;
  deviceTitle: string;
  deviceDescription: string;
  deviceFeaturesTitle: string;
  deviceAdvantagesTitle: string;
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

interface AboutSection {
  id: string;
  title: string;
  description: string;
  areasTitle: string;
  advantagesTitle: string;
}

interface AboutArea {
  id: string;
  text: string;
  order: number;
  active: boolean;
}

interface AboutAdvantage {
  id: string;
  text: string;
  order: number;
  active: boolean;
}

interface Process {
  id: string;
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
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

export default function AmeliyatliEstetikAdmin() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [activeTab, setActiveTab] = useState<TabType>("main");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Main page data
  const [pageData, setPageData] = useState<ProcedurePageData | null>(null);

  // Related data
  const [features, setFeatures] = useState<Feature[]>([]);
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null);
  const [aboutAreas, setAboutAreas] = useState<AboutArea[]>([]);
  const [aboutAdvantages, setAboutAdvantages] = useState<AboutAdvantage[]>([]);
  const [processSteps, setProcessSteps] = useState<Process[]>([]);
  const [whyUs, setWhyUs] = useState<WhyUs[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Load main page data
  const loadPageData = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/ameliyatli-estetik?locale=${locale}`
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
        `/api/admin/procedures/ameliyatli-estetik/features?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error("Features fetch error:", error);
    }
  }, [locale]);

  // Load about data
  const loadAboutData = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/ameliyatli-estetik/about?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setAboutSection(data.aboutSection);
        setAboutAreas(data.aboutAreas || []);
        setAboutAdvantages(data.aboutAdvantages || []);
      }
    } catch (error) {
      console.error("About data fetch error:", error);
    }
  }, [locale]);

  // Load process steps
  const loadProcessSteps = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/ameliyatli-estetik/process?locale=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setProcessSteps(data);
      }
    } catch (error) {
      console.error("Process steps fetch error:", error);
    }
  }, [locale]);

  // Load why us
  const loadWhyUs = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/procedures/ameliyatli-estetik/why-us?locale=${locale}`
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
        `/api/admin/procedures/ameliyatli-estetik/faqs?locale=${locale}`
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
      case "about":
        loadAboutData();
        break;
      case "process":
        loadProcessSteps();
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
    loadAboutData,
    loadProcessSteps,
    loadWhyUs,
    loadFAQs,
  ]);

  // Save main page data
  const savePageData = async () => {
    if (!pageData) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/procedures/ameliyatli-estetik", {
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
      icon: "user-check",
      title: "Yeni Özellik",
      description: "Açıklama",
      order: features.length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/ameliyatli-estetik/features",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeature),
      }
    );

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

  // About Area operations
  const addAboutArea = async () => {
    const newArea = {
      locale,
      text: "Yeni alan",
      order: aboutAreas.length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/ameliyatli-estetik/about/areas",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArea),
      }
    );

    if (res.ok) {
      loadAboutData();
    }
  };

  const updateAboutArea = async (id: string, data: Partial<AboutArea>) => {
    const res = await fetch(`/api/admin/procedures/about-areas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadAboutData();
    }
  };

  const deleteAboutArea = async (id: string) => {
    if (!confirm("Bu alanı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/about-areas/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadAboutData();
    }
  };

  // About Advantage operations
  const addAboutAdvantage = async () => {
    const newAdvantage = {
      locale,
      text: "Yeni avantaj",
      order: aboutAdvantages.length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/ameliyatli-estetik/about/advantages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdvantage),
      }
    );

    if (res.ok) {
      loadAboutData();
    }
  };

  const updateAboutAdvantage = async (
    id: string,
    data: Partial<AboutAdvantage>
  ) => {
    const res = await fetch(`/api/admin/procedures/about-advantages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadAboutData();
    }
  };

  const deleteAboutAdvantage = async (id: string) => {
    if (!confirm("Bu avantajı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/about-advantages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadAboutData();
    }
  };

  // Process operations
  const addProcess = async () => {
    const newProcess = {
      locale,
      number: (processSteps.length + 1).toString(),
      title: "Yeni Adım",
      description: "Açıklama",
      bgColor: "bg-primary/20",
      textColor: "text-primary",
      order: processSteps.length,
      active: true,
    };

    const res = await fetch(
      "/api/admin/procedures/ameliyatli-estetik/process",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProcess),
      }
    );

    if (res.ok) {
      loadProcessSteps();
    }
  };

  const updateProcess = async (id: string, data: Partial<Process>) => {
    const res = await fetch(`/api/admin/procedures/process/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadProcessSteps();
    }
  };

  const deleteProcess = async (id: string) => {
    if (!confirm("Bu adımı silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/procedures/process/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadProcessSteps();
    }
  };

  // Why Us operations (same as lazer-epilasyon)
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

    const res = await fetch("/api/admin/procedures/ameliyatli-estetik/why-us", {
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

  // FAQ operations (same as lazer-epilasyon)
  const addFAQ = async () => {
    const newFAQ = {
      locale,
      question: "Yeni Soru",
      answer: "Cevap",
      order: faqs.length,
      active: true,
    };

    const res = await fetch("/api/admin/procedures/ameliyatli-estetik/faqs", {
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
                  Ameliyatlı Estetik Sayfası
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Ameliyatlı estetik ana sayfasının içeriğini buradan
                  yönetebilirsiniz
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
                  onClick={() => setActiveTab("about")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "about"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  📖 About ({aboutAreas.length + aboutAdvantages.length})
                </button>
                <button
                  onClick={() => setActiveTab("process")}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "process"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  🔄 Process ({processSteps.length})
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
              {/* TAB CONTENTS - Will be added in next message due to length */}
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
                            updatePageData("heroTitleHighlight", e.target.value)
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
                            updatePageData("heroButtonReviews", e.target.value)
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

                  {/* Categories Intro Section */}
                  <div className="space-y-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Kategoriler Tanıtım Bölümü
                      </h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategoriler Başlığı
                      </label>
                      <input
                        type="text"
                        value={pageData.categoriesIntroTitle || ""}
                        onChange={(e) =>
                          updatePageData("categoriesIntroTitle", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategoriler Açıklaması
                      </label>
                      <textarea
                        value={pageData.categoriesIntroDescription || ""}
                        onChange={(e) =>
                          updatePageData(
                            "categoriesIntroDescription",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                            updatePageData("ctaButtonWhatsApp", e.target.value)
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

              {/* FEATURES TAB - Same as lazer-epilasyon */}
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
                                <option value="user-check">
                                  👤 User Check
                                </option>
                                <option value="shield-check">
                                  🛡️ Shield Check
                                </option>
                                <option value="heart">❤️ Heart</option>
                                <option value="award">🏆 Award</option>
                                <option value="star">⭐ Star</option>
                                <option value="check-circle">
                                  ✓ Check Circle
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
                </div>
              )}

              {/* ABOUT TAB - NEW */}
              {activeTab === "about" && (
                <div className="space-y-8">
                  {/* About Section Main Info */}
                  {aboutSection && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        About Section Genel Bilgiler
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ana Başlık
                          </label>
                          <input
                            type="text"
                            value={aboutSection.title}
                            onChange={(e) =>
                              setAboutSection({
                                ...aboutSection,
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
                            value={aboutSection.description}
                            onChange={(e) =>
                              setAboutSection({
                                ...aboutSection,
                                description: e.target.value,
                              })
                            }
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Alanlar Başlığı
                            </label>
                            <input
                              type="text"
                              value={aboutSection.areasTitle}
                              onChange={(e) =>
                                setAboutSection({
                                  ...aboutSection,
                                  areasTitle: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Avantajlar Başlığı
                            </label>
                            <input
                              type="text"
                              value={aboutSection.advantagesTitle}
                              onChange={(e) =>
                                setAboutSection({
                                  ...aboutSection,
                                  advantagesTitle: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About Areas */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          🎯 Uygulama Alanları
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {aboutSection?.areasTitle || "Uygulama Alanları"}
                        </p>
                      </div>
                      <button
                        onClick={addAboutArea}
                        className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Ekle
                      </button>
                    </div>

                    <div className="space-y-3">
                      {aboutAreas.map((area, index) => (
                        <div
                          key={area.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold mt-1">
                            {index + 1}
                          </div>

                          <div className="flex-1">
                            <textarea
                              value={area.text}
                              onChange={(e) =>
                                updateAboutArea(area.id, {
                                  text: e.target.value,
                                })
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                              placeholder="Alan açıklaması..."
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={area.order}
                              onChange={(e) =>
                                updateAboutArea(area.id, {
                                  order: parseInt(e.target.value),
                                })
                              }
                              className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center"
                              title="Sıra"
                            />

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={area.active}
                                onChange={(e) =>
                                  updateAboutArea(area.id, {
                                    active: e.target.checked,
                                  })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>

                            <button
                              onClick={() => deleteAboutArea(area.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {aboutAreas.length === 0 && (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          Henüz alan eklenmemiş. Üstteki butona tıklayarak
                          ekleyebilirsiniz.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* About Advantages */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          ✨ Avantajlar
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {aboutSection?.advantagesTitle || "Avantajlar"}
                        </p>
                      </div>
                      <button
                        onClick={addAboutAdvantage}
                        className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Ekle
                      </button>
                    </div>

                    <div className="space-y-3">
                      {aboutAdvantages.map((advantage, index) => (
                        <div
                          key={advantage.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm font-bold mt-1">
                            {index + 1}
                          </div>

                          <div className="flex-1">
                            <textarea
                              value={advantage.text}
                              onChange={(e) =>
                                updateAboutAdvantage(advantage.id, {
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
                              value={advantage.order}
                              onChange={(e) =>
                                updateAboutAdvantage(advantage.id, {
                                  order: parseInt(e.target.value),
                                })
                              }
                              className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-center"
                              title="Sıra"
                            />

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={advantage.active}
                                onChange={(e) =>
                                  updateAboutAdvantage(advantage.id, {
                                    active: e.target.checked,
                                  })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>

                            <button
                              onClick={() => deleteAboutAdvantage(advantage.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {aboutAdvantages.length === 0 && (
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
                          Alanlar ve avantajlar yan yana 2 kolon halinde
                          gösterilir. Her birinden 4 adet eklemek önerilir.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {aboutAreas.length}
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Uygulama Alanı
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {aboutAdvantages.length}
                      </div>
                      <div className="text-sm text-green-700 mt-1">Avantaj</div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROCESS TAB - NEW */}
              {activeTab === "process" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Süreç Adımları
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Ameliyat sürecinin adımları (Konsültasyon, Operasyon,
                        İyileşme)
                      </p>
                    </div>
                    <button
                      onClick={addProcess}
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Adım
                    </button>
                  </div>

                  {processSteps.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Henüz süreç adımı eklenmemiş
                      </p>
                      <button
                        onClick={addProcess}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        İlk Adımı Ekle
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {processSteps.map((step) => (
                          <div
                            key={step.id}
                            className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-all ${
                              step.bgColor === "bg-primary/20"
                                ? "border-blue-200"
                                : step.bgColor === "bg-secondary/20"
                                ? "border-purple-200"
                                : "border-green-200"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                                    step.bgColor === "bg-primary/20"
                                      ? "bg-blue-100 text-blue-600"
                                      : step.bgColor === "bg-secondary/20"
                                      ? "bg-purple-100 text-purple-600"
                                      : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {step.number}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Sıra: {step.order}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => deleteProcess(step.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Numara
                                </label>
                                <input
                                  type="text"
                                  value={step.number}
                                  onChange={(e) =>
                                    updateProcess(step.id, {
                                      number: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="1, 2, 3..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Başlık
                                </label>
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) =>
                                    updateProcess(step.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Örn: Konsültasyon"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Açıklama
                                </label>
                                <textarea
                                  value={step.description}
                                  onChange={(e) =>
                                    updateProcess(step.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  rows={4}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  placeholder="Adım açıklaması..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Renk Teması
                                </label>
                                <select
                                  value={step.bgColor}
                                  onChange={(e) =>
                                    updateProcess(step.id, {
                                      bgColor: e.target.value,
                                      textColor: e.target.value.includes(
                                        "primary"
                                      )
                                        ? "text-primary"
                                        : e.target.value.includes("secondary")
                                        ? "text-secondary"
                                        : "text-accent",
                                    })
                                  }
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="bg-primary/20">
                                    🔵 Mavi (Primary)
                                  </option>
                                  <option value="bg-secondary/20">
                                    🟣 Mor (Secondary)
                                  </option>
                                  <option value="bg-accent/20">
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
                                    value={step.order}
                                    onChange={(e) =>
                                      updateProcess(step.id, {
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
                                        checked={step.active}
                                        onChange={(e) =>
                                          updateProcess(step.id, {
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
                              Önerilen: 3 adım
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              Süreç adımları 3 kolonlu grid`de gösterilir.
                              Konsültasyon, Operasyon, İyileşme gibi 3 ana adım
                              önerilir.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* WHY US TAB - Same as lazer-epilasyon */}
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
                                  <option value="user-check">
                                    👤 User Check
                                  </option>
                                  <option value="shield-check">
                                    🛡️ Shield Check
                                  </option>
                                  <option value="heart">❤️ Heart</option>
                                  <option value="headphones">
                                    🎧 Headphones
                                  </option>
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
                                  placeholder="Örn: Uzman Kadro"
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
                    </>
                  )}
                </div>
              )}

              {/* FAQs TAB - Same as lazer-epilasyon */}
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
