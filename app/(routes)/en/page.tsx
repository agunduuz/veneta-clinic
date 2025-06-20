import HeroEnglish from '@/components/HomeEnglish/HeroEnglish';
import FeaturesEnglish from '@/components/HomeEnglish/FeaturesEnglish';
import ProceduresEnglish from '@/components/HomeEnglish/ProceduresEnglish';
import PatientStoriesEnglish from '@/components/HomeEnglish/PatientStoriesEnglish';
import LatestBlogEnglish from '@/components/HomeEnglish/LatestBlogEnglish';
import CallToActionEnglish from '@/components/HomeEnglish/CallToActionEnglish';
import WhatsAppButton from '@/components/Header/WhatsAppButton';
import PhoneButton from '@/components/Header/PhoneButton';
import AboutEnglish from '@/components/HomeEnglish/AboutEnglish';

export default function Home() {
  return (
    <>
      <HeroEnglish />
      <AboutEnglish />
      <FeaturesEnglish />
      <ProceduresEnglish />
      <PatientStoriesEnglish />
      <LatestBlogEnglish />
      <CallToActionEnglish />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
