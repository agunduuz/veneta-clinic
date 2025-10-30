// app/(routes)/en/contact/page.tsx
import ContactHeader from "@/components/ContactComponent/ContactHeader";
import ContactSection from "@/components/ContactComponent/ContactSection";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <ContactSection />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
