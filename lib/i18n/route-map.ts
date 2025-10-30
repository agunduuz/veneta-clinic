// lib/i18n/route-map.ts
import { navigationItems } from "@/data/navigation";

/**
 * Get translated route using navigationItems as single source of truth
 */
export function getTranslatedRoute(
  currentPath: string,
  currentLocale: "tr" | "en",
  targetLocale: "tr" | "en"
): string {
  // Clean the path - remove leading slash and language prefix
  const cleanPath = currentPath.replace(/^\//, "").replace(/^en\//, "");

  console.log("🔍 getTranslatedRoute Debug:");
  console.log("  currentPath:", currentPath);
  console.log("  cleanPath:", cleanPath);
  console.log("  currentLocale:", currentLocale);
  console.log("  targetLocale:", targetLocale);

  // Home page
  if (cleanPath === "" || cleanPath === "en" || cleanPath === "en/") {
    const result = targetLocale === "en" ? "/en/" : "/";
    console.log("  ✅ Home page ->", result);
    return result;
  }

  // Search in navigationItems
  for (const item of navigationItems) {
    // Check if this is an external URL (Google reviews)
    if (item.href.tr.startsWith("http")) {
      const trPath = item.href.tr;
      const enPath = item.href.en;

      if (currentPath === trPath || currentPath === enPath) {
        const result = targetLocale === "en" ? enPath : trPath;
        console.log("  ✅ External link ->", result);
        return result;
      }
      continue;
    }

    // Check main item
    const itemTrPath = item.href.tr.replace(/^\//, "");
    const itemEnPath = item.href.en.replace(/^\//, "").replace(/^en\//, "");

    console.log("  Checking main item:", item.titleKey);
    console.log("    TR path:", itemTrPath);
    console.log("    EN path:", itemEnPath);

    if (cleanPath === itemTrPath || cleanPath === itemEnPath) {
      const result = targetLocale === "en" ? item.href.en : item.href.tr;
      console.log("  ✅ Main item match ->", result);
      return result;
    }

    // Check submenus
    if (item.subMenus) {
      for (const sub of item.subMenus) {
        const subTrPath = sub.href.tr.replace(/^\//, "");
        const subEnPath = sub.href.en.replace(/^\//, "").replace(/^en\//, "");

        console.log("    Checking submenu:", sub.titleKey);
        console.log("      TR path:", subTrPath);
        console.log("      EN path:", subEnPath);

        if (cleanPath === subTrPath || cleanPath === subEnPath) {
          const result = targetLocale === "en" ? sub.href.en : sub.href.tr;
          console.log("  ✅ Submenu match ->", result);
          return result;
        }
      }
    }
  }

  // If no match found, try to construct path
  console.log("  ⚠️ No match found, constructing fallback");

  if (targetLocale === "en") {
    // TR -> EN: Add /en/ prefix
    const result = cleanPath ? `/en/${cleanPath}` : "/en/";
    console.log("  ⚠️ Fallback (TR->EN):", result);
    return result;
  } else {
    // EN -> TR: Remove /en/ prefix
    const result = cleanPath ? `/${cleanPath}` : "/";
    console.log("  ⚠️ Fallback (EN->TR):", result);
    return result;
  }
}
