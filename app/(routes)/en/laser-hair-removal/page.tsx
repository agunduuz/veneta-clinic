// app/(routes)/en/laser-hair-removal/page.tsx
import LazerHero from "@/components/LazerEpilasyon/LazerHero";
import LazerFeatures from "@/components/LazerEpilasyon/LazerFeatures";
import LazerDeviceInfo from "@/components/LazerEpilasyon/LazerDeviceInfo";
import LazerTreatmentAreas from "@/components/LazerEpilasyon/LazerTreatmentAreas";
import LazerPricing from "@/components/LazerEpilasyon/LazerPricing";
import LazerWhyUs from "@/components/LazerEpilasyon/LazerWhyUs";
import LazerFAQ from "@/components/LazerEpilasyon/LazerFAQ";
import LazerCTA from "@/components/LazerEpilasyon/LazerCTA";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";

export default function LaserHairRemovalPage() {
  return (
    <>
      <main className="container py-12">
        <LazerHero />
        <LazerFeatures />
        <section className="max-w-6xl mx-auto space-y-12">
          <LazerDeviceInfo />
          <LazerTreatmentAreas />
          <LazerPricing />
          <LazerWhyUs />
          <LazerFAQ />
          <LazerCTA />
        </section>
      </main>
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
