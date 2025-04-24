import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import Features from '@/components/Home/Features';
import Procedures from '@/components/Home/Procedures';
import PatientStories from '@/components/Home/PatientStories';
import LatestBlog from '@/components/Home/LatestBlog';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Procedures />
      <PatientStories />
      <LatestBlog />
    </>
  );
}
