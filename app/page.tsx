import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Features from '../components/home/Features';
import Procedures from '../components/home/Procedures';
import PatientStories from '../components/home/PatientStories';
import LatestBlog from '../components/home/LatestBlog';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Procedures />
      <PatientStories />
      <LatestBlog />
      <CallToAction />
    </>
  );
}
