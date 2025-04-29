import AboutHeader from '@/components/About/AboutHeader';
import AboutMission from '@/components/About/AboutMission';
import AboutFeatures from '@/components/About/AboutFeatures';

const Page = () => {
  return (
    <main className='bg-background min-h-[60vh] flex flex-col items-center justify-center py-8 lg:py-16 px-4'>
      <AboutHeader />
      <AboutMission />
      <AboutFeatures />
    </main>
  );
};

export default Page;
