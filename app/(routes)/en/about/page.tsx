import AboutHeaderEnglish from '@/components/AboutComponentEN/AboutHeaderEn';
import AboutMissionEnglish from '@/components/AboutComponentEN/AboutMissionEn';
import AboutFeaturesEnglish from '@/components/AboutComponentEN/AboutFeaturesEn';

const Page = () => {
  return (
    <main className='bg-background min-h-[60vh] flex flex-col items-center justify-center py-8 lg:py-16 px-4'>
      <AboutHeaderEnglish />
      <AboutMissionEnglish />
      <AboutFeaturesEnglish />
    </main>
  );
};

export default Page;
