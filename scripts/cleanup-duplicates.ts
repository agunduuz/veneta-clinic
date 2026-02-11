// scripts/cleanup-duplicates.ts
// ============================================
// CLEANUP DUPLICATE RECORDS
// ============================================
// Run before migration: npx tsx scripts/cleanup-duplicates.ts
// ============================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupDuplicates() {
  console.log("🔄 Cleaning up duplicate records...");

  // ============================================
  // 1. SURGICAL ADVANTAGES
  // ============================================
  console.log("\n📋 Checking SurgicalAdvantage...");

  const advantages = await prisma.surgicalAdvantage.groupBy({
    by: ["categoryId", "order"],
    _count: true,
    having: {
      categoryId: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  for (const group of advantages) {
    const duplicates = await prisma.surgicalAdvantage.findMany({
      where: {
        categoryId: group.categoryId,
        order: group.order,
      },
      orderBy: { createdAt: "asc" },
    });

    // Keep first, delete rest
    const toDelete = duplicates.slice(1);
    console.log(
      `  ⚠️  Found ${duplicates.length} duplicates for categoryId: ${group.categoryId}, order: ${group.order}`,
    );

    for (const item of toDelete) {
      await prisma.surgicalAdvantage.delete({
        where: { id: item.id },
      });
      console.log(`    ❌ Deleted duplicate: ${item.id}`);
    }
  }

  // ============================================
  // 2. SURGICAL FAQs
  // ============================================
  console.log("\n📋 Checking SurgicalFAQ...");

  const faqs = await prisma.surgicalFAQ.groupBy({
    by: ["categoryId", "order"],
    _count: true,
    having: {
      categoryId: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  for (const group of faqs) {
    const duplicates = await prisma.surgicalFAQ.findMany({
      where: {
        categoryId: group.categoryId,
        order: group.order,
      },
      orderBy: { createdAt: "asc" },
    });

    const toDelete = duplicates.slice(1);
    console.log(
      `  ⚠️  Found ${duplicates.length} duplicates for categoryId: ${group.categoryId}, order: ${group.order}`,
    );

    for (const item of toDelete) {
      await prisma.surgicalFAQ.delete({
        where: { id: item.id },
      });
      console.log(`    ❌ Deleted duplicate: ${item.id}`);
    }
  }

  // ============================================
  // 3. SURGICAL PROCESS STEPS
  // ============================================
  console.log("\n📋 Checking SurgicalProcessStep...");

  const processSteps = await prisma.surgicalProcessStep.groupBy({
    by: ["categoryId", "order"],
    _count: true,
    having: {
      categoryId: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  for (const group of processSteps) {
    const duplicates = await prisma.surgicalProcessStep.findMany({
      where: {
        categoryId: group.categoryId,
        order: group.order,
      },
      orderBy: { createdAt: "asc" },
    });

    const toDelete = duplicates.slice(1);
    console.log(
      `  ⚠️  Found ${duplicates.length} duplicates for categoryId: ${group.categoryId}, order: ${group.order}`,
    );

    for (const item of toDelete) {
      await prisma.surgicalProcessStep.delete({
        where: { id: item.id },
      });
      console.log(`    ❌ Deleted duplicate: ${item.id}`);
    }
  }

  // ============================================
  // 4. SURGICAL WHY CHOOSE ITEMS
  // ============================================
  console.log("\n📋 Checking SurgicalWhyChooseItem...");

  const whyChooseItems = await prisma.surgicalWhyChooseItem.groupBy({
    by: ["categoryId", "order"],
    _count: true,
    having: {
      categoryId: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  for (const group of whyChooseItems) {
    const duplicates = await prisma.surgicalWhyChooseItem.findMany({
      where: {
        categoryId: group.categoryId,
        order: group.order,
      },
      orderBy: { createdAt: "asc" },
    });

    const toDelete = duplicates.slice(1);
    console.log(
      `  ⚠️  Found ${duplicates.length} duplicates for categoryId: ${group.categoryId}, order: ${group.order}`,
    );

    for (const item of toDelete) {
      await prisma.surgicalWhyChooseItem.delete({
        where: { id: item.id },
      });
      console.log(`    ❌ Deleted duplicate: ${item.id}`);
    }
  }

  // ============================================
  // 5. SURGICAL FEATURES
  // ============================================
  console.log("\n📋 Checking SurgicalFeature...");

  const features = await prisma.surgicalFeature.groupBy({
    by: ["categoryId", "order"],
    _count: true,
    having: {
      categoryId: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  for (const group of features) {
    const duplicates = await prisma.surgicalFeature.findMany({
      where: {
        categoryId: group.categoryId,
        order: group.order,
      },
      orderBy: { createdAt: "asc" },
    });

    const toDelete = duplicates.slice(1);
    console.log(
      `  ⚠️  Found ${duplicates.length} duplicates for categoryId: ${group.categoryId}, order: ${group.order}`,
    );

    for (const item of toDelete) {
      await prisma.surgicalFeature.delete({
        where: { id: item.id },
      });
      console.log(`    ❌ Deleted duplicate: ${item.id}`);
    }
  }

  console.log("\n✅ Cleanup completed!");
}

cleanupDuplicates()
  .catch((e) => {
    console.error("❌ Cleanup error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
