// app/(routes)/ameliyatli-estetik/page.tsx
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
