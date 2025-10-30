// app/(routes)/hakkimizda/page.tsx
import AboutHeader from "@/components/AboutComponent/AboutHeader";
import AboutFeatures from "@/components/AboutComponent/AboutFeatures";
import AboutMission from "@/components/AboutComponent/AboutMission";

export default function HakkimizdaPage() {
  return (
    <>
      <AboutHeader />
      <AboutFeatures />
      <AboutMission />
    </>
  );
}
