// app/(routes)/en/surgical-aesthetics/[category]/page.tsx
import { navigationItems } from "@/data/navigation";
import { getOperationData } from "@/lib/operations";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EnglishCategoryPageContent from "@/components/CategoryComponent/EnglishCategoryPageContent";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";

// ✅ COMPLETELY FIXED: generateStaticParams
export async function generateStaticParams() {
  const surgical = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  return (
    surgical?.subMenus?.map((sub) => {
      const slug = sub.href.en.split("/").pop() || "";
      return {
        category: slug,
      };
    }) || []
  );
}

// ✅ COMPLETELY FIXED: generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const surgical = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  const subMenu = surgical?.subMenus?.find((sub) => {
    const slug = sub.href.en.split("/").pop();
    return slug === category;
  });

  if (!subMenu) return { title: "Page Not Found" };

  // ✅ YENİ: getOperationData kullan
  const operationInfo = getOperationData(category, "en");
  const title = `${
    operationInfo?.title || subMenu.titleKey
  } | Turkey's Best Aesthetic Clinic | Veneta Clinic`;
  const description = `${
    operationInfo?.title || subMenu.titleKey
  } - Turkey's leading aesthetic clinic. 15+ years of experience, expert doctors, modern technology. Call now for free consultation!`;

  return {
    title,
    description,
    keywords: [
      operationInfo?.title || subMenu.titleKey,
      "aesthetic surgery",
      "Turkey aesthetic clinic",
      "Istanbul aesthetics",
      "safe aesthetics",
      "expert doctor",
      "modern technology",
      "patient satisfaction",
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Veneta Clinic",
      images: [
        {
          url: operationInfo?.image || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${operationInfo?.title || subMenu.titleKey} - Veneta Clinic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [operationInfo?.image || "/images/og-image.jpg"],
    },
    alternates: {
      canonical: `https://venetaclinic.com/en/surgical-aesthetics/${category}`,
    },
  };
}

// ✅ COMPLETELY FIXED: Component function
export default async function EnglishCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const surgical = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  const subMenu = surgical?.subMenus?.find((sub) => {
    const slug = sub.href.en.split("/").pop();
    return slug === category;
  });

  if (!subMenu) return notFound();

  const operationInfo = getOperationData(category, "en");

  return (
    <>
      <EnglishCategoryPageContent operationInfo={operationInfo} />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
