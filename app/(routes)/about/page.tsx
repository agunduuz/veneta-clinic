import AboutHeader from '@/components/AboutComponent/AboutHeader';
import AboutMission from '@/components/AboutComponent/AboutMission';
import AboutFeatures from '@/components/AboutComponent/AboutFeatures';

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
