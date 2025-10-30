// app/(routes)/en/page.tsx
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Features from "@/components/Home/Features";
import Procedures from "@/components/Home/Procedures";
import PatientStories from "@/components/Home/PatientStories";
import LatestBlog from "@/components/Home/LatestBlog";
import CallToAction from "@/components/Home/CallToAction";
import WhatsAppButton from "@/components/Header/WhatsAppButton";
import PhoneButton from "@/components/Header/PhoneButton";

export default function HomeEnglish() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Procedures />
      <PatientStories />
      <LatestBlog />
      <CallToAction />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
