// components/ContactComponent/ContactHeader.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContactHeaderData {
  headerTitle: string;
  headerDescription: string;
  headerButtonText: string;
  headerImage: string;
}

const ContactHeader = () => {
  const { locale } = useLocale();
  const [data, setData] = useState<ContactHeaderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/contact?locale=${locale}`);
        if (res.ok) {
          const contactData = await res.json();
          setData({
            headerTitle: contactData.headerTitle,
            headerDescription: contactData.headerDescription,
            headerButtonText: contactData.headerButtonText,
            headerImage: contactData.headerImage,
          });
        }
      } catch (error) {
        console.error("Contact header fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <section className="container my-8">
        <div className="flex flex-col md:flex-row bg-secondary rounded-2xl overflow-hidden shadow-md animate-pulse">
          <div className="flex-1 p-8 md:p-12">
            <div className="h-12 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
            <div className="h-6 bg-gray-300 rounded mb-8 w-5/6"></div>
            <div className="h-12 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="flex-1 min-h-[260px] md:min-h-[400px] bg-gray-300"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="container my-8">
      <div className="flex flex-col md:flex-row bg-secondary rounded-2xl overflow-hidden shadow-md">
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight whitespace-pre-line">
            {data.headerTitle}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {data.headerDescription}
          </p>
          <button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-3 rounded-xl text-lg transition w-max shadow">
            {data.headerButtonText}
          </button>
        </div>
        <div className="flex-1 relative min-h-[260px] md:min-h-[400px]">
          <Image
            src={data.headerImage}
            alt="Contact"
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
