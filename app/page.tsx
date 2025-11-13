// app/page.tsx
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Features from "@/components/Home/Features";
import Procedures from "@/components/Home/Procedures";
import PatientStories from "@/components/Home/PatientStories";
import LatestBlog from "@/components/Home/LatestBlog";
import CallToAction from "@/components/Home/CallToAction";
import WhatsAppButton from "@/components/Header/WhatsAppButton";
import PhoneButton from "@/components/Header/PhoneButton";
import { getHomepageData } from "@/lib/homepage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // TÜM homepage verisi tek seferde
  const homepageData = await getHomepageData("tr");

  return (
    <>
      <Hero data={homepageData?.hero} />
      <About data={homepageData?.about} />
      <Features data={homepageData?.features} />
      <Procedures data={homepageData?.procedures} />
      <PatientStories data={homepageData?.testimonials} />
      <LatestBlog data={homepageData?.blog} />
      <CallToAction data={homepageData?.cta} />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
