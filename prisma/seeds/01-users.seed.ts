// prisma/seeds/01-users.seed.ts
// ============================================
// SEED: ADMIN USER
// ============================================

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedAdminUser(prisma: PrismaClient) {
  console.log("🔄 Seeding admin user...");

  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@venetaclinic.com" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin123!", 10);
    await prisma.user.create({
      data: {
        email: "admin@venetaclinic.com",
        password: hashedPassword,
        name: "Admin User",
        role: "admin",
      },
    });
    console.log("✅ Admin user created!");
  } else {
    console.log("✅ Admin user already exists!");
  }
}
