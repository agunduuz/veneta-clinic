// prisma/seeds/12-sac-ekimi.seed.ts
import { PrismaClient } from "@prisma/client";
export async function seedSacEkimi(prisma: PrismaClient) {
  console.log("🔄 Seeding sac ekimi page...");
  const existing = await prisma.procedurePage.findFirst({
    where: { slug: "sac-ekimi", locale: "tr" },
  });
  if (existing) {
    console.log("✅ Sac ekimi page already seeded!");
    return;
  }
  await prisma.procedurePage.createMany({
    data: [
      {
        slug: "sac-ekimi",
        locale: "tr",
        heroTitle: "Doğal Saçlarınıza",
        heroTitleHighlight: "Kavuşun - FUE Tekniği",
        heroDescription: "FUE tekniği ile doğal görünümlü saç ekimi.",
        heroButtonReviews: "Google Yorumlarımız",
        heroButtonPhone: "Hemen Ara",
        heroImage: "/images/hair-transplant.jpg",
        heroImageAlt: "FUE Saç Ekimi",
        deviceTitle: "FUE Tekniği",
        deviceDescription: "Modern saç ekimi yöntemi.",
        deviceFeaturesTitle: "Teknik Özellikler",
        deviceAdvantagesTitle: "Avantajlar",
        pricingTitle: "Paketler",
        pricingDescription: "Özel paketlerimiz mevcuttur.",
        pricingCallText: "Fiyat için arayın",
        whyUsTitle: "Neden Bizi Tercih Etmelisiniz?",
        faqTitle: "Sıkça Sorulan Sorular",
        ctaTitle: "Ücretsiz Saç Analizi İçin İletişime Geçin",
        ctaDescription: "Uzman ekibimiz hazır.",
        ctaButtonPhone: "Hemen Ara",
        ctaButtonWhatsApp: "WhatsApp",
        active: true,
      },
    ],
  });
  console.log("✅ Sac ekimi page seeded!");
}
