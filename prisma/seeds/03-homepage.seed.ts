// prisma/seeds/03-homepage.seed.ts
// ============================================
// SEED: HOMEPAGE SECTIONS
// ============================================

import { PrismaClient } from "@prisma/client";

export async function seedHomepage(prisma: PrismaClient) {
  console.log("🔄 Seeding homepage sections...");

  // ========================================
  // HERO SECTION
  // ========================================
  const existingHero = await prisma.heroSection.findFirst();
  if (!existingHero) {
    // TR Version
    await prisma.heroSection.create({
      data: {
        locale: "tr",
        title: "Özel Tıbbi Bakım Hizmetleri",
        description:
          "İstanbul'un kalbinde, uzman doktorlarımız ve ileri teknolojimizle sağlığınız ve güzelliğiniz için buradayız.",
        stat1Number: "1500+",
        stat1Text: "Mutlu Hasta",
        stat2Number: "15",
        stat2Text: "Yıl Tecrübe",
        button1Text: "Randevu Alın",
        button1Link: "/iletisim",
        button2Text: "Hakkımızda",
        button2Link: "/hakkimizda",
        imageUrl: "/images/hero-doctor.jpg",
      },
    });

    // EN Version
    await prisma.heroSection.create({
      data: {
        locale: "en",
        title: "Specialized Medical Care Services",
        description:
          "In the heart of Istanbul, we are here for your health and beauty with our expert doctors and advanced technology.",
        stat1Number: "1500+",
        stat1Text: "Happy Patients",
        stat2Number: "15",
        stat2Text: "Years Experience",
        button1Text: "Book Appointment",
        button1Link: "/contact",
        button2Text: "About Us",
        button2Link: "/about",
        imageUrl: "/images/hero-doctor.jpg",
      },
    });
  }

  // ========================================
  // ABOUT SECTION
  // ========================================
  const existingAbout = await prisma.aboutSection.findFirst();
  if (!existingAbout) {
    // TR Version
    await prisma.aboutSection.create({
      data: {
        locale: "tr",
        title: "Veneta Klinik Hakkında",
        description:
          "Veneta Klinik olarak, sağlık ve estetik alanında 15 yıllık deneyimimizle, hastaların yaşam kalitesini artırmayı ve kendilerini daha iyi hissetmelerini sağlamayı amaçlıyoruz. Modern tıbbın imkanlarını kullanarak, güvenli ve etkili tedaviler sunuyoruz.",
        buttonText: "Devamını Oku",
        buttonLink: "/hakkimizda",
        imageUrl: "/images/about-clinic.jpg",
        rating: 4.88,
      },
    });

    // EN Version
    await prisma.aboutSection.create({
      data: {
        locale: "en",
        title: "About Veneta Clinic",
        description:
          "As Veneta Clinic, with our 15 years of experience in health and aesthetics, we aim to improve the quality of life of patients and make them feel better. Using the possibilities of modern medicine, we offer safe and effective treatments.",
        buttonText: "Read More",
        buttonLink: "/about",
        imageUrl: "/images/about-clinic.jpg",
        rating: 4.88,
      },
    });
  }

  // ========================================
  // FEATURES
  // ========================================
  const existingFeatures = await prisma.feature.findMany();
  if (existingFeatures.length === 0) {
    // TR Features
    await prisma.feature.createMany({
      data: [
        {
          locale: "tr",
          title: "Uzman Kadro",
          description:
            "Alanında uzman doktorlarımız ve deneyimli ekibimizle hizmetinizdeyiz.",
          order: 1,
        },
        {
          locale: "tr",
          title: "Kişiye Özel Bakım",
          description:
            "Her hastamıza özel tedavi planları ve bireysel yaklaşım sunuyoruz.",
          order: 2,
        },
        {
          locale: "tr",
          title: "İleri Teknoloji",
          description:
            "Son teknoloji medikal cihazlar ve modern tedavi yöntemleri kullanıyoruz.",
          order: 3,
        },
        {
          locale: "tr",
          title: "Esnek Planlama",
          description:
            "Sizin için en uygun randevu saatleri ve esnek ödeme seçenekleri.",
          order: 4,
        },
      ],
    });

    // EN Features
    await prisma.feature.createMany({
      data: [
        {
          locale: "en",
          title: "Expert Staff",
          description:
            "We are at your service with our specialist doctors and experienced team.",
          order: 1,
        },
        {
          locale: "en",
          title: "Personalized Care",
          description:
            "We offer special treatment plans and individual approach to each patient.",
          order: 2,
        },
        {
          locale: "en",
          title: "Advanced Technology",
          description:
            "We use state-of-the-art medical devices and modern treatment methods.",
          order: 3,
        },
        {
          locale: "en",
          title: "Flexible Planning",
          description:
            "Most suitable appointment times and flexible payment options for you.",
          order: 4,
        },
      ],
    });
  }

  // ========================================
  // CTA SECTION
  // ========================================
  const existingCTA = await prisma.cTASection.findFirst();
  if (!existingCTA) {
    // TR Version
    await prisma.cTASection.create({
      data: {
        locale: "tr",
        title: "Dönüşümü Yolculuğunuza Başlamaya Hazır mısınız?",
        description:
          "Uzman ekibimizle tanışın ve size özel tedavi planınızı oluşturalım. İlk konsültasyonunuz için hemen randevu alın.",
        button1Text: "Randevunuzu Alın",
        button1Link: "/iletisim",
        button2Text: "İletişime Geç",
        button2Link: "/iletisim",
      },
    });

    // EN Version
    await prisma.cTASection.create({
      data: {
        locale: "en",
        title: "Ready to Start Your Transformation Journey?",
        description:
          "Meet our expert team and let's create your personalized treatment plan. Book your first consultation now.",
        button1Text: "Book Your Appointment",
        button1Link: "/contact",
        button2Text: "Get in Touch",
        button2Link: "/contact",
      },
    });
  }

  console.log("✅ Homepage sections seeded!");
}
