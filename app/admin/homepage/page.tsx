// app/admin/homepage/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import ProtectedPage from "@/components/admin/ProtectedPage";

type TabType =
  | "hero"
  | "about"
  | "features"
  | "procedures"
  | "testimonials"
  | "blog"
  | "cta";
type Locale = "tr" | "en";

interface Feature {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface Procedure {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  badge?: string | null;
  detailLink?: string | null;
  order: number;
  published: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  procedure: string;
  comment: string;
  rating: number;
  imageUrl?: string;
  active: boolean;
  order: number;
}
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string | null;
  readTime?: string | null;
  published: boolean;
}

export default function HomepageEditor() {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [locale, setLocale] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Hero Section State
  const [hero, setHero] = useState({
    title: "",
    description: "",
    stat1Number: "",
    stat1Text: "",
    stat2Number: "",
    stat2Text: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
    imageUrl: "",
  });

  // About Section State
  const [about, setAbout] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    imageUrl: "",
    rating: 4.88,
  });

  // Features State
  const [features, setFeatures] = useState<Feature[]>([]);

  // Procedures State
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // CTA Section State
  const [cta, setCta] = useState({
    title: "",
    description: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
  });

  const loadHeroData = useCallback(async () => {
    const res = await fetch(`/api/homepage/hero?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setHero(data);
    }
  }, [locale]);

  const loadAboutData = useCallback(async () => {
    const res = await fetch(`/api/homepage/about?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setAbout(data);
    }
  }, [locale]);

  const loadFeaturesData = useCallback(async () => {
    const res = await fetch(`/api/homepage/features?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setFeatures(data || []);
    }
  }, [locale]);

  const loadProceduresData = useCallback(async () => {
    const res = await fetch(`/api/homepage/procedures?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setProcedures(data || []);
    }
  }, [locale]);

  const loadBlogData = useCallback(async () => {
    const res = await fetch(`/api/homepage/blog?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setBlogPosts(data || []);
    }
  }, [locale]);

  const loadCtaData = useCallback(async () => {
    const res = await fetch(`/api/homepage/cta?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setCta(data);
    }
  }, [locale]);

  const loadTestimonialsData = useCallback(async () => {
    const res = await fetch(`/api/homepage/testimonials?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setTestimonials(data || []);
    }
  }, [locale]);

  // Load data when locale changes
  useEffect(() => {
    loadHeroData();
    loadAboutData();
    loadFeaturesData();
    loadProceduresData();
    loadTestimonialsData();
    loadBlogData();
    loadCtaData();
  }, [
    loadHeroData,
    loadAboutData,
    loadFeaturesData,
    loadProceduresData,
    loadTestimonialsData,
    loadBlogData,
    loadCtaData,
  ]);

  const saveHero = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...hero, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveAbout = async () => {
    setLoading(true);
    setSuccess(false);

    // Decode the buttonLink before saving
    const decodedAbout = {
      ...about,
      buttonLink: about.buttonLink?.replace(/&amp;/g, "&") || about.buttonLink,
    };

    const res = await fetch("/api/homepage/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...decodedAbout, locale }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveFeatures = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/features", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveProcedures = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/procedures", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ procedures, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveTestimonials = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testimonials, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveBlog = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogPosts, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const saveCta = async () => {
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/homepage/cta", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cta, locale }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: "hero", name: "Hero Section", icon: "🎯" },
    { id: "about", name: "Hakkımızda", icon: "ℹ️" },
    { id: "features", name: "Özellikler", icon: "⭐" },
    { id: "procedures", name: "Prosedürler", icon: "🏥" },
    { id: "testimonials", name: "Hasta Yorumları", icon: "💬" },
    { id: "blog", name: "Blog Yazıları", icon: "📝" },
    { id: "cta", name: "CTA Section", icon: "📢" },
  ];

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />

        <div className="p-4 md:p-8">
          {/* Header with Language Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-l md:text-2xl font-bold text-gray-900">
                Anasayfa Yönetimi
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                Anasayfa içeriğini düzenleyin
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 md:gap-3">
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
          <div className="bg-white rounded-lg shadow-sm mb-4 md:mb-6">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex px-2 md:px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm font-medium 
                      border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-[#b2d6a1] text-[#68947c]"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    <span className="mr-1 md:mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6">
              {/* HERO SECTION */}
              {activeTab === "hero" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Hero Section
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={hero.title}
                        onChange={(e) =>
                          setHero({ ...hero, title: e.target.value })
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <ImageUpload
                        label="Hero Görseli"
                        currentImage={hero.imageUrl}
                        onUploadComplete={(url) =>
                          setHero({ ...hero, imageUrl: url })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={hero.description}
                      onChange={(e) =>
                        setHero({ ...hero, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base text-sm md:text-base">
                        İstatistik 1
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sayı
                        </label>
                        <input
                          type="text"
                          value={hero.stat1Number}
                          onChange={(e) =>
                            setHero({ ...hero, stat1Number: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={hero.stat1Text}
                          onChange={(e) =>
                            setHero({ ...hero, stat1Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        İstatistik 2
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sayı
                        </label>
                        <input
                          type="text"
                          value={hero.stat2Number}
                          onChange={(e) =>
                            setHero({ ...hero, stat2Number: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={hero.stat2Text}
                          onChange={(e) =>
                            setHero({ ...hero, stat2Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        Buton 1
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={hero.button1Text}
                          onChange={(e) =>
                            setHero({ ...hero, button1Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link
                        </label>
                        <input
                          type="text"
                          value={hero.button1Link}
                          onChange={(e) =>
                            setHero({ ...hero, button1Link: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        Buton 2
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={hero.button2Text}
                          onChange={(e) =>
                            setHero({ ...hero, button2Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link
                        </label>
                        <input
                          type="text"
                          value={hero.button2Link}
                          onChange={(e) =>
                            setHero({ ...hero, button2Link: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveHero}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* ABOUT SECTION */}
              {activeTab === "about" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Hakkımızda Bölümü
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={about.title}
                        onChange={(e) =>
                          setAbout({ ...about, title: e.target.value })
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <ImageUpload
                        label="Hakkımızda Görseli"
                        currentImage={about.imageUrl}
                        onUploadComplete={(url) =>
                          setAbout({ ...about, imageUrl: url })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={about.description}
                      onChange={(e) =>
                        setAbout({ ...about, description: e.target.value })
                      }
                      rows={5}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buton Metni
                      </label>
                      <input
                        type="text"
                        value={about.buttonText}
                        onChange={(e) =>
                          setAbout({ ...about, buttonText: e.target.value })
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buton Linki
                      </label>
                      <input
                        type="text"
                        value={about.buttonLink}
                        onChange={(e) =>
                          setAbout({ ...about, buttonLink: e.target.value })
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (1-5)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="5"
                        value={about.rating}
                        onChange={(e) =>
                          setAbout({
                            ...about,
                            rating: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveAbout}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* FEATURES SECTION */}
              {activeTab === "features" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Özellikler
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  {!Array.isArray(features) || features.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Yükleniyor...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {features.map((feature, index) => (
                        <div
                          key={feature.id}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <h3 className="font-medium text-gray-900 text-sm md:text-base mb-4">
                            Özellik {index + 1}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Başlık
                              </label>
                              <input
                                type="text"
                                value={feature.title || ""}
                                onChange={(e) => {
                                  const updated = [...features];
                                  updated[index].title = e.target.value;
                                  setFeatures(updated);
                                }}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Açıklama
                              </label>
                              <textarea
                                value={feature.description || ""}
                                onChange={(e) => {
                                  const updated = [...features];
                                  updated[index].description = e.target.value;
                                  setFeatures(updated);
                                }}
                                rows={3}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveFeatures}
                      disabled={
                        loading ||
                        !Array.isArray(features) ||
                        features.length === 0
                      }
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* PROCEDURES SECTION */}
              {activeTab === "procedures" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Prosedürler
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  {!Array.isArray(procedures) || procedures.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Yükleniyor...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {procedures.map((procedure, index) => (
                        <div
                          key={procedure.id}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <h3 className="font-medium text-gray-900 text-sm md:text-base mb-4">
                            Prosedür {index + 1}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Başlık
                              </label>
                              <input
                                type="text"
                                value={procedure.title || ""}
                                onChange={(e) => {
                                  const updated = [...procedures];
                                  updated[index].title = e.target.value;
                                  setProcedures(updated);
                                }}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug (URL)
                              </label>
                              <input
                                type="text"
                                value={procedure.slug || ""}
                                onChange={(e) => {
                                  const updated = [...procedures];
                                  updated[index].slug = e.target.value;
                                  setProcedures(updated);
                                }}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                placeholder="lazer-epilasyon"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Açıklama
                              </label>
                              <textarea
                                value={procedure.description || ""}
                                onChange={(e) => {
                                  const updated = [...procedures];
                                  updated[index].description = e.target.value;
                                  setProcedures(updated);
                                }}
                                rows={3}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori
                              </label>
                              <select
                                value={procedure.category || "non-surgical"}
                                onChange={(e) => {
                                  const updated = [...procedures];
                                  updated[index].category = e.target.value;
                                  setProcedures(updated);
                                }}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              >
                                <option value="surgical">
                                  Ameliyatlı (Surgical)
                                </option>
                                <option value="non-surgical">
                                  Ameliyatsız (Non-Surgical)
                                </option>
                              </select>
                            </div>
                            <div>
                              <ImageUpload
                                label="Prosedür Görseli"
                                currentImage={procedure.imageUrl}
                                onUploadComplete={(url) => {
                                  const updated = [...procedures];
                                  updated[index].imageUrl = url;
                                  setProcedures(updated);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveProcedures}
                      disabled={
                        loading ||
                        !Array.isArray(procedures) ||
                        procedures.length === 0
                      }
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* TESTIMONIALS SECTION */}
              {activeTab === "testimonials" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Hasta Yorumları
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  {!Array.isArray(testimonials) || testimonials.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Yükleniyor...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={testimonial.id}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-medium text-gray-900 text-sm md:text-base">
                              Yorum {index + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm text-gray-500">
                                Aktif:
                              </span>
                              <input
                                type="checkbox"
                                checked={testimonial.active}
                                onChange={(e) => {
                                  const updated = [...testimonials];
                                  updated[index].active = e.target.checked;
                                  setTestimonials(updated);
                                }}
                                className="w-5 h-5 text-[#b2d6a1] rounded focus:ring-2 focus:ring-[#b2d6a1]"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  İsim
                                </label>
                                <input
                                  type="text"
                                  value={testimonial.name || ""}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index].name = e.target.value;
                                    setTestimonials(updated);
                                  }}
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  İşlem
                                </label>
                                <input
                                  type="text"
                                  value={testimonial.procedure || ""}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index].procedure = e.target.value;
                                    setTestimonials(updated);
                                  }}
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Yorum
                              </label>
                              <textarea
                                value={testimonial.comment || ""}
                                onChange={(e) => {
                                  const updated = [...testimonials];
                                  updated[index].comment = e.target.value;
                                  setTestimonials(updated);
                                }}
                                rows={4}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Rating (1-5)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="5"
                                  value={testimonial.rating || 5}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index].rating = parseInt(
                                      e.target.value
                                    );
                                    setTestimonials(updated);
                                  }}
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Sıra
                                </label>
                                <input
                                  type="number"
                                  value={testimonial.order || 0}
                                  onChange={(e) => {
                                    const updated = [...testimonials];
                                    updated[index].order = parseInt(
                                      e.target.value
                                    );
                                    setTestimonials(updated);
                                  }}
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveTestimonials}
                      disabled={
                        loading ||
                        !Array.isArray(testimonials) ||
                        testimonials.length === 0
                      }
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* BLOG SECTION */}
              {activeTab === "blog" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Blog Yazıları
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  {!Array.isArray(blogPosts) || blogPosts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Yükleniyor...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {blogPosts.map((post, index) => (
                        <div
                          key={post.id}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-medium text-gray-900 text-sm md:text-base">
                              Blog {index + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm text-gray-500">
                                Yayında:
                              </span>
                              <input
                                type="checkbox"
                                checked={post.published}
                                onChange={(e) => {
                                  const updated = [...blogPosts];
                                  updated[index].published = e.target.checked;
                                  setBlogPosts(updated);
                                }}
                                className="w-5 h-5 text-[#b2d6a1] rounded focus:ring-2 focus:ring-[#b2d6a1]"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Başlık
                              </label>
                              <input
                                type="text"
                                value={post.title || ""}
                                onChange={(e) => {
                                  const updated = [...blogPosts];
                                  updated[index].title = e.target.value;
                                  setBlogPosts(updated);
                                }}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug (URL)
                              </label>
                              <input
                                type="text"
                                value={post.slug || ""}
                                onChange={(e) => {
                                  const updated = [...blogPosts];
                                  updated[index].slug = e.target.value;
                                  setBlogPosts(updated);
                                }}
                                placeholder="burun-estetigi-dogal-sonuclar"
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Özet (Excerpt)
                              </label>
                              <textarea
                                value={post.excerpt || ""}
                                onChange={(e) => {
                                  const updated = [...blogPosts];
                                  updated[index].excerpt = e.target.value;
                                  setBlogPosts(updated);
                                }}
                                rows={3}
                                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Yazar
                                </label>
                                <input
                                  type="text"
                                  value={post.author || ""}
                                  onChange={(e) => {
                                    const updated = [...blogPosts];
                                    updated[index].author = e.target.value;
                                    setBlogPosts(updated);
                                  }}
                                  placeholder="Dr. Mehmet Yılmaz"
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Okuma Süresi
                                </label>
                                <input
                                  type="text"
                                  value={post.readTime || ""}
                                  onChange={(e) => {
                                    const updated = [...blogPosts];
                                    updated[index].readTime = e.target.value;
                                    setBlogPosts(updated);
                                  }}
                                  placeholder="5 dakika"
                                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveBlog}
                      disabled={
                        loading ||
                        !Array.isArray(blogPosts) ||
                        blogPosts.length === 0
                      }
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}

              {/* CTA SECTION */}
              {activeTab === "cta" && (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      CTA (Call-to-Action) Bölümü
                    </h2>
                    <span className="text-xs md:text-sm text-gray-500">
                      {locale === "tr"
                        ? "🇹🇷 Türkçe İçerik"
                        : "🇬🇧 English Content"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={cta.title}
                      onChange={(e) =>
                        setCta({ ...cta, title: e.target.value })
                      }
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={cta.description}
                      onChange={(e) =>
                        setCta({ ...cta, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        Buton 1
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={cta.button1Text}
                          onChange={(e) =>
                            setCta({ ...cta, button1Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link
                        </label>
                        <input
                          type="text"
                          value={cta.button1Link}
                          onChange={(e) =>
                            setCta({ ...cta, button1Link: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        Buton 2
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Metin
                        </label>
                        <input
                          type="text"
                          value={cta.button2Text}
                          onChange={(e) =>
                            setCta({ ...cta, button2Text: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link
                        </label>
                        <input
                          type="text"
                          value={cta.button2Link}
                          onChange={(e) =>
                            setCta({ ...cta, button2Link: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={saveCta}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
