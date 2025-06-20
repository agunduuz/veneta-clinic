import ContactHeader from '@/components/ContactComponentEN/ContactHeaderEn';
import ContactSection from '@/components/ContactComponentEN/ContactSectionEn';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';
const Page = () => {
  return (
    <div>
      <ContactHeader />
      <ContactSection />
      <PhoneButton />
      <WhatsAppButton />
      {/* Diğer içerikler buraya eklenebilir */}
    </div>
  );
};

export default Page;
