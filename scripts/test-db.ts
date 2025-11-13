import { prisma } from "../lib/prisma";

async function testDatabase() {
  try {
    console.log("🧪 Testing database connection...");

    // Test 1: Connection
    await prisma.$connect();
    console.log("✅ Database connected!");

    // Test 2: Hero Section
    const hero = await prisma.heroSection.findFirst();
    console.log("✅ Hero Section:", hero ? "Found" : "Not found");

    if (hero) {
      console.log("📄 Hero Data:", JSON.stringify(hero, null, 2));
    }

    // Test 3: Count all records
    const heroCount = await prisma.heroSection.count();
    const aboutCount = await prisma.aboutSection.count();
    const featuresCount = await prisma.feature.count();

    console.log("\n📊 Record Counts:");
    console.log(`- Hero Sections: ${heroCount}`);
    console.log(`- About Sections: ${aboutCount}`);
    console.log(`- Features: ${featuresCount}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
