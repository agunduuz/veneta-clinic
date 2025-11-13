// app/(routes)/ameliyatli-estetik/[category]/page.tsx
import { navigationItems } from "@/data/navigation";
import { getOperationData } from "@/lib/operations";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryPageContent from "@/components/CategoryComponent/CategoryPageContent";
import PhoneButton from "@/components/Header/PhoneButton";
import WhatsAppButton from "@/components/Header/WhatsAppButton";

export async function generateStaticParams() {
  const ameliyatli = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  return (
    ameliyatli?.subMenus?.map((sub) => {
      const slug = sub.href.tr.split("/").pop() || "";
      return {
        category: slug,
      };
    }) || []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  // ✅ YENİ: getOperationData kullan
  const operationInfo = getOperationData(category, "tr");

  const ameliyatli = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  const subMenu = ameliyatli?.subMenus?.find((sub) => {
    const slug = sub.href.tr.split("/").pop();
    return slug === category;
  });

  if (!subMenu) return { title: "Sayfa Bulunamadı" };

  const title = `${
    operationInfo?.title || subMenu.titleKey
  } | Türkiye'nin En İyi Estetik Kliniği | Veneta Clinic`;
  const description = `${
    operationInfo?.title || subMenu.titleKey
  } konusunda Türkiye'nin lider estetik kliniği. 15+ yıllık deneyim, uzman doktorlar, modern teknoloji. Ücretsiz konsültasyon için hemen arayın!`;

  return {
    title,
    description,
    keywords: [
      operationInfo?.title || subMenu.titleKey,
      "estetik cerrahi",
      "Türkiye estetik kliniği",
      "İstanbul estetik",
      "güvenli estetik",
      "uzman doktor",
      "modern teknoloji",
      "hasta memnuniyeti",
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "tr_TR",
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
      canonical: `https://venetaclinic.com/ameliyatli-estetik/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // ✅ YENİ: getOperationData kullan
  const operationInfo = getOperationData(category, "tr");

  const ameliyatli = navigationItems.find(
    (item) => item.titleKey === "nav.surgicalAesthetics"
  );

  const subMenu = ameliyatli?.subMenus?.find((sub) => {
    const slug = sub.href.tr.split("/").pop();
    return slug === category;
  });

  if (!subMenu) return notFound();

  return (
    <>
      <CategoryPageContent operationInfo={operationInfo} />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
