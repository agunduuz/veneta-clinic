import ContactHeader from '@/components/ContactComponent/ContactHeader';
import ContactSection from '@/components/ContactComponent/ContactSection';
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
