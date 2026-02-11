// prisma/seeds/11-lazer-epilasyon.seed.ts
import { PrismaClient } from "@prisma/client";
export async function seedLazerEpilasyon(prisma: PrismaClient) {
  console.log("🔄 Seeding lazer epilasyon page...");
  const existing = await prisma.procedurePage.findFirst({
    where: { slug: "lazer-epilasyon", locale: "tr" },
  });
  if (existing) {
    console.log("✅ Lazer epilasyon page already seeded!");
    return;
  }
  await prisma.procedurePage.createMany({
    data: [
      {
        slug: "lazer-epilasyon",
        locale: "tr",
        heroTitle: "Lazer Epilasyon",
        heroTitleHighlight: "ile Kalıcı Çözüm",
        heroDescription:
          "Son teknoloji Soprano Ice Platinum ile ağrısız lazer epilasyon.",
        heroButtonReviews: "Google Yorumlarımız",
        heroButtonPhone: "Hemen Ara",
        heroImage: "/images/lazer-epilasyon.jpg",
        heroImageAlt: "Lazer Epilasyon",
        deviceTitle: "Soprano Ice Platinum",
        deviceDescription: "En gelişmiş lazer epilasyon cihazı.",
        deviceFeaturesTitle: "Cihaz Özellikleri",
        deviceAdvantagesTitle: "Avantajlar",
        pricingTitle: "Fiyatlar",
        pricingDescription: "Özel paketlerimiz mevcuttur.",
        pricingCallText: "Fiyat için arayın",
        whyUsTitle: "Neden Veneta Clinic?",
        faqTitle: "Sıkça Sorulan Sorular",
        ctaTitle: "Ücretsiz Analiz İçin İletişime Geçin",
        ctaDescription: "Uzman ekibimiz hazır.",
        ctaButtonPhone: "Hemen Ara",
        ctaButtonWhatsApp: "WhatsApp",
        active: true,
      },
    ],
  });
  console.log("✅ Lazer epilasyon page seeded!");
}
