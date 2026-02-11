// prisma/seeds/08-header.seed.ts
import { PrismaClient } from "@prisma/client";
export async function seedHeader(prisma: PrismaClient) {
  console.log("🔄 Seeding header...");
  const existing = await prisma.headerNavItem.findMany();
  if (existing.length > 0) {
    console.log("✅ Header already seeded!");
    return;
  }
  await prisma.headerNavItem.create({
    data: {
      locale: "tr",
      title: "Anasayfa",
      href: "/",
      order: 1,
      active: true,
      openInNewTab: false,
    },
  });
  const surgicalTR = await prisma.headerNavItem.create({
    data: {
      locale: "tr",
      title: "Ameliyatlı Estetik",
      href: "/ameliyatli-estetik",
      order: 2,
      active: true,
      openInNewTab: false,
    },
  });
  await prisma.headerNavItem.createMany({
    data: [
      {
        locale: "tr",
        title: "Yüz Estetiği",
        href: "/ameliyatli-estetik/yuz",
        parentId: surgicalTR.id,
        order: 1,
        active: true,
        openInNewTab: false,
      },
      {
        locale: "tr",
        title: "Burun Estetiği",
        href: "/ameliyatli-estetik/burun-estetigi",
        parentId: surgicalTR.id,
        order: 2,
        active: true,
        openInNewTab: false,
      },
    ],
  });
  await prisma.headerNavItem.createMany({
    data: [
      {
        locale: "tr",
        title: "Lazer Epilasyon",
        href: "/lazer-epilasyon",
        order: 3,
        active: true,
        openInNewTab: false,
      },
      {
        locale: "tr",
        title: "İletişim",
        href: "/iletisim",
        order: 4,
        active: true,
        openInNewTab: false,
      },
    ],
  });
  console.log("✅ Header seeded!");
}
