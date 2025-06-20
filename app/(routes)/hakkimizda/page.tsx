import AboutHeader from '@/components/AboutComponent/AboutHeader';
import AboutMission from '@/components/AboutComponent/AboutMission';
import AboutFeatures from '@/components/AboutComponent/AboutFeatures';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';
const Page = () => {
  return (
    <main className='bg-background min-h-[60vh] flex flex-col items-center justify-center py-8 lg:py-16 px-4'>
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
      <PhoneButton />
      <WhatsAppButton />
    </main>
  );
};

export default Page;
