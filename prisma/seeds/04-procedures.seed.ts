// prisma/seeds/04-procedures.seed.ts
// ============================================
// SEED: PROCEDURES
// ============================================

import { PrismaClient } from "@prisma/client";

export async function seedProcedures(prisma: PrismaClient) {
  console.log("🔄 Seeding procedures...");

  const existingProcedures = await prisma.procedure.findMany();
  if (existingProcedures.length === 0) {
    // TR Procedures
    await prisma.procedure.createMany({
      data: [
        {
          locale: "tr",
          title: "Lazer Epilasyon",
          slug: "lazer-epilasyon",
          description:
            "Son teknoloji lazer cihazları ile kalıcı tüy azaltma. Güvenli, hızlı ve etkili sonuçlar.",
          category: "non-surgical",
          imageUrl:
            "https://images.pexels.com/photos/7581577/pexels-photo-7581577.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: "Popüler",
          detailLink: "/hizmetler/lazer-epilasyon",
          order: 1,
          published: true,
        },
        {
          locale: "tr",
          title: "Burun Estetiği",
          slug: "burun-estetigi",
          description:
            "Yüz hatlarınıza uygun, doğal görünümlü burun estetiği operasyonları.",
          category: "surgical",
          imageUrl:
            "https://images.pexels.com/photos/30686774/pexels-photo-30686774/free-photo-of-plastik-cerrah-klinikte-hastanin-burnunu-inceliyor.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: null,
          detailLink: "/hizmetler/burun-estetigi",
          order: 2,
          published: true,
        },
        {
          locale: "tr",
          title: "Botoks & Dolgu",
          slug: "botoks-dolgu",
          description:
            "Yüz gençleştirme ve kırışıklık tedavisi için botoks ve dolgu uygulamaları.",
          category: "non-surgical",
          imageUrl:
            "https://images.pexels.com/photos/16131210/pexels-photo-16131210/free-photo-of-adam-tedavi-shot-atis.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: null,
          detailLink: "/hizmetler/botoks-dolgu",
          order: 3,
          published: true,
        },
        {
          locale: "tr",
          title: "Göz Estetiği",
          slug: "goz-estetigi",
          description:
            "Göz kapağı estetiği ve göz altı torbaları tedavisi ile daha genç ve dinç bir görünüm.",
          category: "surgical",
          imageUrl:
            "https://images.pexels.com/photos/7772658/pexels-photo-7772658.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: "Yeni",
          detailLink: "/hizmetler/goz-estetigi",
          order: 4,
          published: true,
        },
      ],
    });

    // EN Procedures
    await prisma.procedure.createMany({
      data: [
        {
          locale: "en",
          title: "Laser Hair Removal",
          slug: "laser-hair-removal",
          description:
            "Permanent hair reduction with state-of-the-art laser devices. Safe, fast and effective results.",
          category: "non-surgical",
          imageUrl:
            "https://images.pexels.com/photos/7581577/pexels-photo-7581577.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: "Popular",
          detailLink: "/en/services/laser-hair-removal",
          order: 1,
          published: true,
        },
        {
          locale: "en",
          title: "Rhinoplasty",
          slug: "rhinoplasty",
          description:
            "Natural-looking nose aesthetic surgery tailored to your facial features.",
          category: "surgical",
          imageUrl:
            "https://images.pexels.com/photos/30686774/pexels-photo-30686774/free-photo-of-plastik-cerrah-klinikte-hastanin-burnunu-inceliyor.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: null,
          detailLink: "/en/services/rhinoplasty",
          order: 2,
          published: true,
        },
        {
          locale: "en",
          title: "Botox & Fillers",
          slug: "botox-fillers",
          description:
            "Botox and filler applications for facial rejuvenation and wrinkle treatment.",
          category: "non-surgical",
          imageUrl:
            "https://images.pexels.com/photos/16131210/pexels-photo-16131210/free-photo-of-adam-tedavi-shot-atis.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: null,
          detailLink: "/en/services/botox-fillers",
          order: 3,
          published: true,
        },
        {
          locale: "en",
          title: "Eyelid Surgery",
          slug: "eyelid-surgery",
          description:
            "Eyelid aesthetics and under-eye bag treatment for a younger and more vibrant appearance.",
          category: "surgical",
          imageUrl:
            "https://images.pexels.com/photos/7772658/pexels-photo-7772658.jpeg?auto=compress&cs=tinysrgb&w=600",
          badge: "New",
          detailLink: "/en/services/eyelid-surgery",
          order: 4,
          published: true,
        },
      ],
    });
  }

  console.log("✅ Procedures seeded!");
}
