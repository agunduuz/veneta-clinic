// prisma/seeds/13-ameliyatli-estetik.seed.ts
import { PrismaClient } from "@prisma/client";
export async function seedAmeliyatliEstetik(prisma: PrismaClient) {
  console.log("🔄 Seeding ameliyatli estetik page...");
  const existing = await prisma.procedureAboutSection.findFirst({
    where: { pageSlug: "ameliyatli-estetik", locale: "tr" },
  });
  if (existing) {
    console.log("✅ Ameliyatli estetik page already seeded!");
    return;
  }
  await prisma.procedureAboutSection.createMany({
    data: [
      {
        pageSlug: "ameliyatli-estetik",
        locale: "tr",
        title: "Ameliyatlı Estetik Hakkında",
        description: "Uzman cerrahlarımızla doğal ve kalıcı sonuçlar.",
        areasTitle: "Uygulama Alanları",
        advantagesTitle: "Avantajlar",
      },
    ],
  });
  console.log("✅ Ameliyatli estetik page seeded!");
}
