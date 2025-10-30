// app/(routes)/sac-ekimi/page.tsx
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";
import Hero from "@/components/HairTransplant/Hero";
import Features from "@/components/HairTransplant/Features";
import FueSection from "@/components/HairTransplant/FueSection";
import Process from "@/components/HairTransplant/Process";
import Aftercare from "@/components/HairTransplant/Aftercare";
import WhyUs from "@/components/HairTransplant/WhyUs";
import FAQ from "@/components/HairTransplant/FAQ";
import CTA from "@/components/HairTransplant/CTA";

export default function SacEkimiPage() {
  return (
    <>
      <main className="container py-12">
        {/* Hero Section */}
        <Hero />

        {/* Main Features */}
        <Features />

        {/* Detailed Content */}
        <section className="max-w-6xl mx-auto space-y-12">
          {/* FUE Technique */}
          <FueSection />

          {/* How It's Done */}
          <Process />

          {/* Post-Operative Care */}
          <Aftercare />

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
