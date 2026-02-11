// prisma/seeds/10-about.seed.ts
import { PrismaClient } from "@prisma/client";
export async function seedAbout(prisma: PrismaClient) {
  console.log("🔄 Seeding about page...");
  const existing = await prisma.aboutPage.findFirst();
  if (existing) {
    console.log("✅ About page already seeded!");
    return;
  }
  await prisma.aboutPage.createMany({
    data: [
      {
        locale: "tr",
        headerTitle: "Güzelliğiniz İçin",
        headerTitleHighlight: "En İyi Eller",
        headerSubtitle: "Modern Tıbbın Gücü",
        headerDescription: "15 yılı aşkın tecrübemizle hizmetinizdeyiz.",
        headerButtonServices: "Hizmetlerimiz",
        headerButtonContact: "İletişim",
        headerImage: "/images/doctors-team.jpg",
        headerExperienceYears: "15+",
        headerExperienceText: "Yıl\nTecrübe",
        featuresTitle: "Neden Bizi",
        featuresTitleHighlight: "Seçmelisiniz",
        featuresSubtitle: "En iyi hizmeti sunmak için buradayız",
        missionDoctorImage: "/images/doctors-team.jpg",
        missionQuote:
          "Güzellik sadece dış görünüş değil, kendinizi iyi hissetmektir.",
        missionTitle: "Misyonumuz",
        missionSubtitle: "Size En İyi Hizmeti Sunmak",
        missionDescription1:
          "Modern tıp teknolojileri ile güvenli çözümler sunuyoruz.",
        missionDescription2: "Uzman kadromuz sürekli kendini geliştirmektedir.",
        stat1Value: "500",
        stat1Label: "Mutlu Müşteri",
        stat2Value: "15",
        stat2Label: "Yıl Tecrübe",
        stat3Value: "25",
        stat3Label: "Uzman Ekip",
        stat4Value: "10000",
        stat4Label: "Başarılı İşlem",
      },
    ],
  });
  console.log("✅ About page seeded!");
}
