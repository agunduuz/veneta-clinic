// app/(routes)/en/hair-transplant/page.tsx
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

export default function HairTransplantPage() {
  return (
    <>
      <main className="container py-12">
        <Hero locale="en" />
        <Features locale="en" />
        <section className="max-w-6xl mx-auto space-y-12">
          <FueSection locale="en" />
          <Process locale="en" />
          <Aftercare locale="en" />
          <WhyUs locale="en" />
          <FAQ locale="en" />
          <CTA locale="en" />
        </section>
      </main>
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
