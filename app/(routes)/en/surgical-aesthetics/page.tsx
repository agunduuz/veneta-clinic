// import CategoryList from "@/components/SurgicalAesthetics/CategoryList";
// import { navigationItems } from "@/data/navigation";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";
import Hero from "@/components/SurgicalAesthetics/Hero";
import Features from "@/components/SurgicalAesthetics/Features";
import CategoriesIntro from "@/components/SurgicalAesthetics/CategoriesIntro";
import About from "@/components/SurgicalAesthetics/About";
import Process from "@/components/SurgicalAesthetics/Process";
import WhyUs from "@/components/SurgicalAesthetics/WhyUs";
import FAQ from "@/components/SurgicalAesthetics/FAQ";
import CTA from "@/components/SurgicalAesthetics/CTA";

export default function AmeliyatliEstetikPage() {
  // Find surgical aesthetics menu item
  /* const surgicalAesthetics = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );*/

  // Map submenus to category format
  /* const categories =
    surgicalAesthetics?.subMenus?.map((sub, i) => {
      // Extract the category name from titleKey (e.g., "nav.rhinoplasty" -> "rhinoplasty")
      const categoryKey = sub.titleKey.replace("nav.", "");

      return {
        title: sub.titleKey, // i18n key - will be translated by CategoryList
        href: sub.href.tr, // Turkish href
        description: `surgicalAesthetics.categories.items.${categoryKey}.description`, // ✅ Unique description for each category
        image: `/images/ameliyatli-${i + 1}.jpeg`
          ? `/images/ameliyatli-${i + 1}.jpeg`
          : "/images/doctors-team.jpg", // Default image with fallback
        badge: i === 0 ? "Popüler" : i === 1 ? "Yeni" : undefined, // Raw text for badge
      };
    }) || []; */

  return (
    <>
      <main className="container py-12">
        {/* Hero Section */}
        <Hero />

        {/* Main Features */}
        <Features />

        {/* Category Cards */}
        <section id="categories" className="mb-16">
          <CategoriesIntro />
          {/* <CategoryList categories={categories} /> */}
        </section>

        {/* Detailed Content */}
        <section className="max-w-6xl mx-auto space-y-12">
          {/* About Surgical Aesthetics */}
          <About />

          {/* How It Works */}
          <Process />

          {/* Why Choose Us */}
          <WhyUs />

          {/* FAQ */}
          <FAQ />

          {/* CTA */}
          <CTA />
        </section>
      </main>

      {/* Floating Buttons */}
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
