// prisma/seed.ts
// ============================================
// MAIN SEED ORCHESTRATOR
// ============================================
// Calls individual seed functions from /seeds folder
// ============================================

import { PrismaClient } from "@prisma/client";
import { seedAdminUser } from "./seeds/01-users.seed";
import { seedSurgicalCategories } from "./seeds/02-surgical-categories.seed";
import { seedHomepage } from "./seeds/03-homepage.seed";
import { seedProcedures } from "./seeds/04-procedures.seed";
import { seedTestimonials } from "./seeds/05-testimonials.seed";
import { seedBlog } from "./seeds/06-blog.seed";
import { seedFooter } from "./seeds/07-footer.seed";
import { seedHeader } from "./seeds/08-header.seed";
import { seedContact } from "./seeds/09-contact.seed";
import { seedAbout } from "./seeds/10-about.seed";
import { seedLazerEpilasyon } from "./seeds/11-lazer-epilasyon.seed";
import { seedSacEkimi } from "./seeds/12-sac-ekimi.seed";
import { seedAmeliyatliEstetik } from "./seeds/13-ameliyatli-estetik.seed";

const prisma = new PrismaClient();

// ============================================
// ENVIRONMENT CONFIG
// ============================================
const NODE_ENV = process.env.NODE_ENV || "development";
const SEED_MODE = process.env.SEED_MODE || "minimal"; // full | minimal

// ============================================
// MAIN SEED FUNCTION
// ============================================
async function main() {
  console.log("🌱 Starting seed...");
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Mode: ${SEED_MODE}`);

  // 1. Always seed admin user
  await seedAdminUser(prisma);

  // 2. Production: Only admin user
  if (NODE_ENV === "production") {
    console.log("✅ Production seed complete (admin user only)!");
    return;
  }

  // 3. Development: Seed everything
  await seedHomepage(prisma);
  await seedProcedures(prisma);
  await seedTestimonials(prisma);
  await seedBlog(prisma);
  await seedFooter(prisma);
  await seedHeader(prisma);
  await seedContact(prisma);
  await seedAbout(prisma);
  await seedSurgicalCategories(prisma, SEED_MODE);
  await seedLazerEpilasyon(prisma);
  await seedSacEkimi(prisma);
  await seedAmeliyatliEstetik(prisma);

  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
