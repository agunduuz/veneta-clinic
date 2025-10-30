// app/(routes)/en/about/page.tsx
import AboutHeader from "@/components/AboutComponent/AboutHeader";
import AboutFeatures from "@/components/AboutComponent/AboutFeatures";
import AboutMission from "@/components/AboutComponent/AboutMission";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <AboutFeatures />
      <AboutMission />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
