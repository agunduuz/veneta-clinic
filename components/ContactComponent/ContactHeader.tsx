// components/ContactComponent/ContactHeader.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

const ContactHeader = () => {
  const { t } = useTranslation();

  return (
    <section className="container my-8">
      <div className="flex flex-col md:flex-row bg-secondary rounded-2xl overflow-hidden shadow-md">
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight whitespace-pre-line">
            {t("contact.header.title")}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t("contact.header.description")}
          </p>
          <button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-3 rounded-xl text-lg transition w-max shadow">
            {t("contact.header.button")}
          </button>
        </div>
        <div className="flex-1 relative min-h-[260px] md:min-h-[400px]">
          <Image
            src="/images/doctors-team.jpg"
            alt={t("contact.header.imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
