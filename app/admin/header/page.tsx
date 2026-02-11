// app/admin/header/page.tsx
// ============================================
// Değişiklikler:
// 1. useSidebarRefresh import edildi
// 2. saveAllChanges içinde triggerRefresh() çağrısı eklendi
// ============================================
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedPage from "@/components/admin/ProtectedPage";
import { Trash2, Plus, Save, ChevronDown, ChevronRight } from "lucide-react";
import { useSidebarRefresh } from "@/contexts/SidebarRefreshContext"; // ← EKLE

type Locale = "tr" | "en";

interface NavItem {
  id: string;
  title: string;
  href: string;
  order: number;
  active: boolean;
  openInNewTab: boolean;
  children: NavItem[];
}

export default function HeaderEditor() {
  const { triggerRefresh } = useSidebarRefresh(); // ← EKLE
  const [locale, setLocale] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [originalNavItems, setOriginalNavItems] = useState<NavItem[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const loadNavItems = useCallback(async () => {
    const res = await fetch(`/api/header/nav?locale=${locale}`);
    if (res.ok) {
      const data = await res.json();
      setNavItems(data);
      setOriginalNavItems(JSON.parse(JSON.stringify(data)));
      setHasChanges(false);
    }
  }, [locale]);

  useEffect(() => {
    loadNavItems();
  }, [locale, loadNavItems]);

  useEffect(() => {
    const changed =
      JSON.stringify(navItems) !== JSON.stringify(originalNavItems);
    setHasChanges(changed);
  }, [navItems, originalNavItems]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  const addMainItem = () => {
    const newItem: NavItem = {
      id: `temp-${Date.now()}`,
      title: "Yeni Menü",
      href: "/",
      order: navItems.length,
      active: true,
      openInNewTab: false,
      children: [],
    };
    setNavItems([...navItems, newItem]);
  };

  const addSubItem = (parentId: string) => {
    const updatedItems = navItems.map((item) => {
      if (item.id === parentId) {
        const newChild: NavItem = {
          id: `temp-${Date.now()}`,
          title: "Yeni Alt Menü",
          href: "/",
          order: item.children.length,
          active: true,
          openInNewTab: false,
          children: [],
        };
        return { ...item, children: [...item.children, newChild] };
      }
      return item;
    });
    setNavItems(updatedItems);
    setExpandedItems((prev) => new Set(prev).add(parentId));
  };

  const updateMainItem = (itemId: string, data: Partial<NavItem>) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...data } : item)),
    );
  };

  const updateChildItem = (
    parentId: string,
    childId: string,
    data: Partial<NavItem>,
  ) => {
    setNavItems((prev) =>
      prev.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: item.children.map((child) =>
              child.id === childId ? { ...child, ...data } : child,
            ),
          };
        }
        return item;
      }),
    );
  };

  const deleteMainItem = (itemId: string, itemTitle: string) => {
    if (!confirm(`"${itemTitle}" menüsünü silmek istediğinize emin misiniz?`))
      return;
    setNavItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const deleteChildItem = (
    parentId: string,
    childId: string,
    childTitle: string,
  ) => {
    if (
      !confirm(`"${childTitle}" alt menüsünü silmek istediğinize emin misiniz?`)
    )
      return;
    setNavItems((prev) =>
      prev.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: item.children.filter((child) => child.id !== childId),
          };
        }
        return item;
      }),
    );
  };

  const saveAllChanges = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const allItems: Array<{
        id?: string;
        locale: string;
        title: string;
        href: string;
        parentId: string | null;
        order: number;
        active: boolean;
        openInNewTab: boolean;
      }> = [];

      navItems.forEach((item) => {
        allItems.push({
          ...(item.id.startsWith("temp-") ? {} : { id: item.id }),
          locale,
          title: item.title,
          href: item.href,
          parentId: null,
          order: item.order,
          active: item.active,
          openInNewTab: item.openInNewTab,
        });

        item.children.forEach((child) => {
          allItems.push({
            ...(child.id.startsWith("temp-") ? {} : { id: child.id }),
            locale,
            title: child.title,
            href: child.href,
            parentId: item.id.startsWith("temp-") ? null : item.id,
            order: child.order,
            active: child.active,
            openInNewTab: child.openInNewTab,
          });
        });
      });

      for (const item of allItems) {
        if (item.id) {
          await fetch(`/api/header/nav/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } else {
          await fetch("/api/header/nav", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        }
      }

      const currentIds = new Set(allItems.filter((i) => i.id).map((i) => i.id));
      const originalIds = new Set([
        ...originalNavItems.map((i) => i.id),
        ...originalNavItems.flatMap((i) => i.children.map((c) => c.id)),
      ]);

      for (const originalId of originalIds) {
        if (!currentIds.has(originalId)) {
          await fetch(`/api/header/nav/${originalId}`, { method: "DELETE" });
        }
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      triggerRefresh(); // ← SIDEBAR'I GÜNCELLE
      loadNavItems();
    } catch (error) {
      console.error("Save error:", error);
      alert("Kaydetme sırasında bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Header Yönetimi
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                Navigasyon menüsünü düzenleyin
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Dil:
              </label>
              <select
                value={locale}
                onChange={(e) => {
                  if (
                    hasChanges &&
                    !confirm(
                      "Kaydedilmemiş değişiklikler var. Dil değiştirmek istediğinize emin misiniz?",
                    )
                  )
                    return;
                  setLocale(e.target.value as Locale);
                }}
                className="px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent bg-white"
              >
                <option value="tr">🇹🇷 Türkçe</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>

          {success && (
            <div className="mb-4 md:mb-6 bg-green-50 border border-green-200 text-green-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm">
              ✅ Değişiklikler başarıyla kaydedildi!
            </div>
          )}

          {hasChanges && (
            <div className="mb-4 md:mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm">
              ⚠️ Kaydedilmemiş değişiklikler var!
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                📋 Navigasyon Menüsü
              </h2>
              <button
                onClick={addMainItem}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm bg-[#b2d6a1] text-white rounded-lg hover:bg-[#68947c] transition-colors"
              >
                <Plus className="h-4 w-4" />
                Ana Menü Ekle
              </button>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg"
                >
                  <div
                    className={`p-4 ${!item.active ? "bg-yellow-50 border-l-4 border-l-yellow-400" : "bg-gray-50"}`}
                  >
                    <div className="flex items-start gap-3">
                      {!item.active && (
                        <div className="w-full mb-2 px-3 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-lg flex items-center gap-2">
                          <span>⚠️</span>
                          <span className="font-medium">
                            Bu menü pasif - İlgili kategori silinmiş olabilir
                          </span>
                        </div>
                      )}
                      {item.children.length > 0 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="mt-2 text-gray-500 hover:text-gray-700"
                        >
                          {expandedItems.has(item.id) ? (
                            <ChevronDown className="h-5 w-5" />
                          ) : (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </button>
                      )}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                        <div className="md:col-span-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Başlık
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              updateMainItem(item.id, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Link
                          </label>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) =>
                              updateMainItem(item.id, { href: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Sıra
                          </label>
                          <input
                            type="number"
                            value={item.order}
                            onChange={(e) =>
                              updateMainItem(item.id, {
                                order: parseInt(e.target.value),
                              })
                            }
                            className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-1 flex flex-col items-center">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Aktif
                          </label>
                          <input
                            type="checkbox"
                            checked={item.active}
                            onChange={(e) =>
                              updateMainItem(item.id, {
                                active: e.target.checked,
                              })
                            }
                            className="w-5 h-5 text-[#b2d6a1] rounded focus:ring-2 focus:ring-[#b2d6a1]"
                          />
                        </div>
                        <div className="md:col-span-1 flex flex-col items-center">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Yeni Sekme
                          </label>
                          <input
                            type="checkbox"
                            checked={item.openInNewTab}
                            onChange={(e) =>
                              updateMainItem(item.id, {
                                openInNewTab: e.target.checked,
                              })
                            }
                            className="w-5 h-5 text-[#b2d6a1] rounded focus:ring-2 focus:ring-[#b2d6a1]"
                          />
                        </div>
                        <div className="md:col-span-1 flex gap-2">
                          <button
                            onClick={() => addSubItem(item.id)}
                            className="p-2 text-[#b2d6a1] hover:bg-[#f0f9ed] rounded-lg transition-colors"
                            title="Alt Menü Ekle"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteMainItem(item.id, item.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedItems.has(item.id) && item.children.length > 0 && (
                    <div className="border-t border-gray-200 bg-white">
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          className={`p-4 pl-12 border-b last:border-b-0 ${!child.active ? "bg-yellow-50" : "border-gray-100"}`}
                        >
                          {!child.active && (
                            <div className="mb-2 px-3 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs rounded-lg">
                              ⚠️ Bu kategori silinmiş veya pasif
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                            <div className="md:col-span-4">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Alt Menü Başlık
                              </label>
                              <input
                                type="text"
                                value={child.title}
                                onChange={(e) =>
                                  updateChildItem(item.id, child.id, {
                                    title: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div className="md:col-span-5">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Link
                              </label>
                              <input
                                type="text"
                                value={child.href}
                                onChange={(e) =>
                                  updateChildItem(item.id, child.id, {
                                    href: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Sıra
                              </label>
                              <input
                                type="number"
                                value={child.order}
                                onChange={(e) =>
                                  updateChildItem(item.id, child.id, {
                                    order: parseInt(e.target.value),
                                  })
                                }
                                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d6a1] focus:border-transparent"
                              />
                            </div>
                            <div className="md:col-span-1 flex flex-col items-center">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Aktif
                              </label>
                              <input
                                type="checkbox"
                                checked={child.active}
                                onChange={(e) =>
                                  updateChildItem(item.id, child.id, {
                                    active: e.target.checked,
                                  })
                                }
                                className="w-5 h-5 text-[#b2d6a1] rounded focus:ring-2 focus:ring-[#b2d6a1]"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <button
                                onClick={() =>
                                  deleteChildItem(
                                    item.id,
                                    child.id,
                                    child.title,
                                  )
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {navItems.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Henüz menü öğesi yok. Ana Menü Ekle ile başlayın.
              </div>
            )}
          </div>

          <div className="sticky bottom-4 mt-6 flex justify-end">
            <button
              onClick={saveAllChanges}
              disabled={loading || !hasChanges}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b2d6a1] to-[#68947c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
