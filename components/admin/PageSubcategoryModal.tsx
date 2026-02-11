// components/admin/PageSubcategoryModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Eye,
  EyeOff,
  GripVertical,
  FileText,
  Search,
  Globe,
} from "lucide-react";

// ============================================
// TYPES
// ============================================
interface ContentSection {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition: "left" | "right" | "top" | "bottom" | "none";
  order: number;
}

interface PageSubcategoryData {
  id?: string;
  parentSlug: string;
  slug: string;
  locale: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  sections: ContentSection[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  order: number;
  published: boolean;
}

interface PageSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  parentSlug: string;
  parentLabel: string;
  editId?: string | null;
  locale?: string;
}

// ============================================
// HELPER: Generate slug from title
// ============================================
function generateSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    İ: "i",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  };
  return text
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ============================================
// HELPER: Empty section
// ============================================
function createEmptySection(order: number): ContentSection {
  return {
    id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: "",
    content: "",
    imageUrl: "",
    imageAlt: "",
    imagePosition: "right",
    order,
  };
}

// ============================================
// HELPER: Empty form data
// ============================================
function createEmptyFormData(
  parentSlug: string,
  locale: string,
): PageSubcategoryData {
  return {
    parentSlug,
    slug: "",
    locale,
    heroTitle: "",
    heroHighlight: "",
    heroDescription: "",
    heroImage: "",
    heroImageAlt: "",
    sections: [createEmptySection(0)],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    order: 0,
    published: false,
  };
}

// ============================================
// TABS
// ============================================
const TABS = [
  { id: "hero", label: "Hero", icon: ImageIcon },
  { id: "sections", label: "İçerik Bölümleri", icon: FileText },
  { id: "seo", label: "SEO", icon: Search },
  { id: "settings", label: "Ayarlar", icon: Globe },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ============================================
// MAIN COMPONENT
// ============================================
export default function PageSubcategoryModal({
  isOpen,
  onClose,
  onSave,
  parentSlug,
  parentLabel,
  editId,
  locale = "tr",
}: PageSubcategoryModalProps) {
  const [formData, setFormData] = useState<PageSubcategoryData>(
    createEmptyFormData(parentSlug, locale),
  );
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(true);

  // ============================================
  // LOAD DATA (edit mode)
  // ============================================
  useEffect(() => {
    if (!isOpen) return;

    if (editId) {
      // Edit mode — fetch existing data
      setLoading(true);
      fetch(`/api/admin/page-subcategories/${editId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Veri yüklenemedi");
          return res.json();
        })
        .then((data) => {
          setFormData({
            id: data.id,
            parentSlug: data.parentSlug,
            slug: data.slug,
            locale: data.locale,
            heroTitle: data.heroTitle || "",
            heroHighlight: data.heroHighlight || "",
            heroDescription: data.heroDescription || "",
            heroImage: data.heroImage || "",
            heroImageAlt: data.heroImageAlt || "",
            sections: data.sections || [createEmptySection(0)],
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            metaKeywords: data.metaKeywords || "",
            order: data.order || 0,
            published: data.published || false,
          });
          setAutoSlug(false);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      // Create mode — reset
      setFormData(createEmptyFormData(parentSlug, locale));
      setActiveTab("hero");
      setAutoSlug(true);
      setError(null);
    }
  }, [isOpen, editId, parentSlug, locale]);

  // ============================================
  // AUTO-SLUG
  // ============================================
  useEffect(() => {
    if (autoSlug && formData.heroTitle) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.heroTitle),
      }));
    }
  }, [formData.heroTitle, autoSlug]);

  // ============================================
  // HANDLERS
  // ============================================
  const updateField = (field: keyof PageSubcategoryData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Section handlers
  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, createEmptySection(prev.sections.length)],
    }));
  };

  const updateSection = (
    sectionId: string,
    field: keyof ContentSection,
    value: unknown,
  ) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, [field]: value } : s,
      ),
    }));
  };

  const removeSection = (sectionId: string) => {
    if (formData.sections.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections
        .filter((s) => s.id !== sectionId)
        .map((s, i) => ({ ...s, order: i })),
    }));
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    setFormData((prev) => {
      const idx = prev.sections.findIndex((s) => s.id === sectionId);
      if (
        (direction === "up" && idx === 0) ||
        (direction === "down" && idx === prev.sections.length - 1)
      )
        return prev;

      const newSections = [...prev.sections];
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      [newSections[idx], newSections[swapIdx]] = [
        newSections[swapIdx],
        newSections[idx],
      ];
      return {
        ...prev,
        sections: newSections.map((s, i) => ({ ...s, order: i })),
      };
    });
  };

  // ============================================
  // SAVE
  // ============================================
  const handleSave = async () => {
    // Validation
    if (!formData.heroTitle.trim()) {
      setError("Hero başlığı zorunludur.");
      setActiveTab("hero");
      return;
    }
    if (!formData.slug.trim()) {
      setError("Slug zorunludur.");
      setActiveTab("settings");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        // Eski API uyumluluğu: heroTitle'ı title olarak da gönder
        title: formData.heroTitle,
      };

      const url = editId
        ? `/api/admin/page-subcategories/${editId}`
        : "/api/admin/page-subcategories";

      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Kaydetme başarısız oldu");
      }

      onSave(); // Parent'a bildir (triggerRefresh dahil)
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // RENDER: Don't render if not open
  // ============================================
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[95vw] h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#f0f9ed] to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Alt Sayfayı Düzenle" : "Yeni Alt Sayfa Oluştur"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              📁 {parentLabel} → {formData.heroTitle || "Yeni Sayfa"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Locale selector */}
            <select
              value={formData.locale}
              onChange={(e) => updateField("locale", e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent bg-white font-medium"
            >
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="en">🇬🇧 English</option>
            </select>

            {/* Published toggle */}
            <button
              onClick={() => updateField("published", !formData.published)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.published
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {formData.published ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              {formData.published ? "Yayında" : "Taslak"}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* ── ERROR BAR ── */}
        {error && (
          <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── LOADING ── */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#b2d6a1] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500">Yükleniyor...</p>
            </div>
          </div>
        ) : (
          <>
            {/* ── TABS ── */}
            <div className="flex border-b border-gray-200 px-6 bg-gray-50/50">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? "border-[#68947c] text-[#68947c]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* ── TAB CONTENT ── */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* ──────────── HERO TAB ──────────── */}
              {activeTab === "hero" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-gradient-to-r from-[#f0f9ed] to-[#e8f5e9] rounded-xl p-6 border border-[#b2d6a1]/30">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      🎯 Hero Section
                    </h3>

                    {/* Hero Title */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Başlık *
                        </label>
                        <input
                          type="text"
                          value={formData.heroTitle}
                          onChange={(e) =>
                            updateField("heroTitle", e.target.value)
                          }
                          placeholder="Sayfa başlığı..."
                          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>

                      {/* Hero Highlight */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vurgulanan Kelime
                          <span className="text-gray-400 font-normal ml-2">
                            (Başlıktaki renkli kelime)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={formData.heroHighlight}
                          onChange={(e) =>
                            updateField("heroHighlight", e.target.value)
                          }
                          placeholder="Örn: Profesyonel"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>

                      {/* Hero Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Açıklama
                        </label>
                        <textarea
                          value={formData.heroDescription}
                          onChange={(e) =>
                            updateField("heroDescription", e.target.value)
                          }
                          placeholder="Hero bölümü açıklaması..."
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent resize-none"
                        />
                      </div>

                      {/* Hero Image */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hero Görseli (URL)
                          </label>
                          <input
                            type="text"
                            value={formData.heroImage}
                            onChange={(e) =>
                              updateField("heroImage", e.target.value)
                            }
                            placeholder="/images/hero.jpg"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Görsel Alt Metin
                          </label>
                          <input
                            type="text"
                            value={formData.heroImageAlt}
                            onChange={(e) =>
                              updateField("heroImageAlt", e.target.value)
                            }
                            placeholder="Görsel açıklaması..."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Hero Image Preview */}
                      {formData.heroImage && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">
                            Önizleme:
                          </p>
                          <img
                            src={formData.heroImage}
                            alt={formData.heroImageAlt || "Preview"}
                            className="max-h-48 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────── SECTIONS TAB ──────────── */}
              {activeTab === "sections" && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      📝 İçerik Bölümleri
                    </h3>
                    <button
                      onClick={addSection}
                      className="flex items-center gap-2 px-4 py-2 bg-[#b2d6a1] text-white rounded-lg hover:bg-[#68947c] transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Bölüm Ekle
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Her bölüm sayfada ayrı bir section olarak görünecek. Başlık,
                    içerik ve isteğe bağlı görsel ekleyebilirsiniz.
                  </p>

                  {formData.sections.map((section, idx) => (
                    <div
                      key={section.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                    >
                      {/* Section Header */}
                      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            Bölüm {idx + 1}
                          </span>
                          {section.title && (
                            <span className="text-sm text-gray-400">
                              — {section.title}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveSection(section.id, "up")}
                            disabled={idx === 0}
                            className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-30 transition-colors"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => moveSection(section.id, "down")}
                            disabled={idx === formData.sections.length - 1}
                            className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-30 transition-colors"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeSection(section.id)}
                            disabled={formData.sections.length <= 1}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded disabled:opacity-30 transition-colors ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Section Body */}
                      <div className="p-5 space-y-4">
                        {/* Section Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bölüm Başlığı
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) =>
                              updateSection(section.id, "title", e.target.value)
                            }
                            placeholder="Bölüm başlığı..."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>

                        {/* Section Content */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            İçerik
                            <span className="text-gray-400 font-normal ml-2">
                              (HTML destekler)
                            </span>
                          </label>
                          <textarea
                            value={section.content}
                            onChange={(e) =>
                              updateSection(
                                section.id,
                                "content",
                                e.target.value,
                              )
                            }
                            placeholder="Bölüm içeriğini yazın... HTML etiketleri kullanabilirsiniz."
                            rows={6}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent resize-y font-mono text-sm"
                          />
                        </div>

                        {/* Section Image */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Görsel (URL)
                            </label>
                            <input
                              type="text"
                              value={section.imageUrl}
                              onChange={(e) =>
                                updateSection(
                                  section.id,
                                  "imageUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="/images/section.jpg"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Görsel Alt Metin
                            </label>
                            <input
                              type="text"
                              value={section.imageAlt}
                              onChange={(e) =>
                                updateSection(
                                  section.id,
                                  "imageAlt",
                                  e.target.value,
                                )
                              }
                              placeholder="Açıklama..."
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Görsel Pozisyonu
                            </label>
                            <select
                              value={section.imagePosition}
                              onChange={(e) =>
                                updateSection(
                                  section.id,
                                  "imagePosition",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent bg-white"
                            >
                              <option value="right">Sağda</option>
                              <option value="left">Solda</option>
                              <option value="top">Üstte</option>
                              <option value="bottom">Altta</option>
                              <option value="none">Görsel Yok</option>
                            </select>
                          </div>
                        </div>

                        {/* Section Image Preview */}
                        {section.imageUrl && (
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">
                              Önizleme:
                            </p>
                            <img
                              src={section.imageUrl}
                              alt={section.imageAlt || "Preview"}
                              className="max-h-32 rounded-lg object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Section Button (bottom) */}
                  <button
                    onClick={addSection}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#b2d6a1] hover:text-[#68947c] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Yeni Bölüm Ekle
                  </button>
                </div>
              )}

              {/* ──────────── SEO TAB ──────────── */}
              {activeTab === "seo" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      🔍 SEO Ayarları
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Başlık
                          <span className="text-gray-400 font-normal ml-2">
                            (Boş bırakırsan Hero başlığı kullanılır)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) =>
                            updateField("metaTitle", e.target.value)
                          }
                          placeholder={formData.heroTitle || "Meta başlık..."}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {(formData.metaTitle || formData.heroTitle).length}/60
                          karakter
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Açıklama
                        </label>
                        <textarea
                          value={formData.metaDescription}
                          onChange={(e) =>
                            updateField("metaDescription", e.target.value)
                          }
                          placeholder="Arama motorlarında görünecek açıklama..."
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {formData.metaDescription.length}/160 karakter
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Anahtar Kelimeler
                          <span className="text-gray-400 font-normal ml-2">
                            (virgülle ayır)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={formData.metaKeywords}
                          onChange={(e) =>
                            updateField("metaKeywords", e.target.value)
                          }
                          placeholder="anahtar, kelime, seo..."
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* SEO Preview */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-2 font-medium">
                        Google Önizleme:
                      </p>
                      <div className="space-y-1">
                        <p className="text-blue-700 text-lg font-medium truncate">
                          {formData.metaTitle ||
                            formData.heroTitle ||
                            "Sayfa Başlığı"}
                        </p>
                        <p className="text-green-700 text-sm">
                          venetaclinic.com/{formData.parentSlug}/
                          {formData.slug || "sayfa-slug"}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {formData.metaDescription ||
                            formData.heroDescription ||
                            "Sayfa açıklaması burada görünecek..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────── SETTINGS TAB ──────────── */}
              {activeTab === "settings" && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      ⚙️ Sayfa Ayarları
                    </h3>

                    <div className="space-y-4">
                      {/* Slug */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL Slug *
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            /{formData.parentSlug}/
                          </span>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => {
                              setAutoSlug(false);
                              updateField("slug", e.target.value);
                            }}
                            placeholder="sayfa-slug"
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                          {!autoSlug && (
                            <button
                              onClick={() => {
                                setAutoSlug(true);
                                updateField(
                                  "slug",
                                  generateSlug(formData.heroTitle),
                                );
                              }}
                              className="px-3 py-2 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                            >
                              Otomatik
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Order */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sıralama
                        </label>
                        <input
                          type="number"
                          value={formData.order}
                          onChange={(e) =>
                            updateField("order", parseInt(e.target.value) || 0)
                          }
                          className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Küçük sayı önce görünür
                        </p>
                      </div>

                      {/* Parent Info */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Ana Sayfa:</span>{" "}
                          {parentLabel}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Dil:</span>{" "}
                          {formData.locale === "tr"
                            ? "🇹🇷 Türkçe"
                            : "🇬🇧 English"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Tam URL:</span>{" "}
                          <code className="bg-white px-2 py-0.5 rounded text-[#68947c]">
                            /{formData.parentSlug}/{formData.slug || "..."}
                          </code>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  {editId && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-red-700 mb-2">
                        🗑️ Tehlikeli Bölge
                      </h3>
                      <p className="text-sm text-red-600 mb-4">
                        Bu alt sayfayı silmek geri alınamaz.
                      </p>
                      <button
                        onClick={async () => {
                          if (
                            !confirm(
                              `"${formData.heroTitle}" alt sayfasını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
                            )
                          )
                            return;

                          try {
                            const res = await fetch(
                              `/api/admin/page-subcategories/${editId}`,
                              { method: "DELETE" },
                            );
                            if (!res.ok) throw new Error("Silme başarısız");
                            onSave();
                            onClose();
                          } catch {
                            setError("Silme işlemi başarısız oldu");
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Alt Sayfayı Sil
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── FOOTER ── */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/80">
              <div className="text-sm text-gray-500">
                {formData.sections.length} bölüm •{" "}
                {formData.published ? "🟢 Yayında" : "⚪ Taslak"}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
