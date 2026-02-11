// prisma/seed-old-backup.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { trOperations, enOperations } from "../data/operations";

const prisma = new PrismaClient();

// ========================================
// SURGICAL CATEGORIES SEED FUNCTION
// ========================================
async function seedSurgicalCategories() {
  console.log("🔄 Seeding surgical categories...");

  // ========================================
  // SLUG MAPPING - TR to EN
  // ========================================
  const slugMapping: Record<string, string> = {
    yuz: "facial",
    "burun-estetigi": "rhinoplasty",
    "yuz-germe": "face-lift",
    "goz-kapagi-estetigi": "eye-bag-surgery",
    vucut: "body",
    "karin-germe": "tummy-tuck",
    liposuction: "liposuction",
    meme: "breast",
    "meme-buyutme": "augmentation",
    "meme-kucultme": "reduction",
  };

  // ========================================
  // TR CATEGORIES
  // ========================================
  console.log("📝 Creating Turkish categories...");
  let order = 1;

  for (const [slug, data] of Object.entries(trOperations)) {
    console.log(`  ✅ TR: ${data.title} (${slug})`);

    const category = await prisma.surgicalCategory.upsert({
      where: {
        slug_locale: {
          slug: slug,
          locale: "tr",
        },
      },
      update: {
        title: data.title,
        description: data.description,
        heroImage: data.image,
        clinicImage: "/images/klinik-resimleri.jpeg",
        seoContent: `${data.title} konusunda Türkiye'nin en deneyimli estetik cerrahları ile çalışıyoruz. Modern teknolojilerimiz ve hasta odaklı yaklaşımımızla, güvenli ve etkili sonuçlar elde etmenizi sağlıyoruz. Detaylı bilgi ve randevu için hemen iletişime geçin.`,
        galleryImages: data.images || [],
        published: true,
      },
      create: {
        locale: "tr",
        slug: slug,
        title: data.title,
        description: data.description,
        heroImage: data.image,
        clinicImage: "/images/klinik-resimleri.jpeg",
        seoContent: `${data.title} konusunda Türkiye'nin en deneyimli estetik cerrahları ile çalışıyoruz. Modern teknolojilerimiz ve hasta odaklı yaklaşımımızla, güvenli ve etkili sonuçlar elde etmenizi sağlıyoruz. Detaylı bilgi ve randevu için hemen iletişime geçin.`,
        galleryImages: data.images || [],
        patientsCount: "15,000+",
        experienceYears: "15+",
        rating: "4.9/5",
        metaTitle: `${data.title} İstanbul | Veneta Clinic`,
        metaDescription: data.description,
        metaKeywords: data.title.toLowerCase(),
        published: true,
        order: order++,
      },
    });

    // Advantages
    await prisma.surgicalAdvantage.deleteMany({
      where: { categoryId: category.id },
    });
    if (data.advantages && data.advantages.length > 0) {
      await prisma.surgicalAdvantage.createMany({
        data: data.advantages.map((adv, idx) => ({
          categoryId: category.id,
          title: adv,
          description: adv,
          order: idx + 1,
        })),
      });
    }

    // Process Steps
    await prisma.surgicalProcessStep.deleteMany({
      where: { categoryId: category.id },
    });
    if (data.process && data.process.length > 0) {
      await prisma.surgicalProcessStep.createMany({
        data: data.process.map((proc, idx) => ({
          categoryId: category.id,
          step: proc.step,
          description: proc.description,
          order: idx + 1,
        })),
      });
    }

    // FAQs
    await prisma.surgicalFAQ.deleteMany({
      where: { categoryId: category.id },
    });
    if (data.faqs && data.faqs.length > 0) {
      await prisma.surgicalFAQ.createMany({
        data: data.faqs.map((faq, idx) => ({
          categoryId: category.id,
          question: faq.question,
          answer: faq.answer,
          order: idx + 1,
        })),
      });
    }

    // ✅ YENİ: Features
    await prisma.surgicalFeature.deleteMany({
      where: { categoryId: category.id },
    });

    await prisma.surgicalFeature.createMany({
      data: [
        {
          categoryId: category.id,
          title: "Modern Teknoloji",
          description: "En son teknolojik cihazlar ve yöntemler",
          icon: "Zap",
          order: 1,
        },
        {
          categoryId: category.id,
          title: "Hasta Odaklı",
          description: "Her hastanın özel ihtiyaçlarına göre planlama",
          icon: "Heart",
          order: 2,
        },
        {
          categoryId: category.id,
          title: "Hızlı İyileşme",
          description: "Minimal invaziv yöntemlerle hızlı toparlanma",
          icon: "Clock",
          order: 3,
        },
        {
          categoryId: category.id,
          title: "Kanıtlanmış Sonuçlar",
          description: "Bilimsel araştırmalarla desteklenen yöntemler",
          icon: "TrendingUp",
          order: 4,
        },
      ],
    });

    await prisma.surgicalWhyChooseItem.deleteMany({
      where: { categoryId: category.id },
    });

    await prisma.surgicalWhyChooseItem.createMany({
      data: [
        {
          categoryId: category.id,
          text: "Uzman ve deneyimli doktor kadrosu",
          order: 1,
        },
        {
          categoryId: category.id,
          text: "Modern ve güvenli teknoloji",
          order: 2,
        },
        {
          categoryId: category.id,
          text: "Kişiselleştirilmiş tedavi planları",
          order: 3,
        },
        {
          categoryId: category.id,
          text: "Hızlı iyileşme süreçleri",
          order: 4,
        },
        {
          categoryId: category.id,
          text: "Sürekli hasta takibi",
          order: 5,
        },
        {
          categoryId: category.id,
          text: "Uygun fiyat garantisi",
          order: 6,
        },
      ],
    });
  }

  // ========================================
  // EN CATEGORIES - İNGİLİZCE SLUG KULLAN
  // ========================================
  console.log("\n📝 Creating English categories...");
  order = 1;

  for (const [trSlug] of Object.entries(trOperations)) {
    const enSlug = slugMapping[trSlug];

    if (!enSlug) {
      console.warn(`  ⚠️ No English slug for: ${trSlug}`);
      continue;
    }

    // enOperations object'inden data al
    const enData = enOperations[enSlug];

    if (!enData) {
      console.warn(`  ⚠️ No English data for: ${enSlug}`);
      continue;
    }

    console.log(`  ✅ EN: ${enData.title} (${enSlug})`);

    const category = await prisma.surgicalCategory.upsert({
      where: {
        slug_locale: {
          slug: enSlug, // ← İNGİLİZCE SLUG
          locale: "en",
        },
      },
      update: {
        title: enData.title,
        description: enData.description,
        heroImage: enData.image,
        clinicImage: "/images/klinik-resimleri.jpeg",
        seoContent: `We work with Turkey's most experienced aesthetic surgeons in ${enData.title}. With our modern technologies and patient-focused approach, we ensure safe and effective results. Contact us now for detailed information and appointments.`,
        galleryImages: enData.images || [],
        published: true,
      },
      create: {
        locale: "en",
        slug: enSlug, // ← İNGİLİZCE SLUG
        title: enData.title,
        description: enData.description,
        heroImage: enData.image,
        clinicImage: "/images/klinik-resimleri.jpeg",
        seoContent: `We work with Turkey's most experienced aesthetic surgeons in ${enData.title}. With our modern technologies and patient-focused approach, we ensure safe and effective results. Contact us now for detailed information and appointments.`,
        galleryImages: enData.images || [],
        patientsCount: "15,000+",
        experienceYears: "15+",
        rating: "4.9/5",
        metaTitle: `${enData.title} Istanbul | Veneta Clinic`,
        metaDescription: enData.description,
        metaKeywords: enData.title.toLowerCase(),
        published: true,
        order: order++,
      },
    });

    // Advantages
    await prisma.surgicalAdvantage.deleteMany({
      where: { categoryId: category.id },
    });
    if (enData.advantages && enData.advantages.length > 0) {
      await prisma.surgicalAdvantage.createMany({
        data: enData.advantages.map((adv, idx) => ({
          categoryId: category.id,
          title: adv,
          description: adv,
          order: idx + 1,
        })),
      });
    }

    // Process Steps
    await prisma.surgicalProcessStep.deleteMany({
      where: { categoryId: category.id },
    });
    if (enData.process && enData.process.length > 0) {
      await prisma.surgicalProcessStep.createMany({
        data: enData.process.map((proc, idx) => ({
          categoryId: category.id,
          step: proc.step,
          description: proc.description,
          order: idx + 1,
        })),
      });
    }

    // FAQs
    await prisma.surgicalFAQ.deleteMany({
      where: { categoryId: category.id },
    });
    if (enData.faqs && enData.faqs.length > 0) {
      await prisma.surgicalFAQ.createMany({
        data: enData.faqs.map((faq, idx) => ({
          categoryId: category.id,
          question: faq.question,
          answer: faq.answer,
          order: idx + 1,
        })),
      });
    }

    // ✅ YENİ: Features (EN)
    await prisma.surgicalFeature.deleteMany({
      where: { categoryId: category.id },
    });

    await prisma.surgicalFeature.createMany({
      data: [
        {
          categoryId: category.id,
          title: "Modern Technology",
          description: "Latest technological devices and methods",
          icon: "Zap",
          order: 1,
        },
        {
          categoryId: category.id,
          title: "Patient Focused",
          description: "Planning according to each patient's special needs",
          icon: "Heart",
          order: 2,
        },
        {
          categoryId: category.id,
          title: "Quick Recovery",
          description: "Fast recovery with minimally invasive methods",
          icon: "Clock",
          order: 3,
        },
        {
          categoryId: category.id,
          title: "Proven Results",
          description: "Methods supported by scientific research",
          icon: "TrendingUp",
          order: 4,
        },
      ],
    });

    await prisma.surgicalWhyChooseItem.deleteMany({
      where: { categoryId: category.id },
    });

    await prisma.surgicalWhyChooseItem.createMany({
      data: [
        {
          categoryId: category.id,
          text: "Expert and experienced medical team",
          order: 1,
        },
        {
          categoryId: category.id,
          text: "Modern and safe technology",
          order: 2,
        },
        {
          categoryId: category.id,
          text: "Personalized treatment plans",
          order: 3,
        },
        {
          categoryId: category.id,
          text: "Fast recovery processes",
          order: 4,
        },
        {
          categoryId: category.id,
          text: "Continuous patient monitoring",
          order: 5,
        },
        {
          categoryId: category.id,
          text: "Affordable price guarantee",
          order: 6,
        },
      ],
    });
  }

  console.log("\n✅ Surgical categories seeded successfully!");
  console.log(`   📊 TR: ${Object.keys(trOperations).length} categories`);
  console.log(`   📊 EN: ${Object.keys(enOperations).length} categories`);
}

async function main() {
  console.log("🌱 Seeding database...");

  // ========================================
  // ADMIN USER
  // ========================================
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
    console.log("✅ Hero Section created (TR & EN)!");
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
    console.log("✅ About Section created (TR & EN)!");
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
    console.log("✅ Features created (TR & EN)!");
  }

  // ========================================
  // PROCEDURES
  // ========================================
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

    console.log("✅ Procedures created (TR & EN)!");
  }

  // ========================================
  // TESTIMONIALS
  // ========================================
  const existingTestimonials = await prisma.testimonial.findMany();
  if (existingTestimonials.length === 0) {
    // TR Testimonials
    await prisma.testimonial.createMany({
      data: [
        {
          locale: "tr",
          name: "Ayşe Demir",
          procedure: "Burun Estetiği",
          comment:
            "Veneta Klinik'te yaptırdığım burun estetiği ameliyatı hayallerimin ötesinde bir sonuç verdi. Doktor bey ve ekibi çok profesyonel, ameliyat öncesi ve sonrası ilgileri harikaydı.",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 1,
        },
        {
          locale: "tr",
          name: "Mehmet Yılmaz",
          procedure: "Saç Ekimi",
          comment:
            "3 ay önce saç ekimi yaptırdım ve sonuçlardan çok memnunum. Doğal bir görünüm elde ettim. Kesinlikle tavsiye ediyorum!",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 2,
        },
        {
          locale: "tr",
          name: "Zeynep Kaya",
          procedure: "Lazer Epilasyon",
          comment:
            "Lazer epilasyon seanslarım harika geçti. Ağrısız ve etkili bir uygulama. Artık tüy derdim yok. Teşekkürler Veneta Klinik!",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 3,
        },
      ],
    });

    // EN Testimonials
    await prisma.testimonial.createMany({
      data: [
        {
          locale: "en",
          name: "Sarah Johnson",
          procedure: "Rhinoplasty",
          comment:
            "The rhinoplasty I had at Veneta Clinic exceeded my expectations. The doctor and team were very professional, and their care before and after surgery was excellent.",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 1,
        },
        {
          locale: "en",
          name: "Michael Brown",
          procedure: "Hair Transplant",
          comment:
            "I had a hair transplant 3 months ago and I'm very satisfied with the results. I achieved a natural look. I definitely recommend it!",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 2,
        },
        {
          locale: "en",
          name: "Emma Wilson",
          procedure: "Laser Hair Removal",
          comment:
            "My laser hair removal sessions went great. Painless and effective treatment. I no longer have hair problems. Thank you Veneta Clinic!",
          rating: 5,
          imageUrl:
            "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
          active: true,
          order: 3,
        },
      ],
    });
    console.log("✅ Testimonials created (TR & EN)!");
  }

  // ========================================
  // BLOG POSTS
  // ========================================
  const existingBlogs = await prisma.blogPost.findMany();
  if (existingBlogs.length === 0) {
    // TR Blog Posts
    await prisma.blogPost.createMany({
      data: [
        {
          locale: "tr",
          title: "Burun Estetiği: Doğal Sonuçlar İçin İpuçları",
          slug: "burun-estetigi-dogal-sonuclar",
          excerpt:
            "Burun estetiği ameliyatı sonrası doğal görünüm elde etmek için bilmeniz gereken her şey.",
          content:
            "Burun estetiği, yüz estetiği ameliyatları arasında en popüler olanlardan biridir. Doğal bir sonuç elde etmek için ameliyat öncesi planlama çok önemlidir...",
          imageUrl:
            "https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "surgical",
          author: "Dr. Mehmet Yılmaz",
          readTime: "5 dakika",
          published: true,
          order: 1,
        },
        {
          locale: "tr",
          title: "Botoks ve Dolgu: Farkları ve Uygulamaları",
          slug: "botoks-dolgu-farklari",
          excerpt:
            "Botoks ve dolgu uygulamaları arasındaki farkları öğrenin ve hangisinin size uygun olduğunu keşfedin.",
          content:
            "Botoks ve dolgu uygulamaları, yaşlanma belirtilerini azaltmak için kullanılan popüler yöntemlerdir. Ancak aralarında önemli farklar vardır...",
          imageUrl:
            "https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "non-surgical",
          author: "Dr. Ayşe Demir",
          readTime: "4 dakika",
          published: true,
          order: 2,
        },
        {
          locale: "tr",
          title: "Lazer Epilasyon: Sık Sorulan Sorular",
          slug: "lazer-epilasyon-sss",
          excerpt:
            "Lazer epilasyon hakkında en çok merak edilen soruların yanıtları bu yazıda.",
          content:
            "Lazer epilasyon, istenmeyen tüylerden kalıcı olarak kurtulmanın en etkili yöntemlerinden biridir. Peki nasıl çalışır?...",
          imageUrl:
            "https://images.pexels.com/photos/7319170/pexels-photo-7319170.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "non-surgical",
          author: "Dr. Zeynep Kaya",
          readTime: "6 dakika",
          published: true,
          order: 3,
        },
      ],
    });

    // EN Blog Posts
    await prisma.blogPost.createMany({
      data: [
        {
          locale: "en",
          title: "Rhinoplasty: Tips for Natural Results",
          slug: "rhinoplasty-natural-results",
          excerpt:
            "Everything you need to know to achieve a natural look after rhinoplasty surgery.",
          content:
            "Rhinoplasty is one of the most popular facial aesthetic surgeries. Pre-operative planning is crucial for achieving natural results...",
          imageUrl:
            "https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "surgical",
          author: "Dr. Michael Smith",
          readTime: "5 min read",
          published: true,
          order: 1,
        },
        {
          locale: "en",
          title: "Botox and Fillers: Differences and Applications",
          slug: "botox-fillers-differences",
          excerpt:
            "Learn the differences between Botox and filler applications and discover which one is right for you.",
          content:
            "Botox and filler applications are popular methods used to reduce signs of aging. However, there are important differences between them...",
          imageUrl:
            "https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "non-surgical",
          author: "Dr. Sarah Johnson",
          readTime: "4 min read",
          published: true,
          order: 2,
        },
        {
          locale: "en",
          title: "Laser Hair Removal: Frequently Asked Questions",
          slug: "laser-hair-removal-faq",
          excerpt:
            "Answers to the most frequently asked questions about laser hair removal in this article.",
          content:
            "Laser hair removal is one of the most effective ways to permanently get rid of unwanted hair. So how does it work?...",
          imageUrl:
            "https://images.pexels.com/photos/7319170/pexels-photo-7319170.jpeg?auto=compress&cs=tinysrgb&w=600",
          category: "non-surgical",
          author: "Dr. Emma Wilson",
          readTime: "6 min read",
          published: true,
          order: 3,
        },
      ],
    });
    console.log("✅ Blog Posts created (TR & EN)!");
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
    console.log("✅ CTA Section created (TR & EN)!");
  }

  // ========================================
  // FOOTER CONTENT
  // ========================================
  const existingFooterContent = await prisma.footerContent.findFirst();
  if (!existingFooterContent) {
    // TR Footer Content
    await prisma.footerContent.create({
      data: {
        locale: "tr",
        phone: "+90 212 561 23 22",
        phoneSecondary: null,
        email: "info@venetaclinic.com",
        address: "İstanbul, Türkiye",
        mapLink: null,
        facebookUrl: "https://facebook.com/venetaclinic",
        instagramUrl: "https://instagram.com/venetaclinic",
        twitterUrl: "https://twitter.com/venetaclinic",
        linkedinUrl: "https://linkedin.com/company/venetaclinic",
        youtubeUrl: null,
        copyrightText: "© 2024 Veneta Clinic. Tüm hakları saklıdır.",
      },
    });

    // EN Footer Content
    await prisma.footerContent.create({
      data: {
        locale: "en",
        phone: "+90 212 561 23 22",
        phoneSecondary: null,
        email: "info@venetaclinic.com",
        address: "Istanbul, Turkey",
        mapLink: null,
        facebookUrl: "https://facebook.com/venetaclinic",
        instagramUrl: "https://instagram.com/venetaclinic",
        twitterUrl: "https://twitter.com/venetaclinic",
        linkedinUrl: "https://linkedin.com/company/venetaclinic",
        youtubeUrl: null,
        copyrightText: "© 2024 Veneta Clinic. All rights reserved.",
      },
    });
    console.log("✅ Footer Content created (TR & EN)!");
  }

  // ========================================
  // FOOTER LINK GROUPS
  // ========================================
  const existingFooterGroups = await prisma.footerLinkGroup.findMany();
  if (existingFooterGroups.length === 0) {
    // TR - Kurumsal Grup
    const corporateGroupTR = await prisma.footerLinkGroup.create({
      data: {
        locale: "tr",
        title: "Kurumsal",
        slug: "corporate",
        order: 1,
        active: true,
      },
    });

    // TR - Hizmetler Grup
    const servicesGroupTR = await prisma.footerLinkGroup.create({
      data: {
        locale: "tr",
        title: "Hizmetler",
        slug: "services",
        order: 2,
        active: true,
      },
    });

    // EN - Corporate Group
    const corporateGroupEN = await prisma.footerLinkGroup.create({
      data: {
        locale: "en",
        title: "Corporate",
        slug: "corporate",
        order: 1,
        active: true,
      },
    });

    // EN - Services Group
    const servicesGroupEN = await prisma.footerLinkGroup.create({
      data: {
        locale: "en",
        title: "Services",
        slug: "services",
        order: 2,
        active: true,
      },
    });

    console.log("✅ Footer Link Groups created (TR & EN)!");

    // ========================================
    // FOOTER LINKS - TR
    // ========================================

    // TR - Kurumsal Links
    await prisma.footerLink.createMany({
      data: [
        {
          groupId: corporateGroupTR.id,
          title: "Hakkımızda",
          href: "/hakkimizda",
          order: 1,
          active: true,
        },
        {
          groupId: corporateGroupTR.id,
          title: "Hizmetlerimiz",
          href: "/hizmetlerimiz",
          order: 2,
          active: true,
        },
        {
          groupId: corporateGroupTR.id,
          title: "Doktorlarımız",
          href: "/doktorlarimiz",
          order: 3,
          active: true,
        },
        {
          groupId: corporateGroupTR.id,
          title: "Blog",
          href: "/blog",
          order: 4,
          active: true,
        },
        {
          groupId: corporateGroupTR.id,
          title: "İletişim",
          href: "/iletisim",
          order: 5,
          active: true,
        },
      ],
    });

    // TR - Hizmet Links
    await prisma.footerLink.createMany({
      data: [
        {
          groupId: servicesGroupTR.id,
          title: "Ameliyatlı Estetik",
          href: "/ameliyatli-estetik",
          order: 1,
          active: true,
        },
        {
          groupId: servicesGroupTR.id,
          title: "Lazer Epilasyon",
          href: "/lazer-epilasyon",
          order: 2,
          active: true,
        },
        {
          groupId: servicesGroupTR.id,
          title: "Cilt Bakımı",
          href: "/cilt-bakimi",
          order: 3,
          active: true,
        },
        {
          groupId: servicesGroupTR.id,
          title: "Dolgu",
          href: "/dolgu",
          order: 4,
          active: true,
        },
        {
          groupId: servicesGroupTR.id,
          title: "Kırışıklık Tedavisi",
          href: "/kirisiklik",
          order: 5,
          active: true,
        },
      ],
    });

    // ========================================
    // FOOTER LINKS - EN
    // ========================================

    // EN - Corporate Links
    await prisma.footerLink.createMany({
      data: [
        {
          groupId: corporateGroupEN.id,
          title: "About Us",
          href: "/en/about",
          order: 1,
          active: true,
        },
        {
          groupId: corporateGroupEN.id,
          title: "Our Services",
          href: "/en/services",
          order: 2,
          active: true,
        },
        {
          groupId: corporateGroupEN.id,
          title: "Our Doctors",
          href: "/en/doctors",
          order: 3,
          active: true,
        },
        {
          groupId: corporateGroupEN.id,
          title: "Blog",
          href: "/en/blog",
          order: 4,
          active: true,
        },
        {
          groupId: corporateGroupEN.id,
          title: "Contact",
          href: "/en/contact",
          order: 5,
          active: true,
        },
      ],
    });

    // EN - Service Links
    await prisma.footerLink.createMany({
      data: [
        {
          groupId: servicesGroupEN.id,
          title: "Surgical Aesthetics",
          href: "/en/surgical-aesthetics",
          order: 1,
          active: true,
        },
        {
          groupId: servicesGroupEN.id,
          title: "Laser Hair Removal",
          href: "/en/laser-hair-removal",
          order: 2,
          active: true,
        },
        {
          groupId: servicesGroupEN.id,
          title: "Skin Care",
          href: "/en/skin-care",
          order: 3,
          active: true,
        },
        {
          groupId: servicesGroupEN.id,
          title: "Fillers",
          href: "/en/fillers",
          order: 4,
          active: true,
        },
        {
          groupId: servicesGroupEN.id,
          title: "Wrinkle Treatment",
          href: "/en/wrinkle-treatment",
          order: 5,
          active: true,
        },
      ],
    });

    console.log("✅ Footer Links created (TR & EN)!");
  }

  // ========================================
  // HEADER NAVIGATION
  // ========================================
  const existingHeaderNav = await prisma.headerNavItem.findMany();
  if (existingHeaderNav.length === 0) {
    console.log("🔄 Seeding header navigation...");

    // ========================================
    // TÜRKÇE NAVİGASYON
    // ========================================

    // 1. Anasayfa
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Anasayfa",
        href: "/",
        parentId: null,
        order: 1,
        active: true,
        openInNewTab: false,
      },
    });

    // 2. Ameliyatlı Estetik (Ana Menü - Dropdown)
    const surgicalTR = await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Ameliyatlı Estetik",
        href: "/ameliyatli-estetik",
        parentId: null,
        order: 2,
        active: true,
        openInNewTab: false,
      },
    });

    // Alt Menü - Yüz Estetiği Grubu
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
        {
          locale: "tr",
          title: "Yüz Germe",
          href: "/ameliyatli-estetik/yuz-germe",
          parentId: surgicalTR.id,
          order: 3,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "tr",
          title: "Göz Kapağı Estetiği",
          href: "/ameliyatli-estetik/goz-kapagi-estetigi",
          parentId: surgicalTR.id,
          order: 4,
          active: true,
          openInNewTab: false,
        },
        // Vücut Estetiği Grubu
        {
          locale: "tr",
          title: "Vücut Estetiği",
          href: "/ameliyatli-estetik/vucut",
          parentId: surgicalTR.id,
          order: 5,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "tr",
          title: "Karın Germe",
          href: "/ameliyatli-estetik/karin-germe",
          parentId: surgicalTR.id,
          order: 6,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "tr",
          title: "Liposuction",
          href: "/ameliyatli-estetik/liposuction",
          parentId: surgicalTR.id,
          order: 7,
          active: true,
          openInNewTab: false,
        },
        // Meme Estetiği Grubu
        {
          locale: "tr",
          title: "Meme Estetiği",
          href: "/ameliyatli-estetik/meme",
          parentId: surgicalTR.id,
          order: 8,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "tr",
          title: "Meme Büyütme",
          href: "/ameliyatli-estetik/meme-buyutme",
          parentId: surgicalTR.id,
          order: 9,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "tr",
          title: "Meme Küçültme",
          href: "/ameliyatli-estetik/meme-kucultme",
          parentId: surgicalTR.id,
          order: 10,
          active: true,
          openInNewTab: false,
        },
      ],
    });

    // 3. Lazer Epilasyon
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Lazer Epilasyon",
        href: "/lazer-epilasyon",
        parentId: null,
        order: 3,
        active: true,
        openInNewTab: false,
      },
    });

    // 4. Saç Ekimi
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Saç Ekimi",
        href: "/sac-ekimi",
        parentId: null,
        order: 4,
        active: true,
        openInNewTab: false,
      },
    });

    // 5. Hakkımızda
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Hakkımızda",
        href: "/hakkimizda",
        parentId: null,
        order: 5,
        active: true,
        openInNewTab: false,
      },
    });

    // 6. Müşteri Yorumları (Google - Dış link)
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "Müşteri Yorumları",
        href: "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",
        parentId: null,
        order: 6,
        active: true,
        openInNewTab: true, // ← Yeni sekmede açılacak
      },
    });

    // 7. İletişim
    await prisma.headerNavItem.create({
      data: {
        locale: "tr",
        title: "İletişim",
        href: "/iletisim",
        parentId: null,
        order: 7,
        active: true,
        openInNewTab: false,
      },
    });

    // ========================================
    // İNGİLİZCE NAVİGASYON
    // ========================================

    // 1. Home
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Home",
        href: "/en/",
        parentId: null,
        order: 1,
        active: true,
        openInNewTab: false,
      },
    });

    // 2. Surgical Aesthetics (Main Menu - Dropdown)
    const surgicalEN = await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Surgical Aesthetics",
        href: "/en/surgical-aesthetics",
        parentId: null,
        order: 2,
        active: true,
        openInNewTab: false,
      },
    });

    // Submenu - Facial Aesthetics Group
    await prisma.headerNavItem.createMany({
      data: [
        {
          locale: "en",
          title: "Facial Aesthetics",
          href: "/en/surgical-aesthetics/facial",
          parentId: surgicalEN.id,
          order: 1,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Rhinoplasty",
          href: "/en/surgical-aesthetics/rhinoplasty",
          parentId: surgicalEN.id,
          order: 2,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Face Lift",
          href: "/en/surgical-aesthetics/face-lift",
          parentId: surgicalEN.id,
          order: 3,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Eyelid Surgery",
          href: "/en/surgical-aesthetics/eye-bag-surgery",
          parentId: surgicalEN.id,
          order: 4,
          active: true,
          openInNewTab: false,
        },
        // Body Aesthetics Group
        {
          locale: "en",
          title: "Body Aesthetics",
          href: "/en/surgical-aesthetics/body",
          parentId: surgicalEN.id,
          order: 5,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Tummy Tuck",
          href: "/en/surgical-aesthetics/tummy-tuck",
          parentId: surgicalEN.id,
          order: 6,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Liposuction",
          href: "/en/surgical-aesthetics/liposuction",
          parentId: surgicalEN.id,
          order: 7,
          active: true,
          openInNewTab: false,
        },
        // Breast Aesthetics Group
        {
          locale: "en",
          title: "Breast Aesthetics",
          href: "/en/surgical-aesthetics/breast",
          parentId: surgicalEN.id,
          order: 8,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Breast Augmentation",
          href: "/en/surgical-aesthetics/augmentation",
          parentId: surgicalEN.id,
          order: 9,
          active: true,
          openInNewTab: false,
        },
        {
          locale: "en",
          title: "Breast Reduction",
          href: "/en/surgical-aesthetics/reduction",
          parentId: surgicalEN.id,
          order: 10,
          active: true,
          openInNewTab: false,
        },
      ],
    });

    // 3. Laser Hair Removal
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Laser Hair Removal",
        href: "/en/laser-hair-removal",
        parentId: null,
        order: 3,
        active: true,
        openInNewTab: false,
      },
    });

    // 4. Hair Transplant
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Hair Transplant",
        href: "/en/hair-transplant",
        parentId: null,
        order: 4,
        active: true,
        openInNewTab: false,
      },
    });

    // 5. About
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "About",
        href: "/en/about",
        parentId: null,
        order: 5,
        active: true,
        openInNewTab: false,
      },
    });

    // 6. Customer Reviews (Google - External link)
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Customer Reviews",
        href: "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",
        parentId: null,
        order: 6,
        active: true,
        openInNewTab: true, // ← Opens in new tab
      },
    });

    // 7. Contact
    await prisma.headerNavItem.create({
      data: {
        locale: "en",
        title: "Contact",
        href: "/en/contact",
        parentId: null,
        order: 7,
        active: true,
        openInNewTab: false,
      },
    });

    console.log("✅ Header Navigation created (TR & EN)!");
  }

  // ========================================
  // CONTACT PAGE
  // ========================================
  const existingContactPage = await prisma.contactPage.findFirst();
  if (!existingContactPage) {
    console.log("🔄 Seeding contact page...");

    // TR Contact Page
    await prisma.contactPage.create({
      data: {
        locale: "tr",

        // Header Section
        headerTitle: "Bizimle\nİletişime Geçin",
        headerDescription:
          "Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız. Aşağıdaki formu doldurarak bize ulaşabilir veya doğrudan arayabilirsiniz.",
        headerButtonText: "Randevu Alın",
        headerImage: "/images/doctors-team.jpg",

        // Form Section
        formTitle: "İletişim Bilgileri",
        formDescription:
          "Aşağıdaki bilgilerden bize ulaşabilir, size en uygun zamanı bulabiliriz.",
        happyCustomersText: "500+ Mutlu Müşteri",

        // Google Reviews
        reviewsRating: "4.8",
        reviewsText: "Google'da 250+ değerlendirme",
        reviewsLink:
          "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",

        // Contact Cards
        addressLabel: "Adresimiz",
        addressText:
          "Teşvikiye, Halaskargazi Cd. No:38/B, 34365 Şişli/İstanbul",
        addressLink:
          "https://www.google.com/maps/place/Soprano+Lazer+Epilasyon+%7C+Buz+Lazer+%7C+Ni%C5%9Fanta%C5%9F%C4%B1+Lazer+Epilasyon+%7C+Laser+Hair+Removal+istanbul+%7C+Epilation+Laser+Epilation/@41.0518288,28.9890787,17z/data=!3m1!4b1!4m6!3m5!1s0x14cabca23318a107:0x5e988f79a28ac1fd!8m2!3d41.0518288!4d28.9916536!16s%2Fg%2F11csqvqcr0?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D",

        phoneLabel: "Telefon",
        phoneText: "+90 212 561 23 22",
        phoneLink: "tel:+902125612322",

        hoursLabel: "Çalışma Saatleri",
        hoursText: "Pazartesi - Cuma: 09:00 - 19:00\nCumartesi: 09:00 - 14:00",

        // Form
        formTitleBox: "Formu Doldurun",
        formSubtitle:
          "Lütfen bilgilerinizi girin, sizinle en kısa sürede iletişime geçelim.",
        firstNamePlaceholder: "Adınız",
        lastNamePlaceholder: "Soyadınız",
        emailPlaceholder: "E-posta",
        phonePlaceholder: "Telefon",
        messagePlaceholder: "Mesajınız",
        submitButtonText: "Gönder",
        submittingButtonText: "Gönderiliyor...",
        successMessage:
          "Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.",
        errorMessage: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",

        // Email
        emailRecipient: "eyup17@gmail.com",
        emailSubject: "Yeni İletişim Formu Mesajı - Veneta Klinik",
      },
    });

    // EN Contact Page
    await prisma.contactPage.create({
      data: {
        locale: "en",

        // Header Section
        headerTitle: "Get in\nTouch",
        headerDescription:
          "Have questions? We'd love to help. Fill out the form below or give us a call directly.",
        headerButtonText: "Book Appointment",
        headerImage: "/images/doctors-team.jpg",

        // Form Section
        formTitle: "Contact Information",
        formDescription:
          "You can reach us through the information below and we can find the most suitable time for you.",
        happyCustomersText: "500+ Happy Customers",

        // Google Reviews
        reviewsRating: "4.8",
        reviewsText: "250+ reviews on Google",
        reviewsLink:
          "https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2",

        // Contact Cards
        addressLabel: "Address",
        addressText:
          "Teşvikiye, Halaskargazi St. No:38/B, 34365 Şişli/Istanbul",
        addressLink:
          "https://www.google.com/maps/place/Soprano+Lazer+Epilasyon+%7C+Buz+Lazer+%7C+Ni%C5%9Fanta%C5%9F%C4%B1+Lazer+Epilasyon+%7C+Laser+Hair+Removal+istanbul+%7C+Epilation+Laser+Epilation/@41.0518288,28.9890787,17z/data=!3m1!4b1!4m6!3m5!1s0x14cabca23318a107:0x5e988f79a28ac1fd!8m2!3d41.0518288!4d28.9916536!16s%2Fg%2F11csqvqcr0?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D",

        phoneLabel: "Phone",
        phoneText: "+90 212 561 23 22",
        phoneLink: "tel:+902125612322",

        hoursLabel: "Working Hours",
        hoursText: "Monday - Friday: 09:00 - 19:00\nSaturday: 09:00 - 14:00",

        // Form
        formTitleBox: "Fill the Form",
        formSubtitle:
          "Please enter your information and we'll get in touch with you as soon as possible.",
        firstNamePlaceholder: "First Name",
        lastNamePlaceholder: "Last Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "Phone",
        messagePlaceholder: "Your Message",
        submitButtonText: "Submit",
        submittingButtonText: "Submitting...",
        successMessage:
          "Your message has been sent successfully! We'll get back to you shortly.",
        errorMessage: "An error occurred. Please try again later.",

        // Email
        emailRecipient: "eyup17@gmail.com",
        emailSubject: "New Contact Form Message - Veneta Clinic",
      },
    });

    console.log("✅ Contact page created (TR & EN)!");
  }

  // ========================================
  // ABOUT PAGE
  // ========================================
  const existingAboutPage = await prisma.aboutPage.findFirst();
  if (!existingAboutPage) {
    console.log("🔄 Seeding about page...");

    // TR About Page
    await prisma.aboutPage.create({
      data: {
        locale: "tr",

        // Header Section
        headerTitle: "Güzelliğiniz İçin",
        headerTitleHighlight: "En İyi Eller",
        headerSubtitle: "Modern Tıbbın Gücü, Geleneksel Dokunuşlarla Buluşuyor",
        headerDescription:
          "Veneta Clinic olarak, 15 yılı aşkın tecrübemiz ve uzman kadromuzla size en kaliteli estetik ve medikal hizmetleri sunuyoruz. Güzelliğiniz bizim önceliğimizdir.",
        headerButtonServices: "Hizmetlerimiz",
        headerButtonContact: "İletişim",
        headerImage: "/images/doctors-team.jpg",
        headerExperienceYears: "15+",
        headerExperienceText: "Yıl\nTecrübe",

        // Features Section
        featuresTitle: "Neden Bizi",
        featuresTitleHighlight: "Seçmelisiniz",
        featuresSubtitle:
          "Veneta Clinic'te size en iyi hizmeti sunmak için sürekli gelişiyoruz",

        // Mission Section
        missionDoctorImage: "/images/doctors-team.jpg",
        missionQuote:
          "Güzellik sadece dış görünüş değil, kendinizi iyi hissetmektir. Biz her hastamıza bu güven ve mutluluğu yaşatmak için buradayız.",
        missionTitle: "Misyonumuz",
        missionSubtitle: "Size En İyi Hizmeti Sunmak",
        missionDescription1:
          "Veneta Clinic olarak, modern tıp teknolojilerini kullanarak güvenli, etkili ve kişiye özel estetik çözümler sunuyoruz. Her hastamızın benzersiz ihtiyaçlarını anlıyor ve en uygun tedavi planlarını oluşturuyoruz.",
        missionDescription2:
          "Uzman kadromuz, en son teknolojileri kullanarak size en doğal ve kalıcı sonuçları sunmak için sürekli kendini geliştirmektedir. Güzelliğiniz bizim işimiz, mutluluğunuz bizim başarımız.",

        // Statistics
        stat1Value: "500",
        stat1Label: "Mutlu Müşteri",
        stat2Value: "15",
        stat2Label: "Yıl Tecrübe",
        stat3Value: "25",
        stat3Label: "Uzman Ekip",
        stat4Value: "10000",
        stat4Label: "Başarılı İşlem",
      },
    });

    // EN About Page
    await prisma.aboutPage.create({
      data: {
        locale: "en",

        // Header Section
        headerTitle: "The Best Hands For",
        headerTitleHighlight: "Your Beauty",
        headerSubtitle: "Modern Medicine Meets Traditional Touch",
        headerDescription:
          "At Veneta Clinic, with over 15 years of experience and our expert team, we provide you with the highest quality aesthetic and medical services. Your beauty is our priority.",
        headerButtonServices: "Our Services",
        headerButtonContact: "Contact",
        headerImage: "/images/doctors-team.jpg",
        headerExperienceYears: "15+",
        headerExperienceText: "Years\nExperience",

        // Features Section
        featuresTitle: "Why Choose",
        featuresTitleHighlight: "Us",
        featuresSubtitle:
          "At Veneta Clinic, we are constantly evolving to provide you with the best service",

        // Mission Section
        missionDoctorImage: "/images/doctors-team.jpg",
        missionQuote:
          "Beauty is not just about appearance, it's about feeling good about yourself. We are here to give every patient that confidence and happiness.",
        missionTitle: "Our Mission",
        missionSubtitle: "To Provide You With The Best Service",
        missionDescription1:
          "As Veneta Clinic, we offer safe, effective and personalized aesthetic solutions using modern medical technologies. We understand the unique needs of each patient and create the most suitable treatment plans.",
        missionDescription2:
          "Our expert team is constantly improving itself to provide you with the most natural and permanent results using the latest technologies. Your beauty is our business, your happiness is our success.",

        // Statistics
        stat1Value: "500",
        stat1Label: "Happy Customers",
        stat2Value: "15",
        stat2Label: "Years Experience",
        stat3Value: "25",
        stat3Label: "Expert Team",
        stat4Value: "10000",
        stat4Label: "Successful Procedures",
      },
    });

    // TR Features
    await prisma.aboutFeature.createMany({
      data: [
        {
          locale: "tr",
          featureId: "01",
          title: "Uzman Kadro",
          description:
            "15 yılı aşkın tecrübesiyle alanında uzman doktor ve ekibimiz, size en iyi hizmeti sunmak için burada.",
          image:
            "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?q=80&w=1200",
          order: 1,
          active: true,
        },
        {
          locale: "tr",
          featureId: "02",
          title: "Modern Teknoloji",
          description:
            "En son teknolojileri kullanarak güvenli, etkili ve konforlu tedaviler sunuyoruz.",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
          order: 2,
          active: true,
        },
        {
          locale: "tr",
          featureId: "03",
          title: "Kişiye Özel Çözümler",
          description:
            "Her hastamızın benzersiz ihtiyaçlarını anlıyor ve kişiye özel tedavi planları oluşturuyoruz.",
          image:
            "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000",
          order: 3,
          active: true,
        },
      ],
    });

    // EN Features
    await prisma.aboutFeature.createMany({
      data: [
        {
          locale: "en",
          featureId: "01",
          title: "Expert Team",
          description:
            "With over 15 years of experience, our expert doctors and team are here to provide you with the best service.",
          image:
            "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?q=80&w=1200",
          order: 1,
          active: true,
        },
        {
          locale: "en",
          featureId: "02",
          title: "Modern Technology",
          description:
            "We offer safe, effective and comfortable treatments using the latest technologies.",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
          order: 2,
          active: true,
        },
        {
          locale: "en",
          featureId: "03",
          title: "Personalized Solutions",
          description:
            "We understand the unique needs of each patient and create personalized treatment plans.",
          image:
            "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000",
          order: 3,
          active: true,
        },
      ],
    });

    console.log("✅ About page created (TR & EN)!");
  }

  // Features kontrolü
  const existingFeaturesLaser = await prisma.procedureFeature.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingFeaturesLaser === 0) {
    // TR Features
    await prisma.procedureFeature.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "zap",
          title: "Son Teknoloji",
          description:
            "Alma Soprano Ice Platinum ile yeni nesil lazer epilasyon teknolojisi",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "users",
          title: "Uzman Kadro",
          description: "Alanında deneyimli ve sertifikalı terapistler",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "check-circle",
          title: "FDA Onaylı",
          description: "Güvenli ve etkili, klinik olarak test edilmiş sistem",
          order: 3,
          active: true,
        },
      ],
    });

    // EN Features
    await prisma.procedureFeature.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "zap",
          title: "Latest Technology",
          description:
            "Next generation laser hair removal technology with Alma Soprano Ice Platinum",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "users",
          title: "Expert Team",
          description: "Experienced and certified therapists in their field",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "check-circle",
          title: "FDA Approved",
          description: "Safe and effective, clinically tested system",
          order: 3,
          active: true,
        },
      ],
    });
  }

  // Device Items kontrolü
  const existingDeviceItems = await prisma.procedureDeviceItem.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingDeviceItems === 0) {
    // TR Device Features
    await prisma.procedureDeviceItem.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "feature",
          text: "3 farklı dalga boyu (755nm, 810nm, 1064nm)",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "feature",
          text: "Ice Platinum soğutma teknolojisi",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "feature",
          text: "Tüm cilt tiplerine uygun (I-VI)",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "feature",
          text: "FDA ve CE onaylı",
          order: 4,
          active: true,
        },
      ],
    });

    // TR Device Advantages
    await prisma.procedureDeviceItem.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "advantage",
          text: "Ağrısız ve konforlu uygulama",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "advantage",
          text: "Hızlı işlem süresi",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "advantage",
          text: "Kalıcı sonuçlar",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          type: "advantage",
          text: "Yan etki riski minimum",
          order: 4,
          active: true,
        },
      ],
    });

    // EN Device Features
    await prisma.procedureDeviceItem.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "feature",
          text: "3 different wavelengths (755nm, 810nm, 1064nm)",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "feature",
          text: "Ice Platinum cooling technology",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "feature",
          text: "Suitable for all skin types (I-VI)",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "feature",
          text: "FDA and CE approved",
          order: 4,
          active: true,
        },
      ],
    });

    // EN Device Advantages
    await prisma.procedureDeviceItem.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "advantage",
          text: "Painless and comfortable application",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "advantage",
          text: "Fast treatment time",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "advantage",
          text: "Permanent results",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          type: "advantage",
          text: "Minimal side effect risk",
          order: 4,
          active: true,
        },
      ],
    });
  }

  // Treatment Areas kontrolü
  const existingAreas = await prisma.procedureTreatmentArea.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingAreas === 0) {
    // TR Treatment Areas
    await prisma.procedureTreatmentArea.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Yüz Bölgesi",
          description: "Üst dudak, çene, yanaklar",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Vücut",
          description: "Kol, bacak, sırt, göğüs",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Bikini Bölgesi",
          description: "Klasik, brazilian, hollywood",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Koltuk Altı",
          description: "Hızlı ve etkili uygulama",
          order: 4,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Karın Bölgesi",
          description: "Alt karın ve göbek çevresi",
          order: 5,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Tam Vücut",
          description: "Tüm bölgeler için özel paketler",
          order: 6,
          active: true,
        },
      ],
    });

    // EN Treatment Areas
    await prisma.procedureTreatmentArea.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Face Area",
          description: "Upper lip, chin, cheeks",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Body",
          description: "Arms, legs, back, chest",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Bikini Area",
          description: "Classic, brazilian, hollywood",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Underarms",
          description: "Fast and effective application",
          order: 4,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Abdominal Area",
          description: "Lower abdomen and belly area",
          order: 5,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Full Body",
          description: "Special packages for all areas",
          order: 6,
          active: true,
        },
      ],
    });
  }

  // Pricing kontrolü
  const existingPricing = await prisma.procedurePricing.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingPricing === 0) {
    // TR Pricing
    await prisma.procedurePricing.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Tüm Vücut",
          description: "Yüz dahil tüm bölgeler",
          priceText: "Fiyat için arayın",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Yarım Vücut",
          description: "Üst veya alt beden",
          priceText: "Fiyat için arayın",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          title: "Bölgesel",
          description: "Tek bölge uygulaması",
          priceText: "Fiyat için arayın",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
      ],
    });

    // EN Pricing
    await prisma.procedurePricing.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Full Body",
          description: "All areas including face",
          priceText: "Call for price",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Half Body",
          description: "Upper or lower body",
          priceText: "Call for price",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          title: "Single Area",
          description: "Single area application",
          priceText: "Call for price",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
      ],
    });
  }

  // Why Us kontrolü
  const existingWhyUs = await prisma.procedureWhyUs.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingWhyUs === 0) {
    // TR Why Us
    await prisma.procedureWhyUs.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "lightning",
          title: "Hızlı İşlem",
          description: "En son teknoloji ile kısa sürede etkili sonuçlar",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "users",
          title: "Deneyimli Ekip",
          description: "Alanında uzman ve sertifikalı terapistler",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "dollar",
          title: "Uygun Fiyat",
          description: "Kaliteli hizmeti uygun fiyatlarla sunuyoruz",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          icon: "heart",
          title: "Müşteri Memnuniyeti",
          description: "Binlerce mutlu müşterimiz var",
          colorScheme: "destructive",
          order: 4,
          active: true,
        },
      ],
    });

    // EN Why Us
    await prisma.procedureWhyUs.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "lightning",
          title: "Fast Treatment",
          description: "Effective results in short time with latest technology",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "users",
          title: "Experienced Team",
          description: "Expert and certified therapists in their field",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "dollar",
          title: "Affordable Price",
          description: "We offer quality service at affordable prices",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          icon: "heart",
          title: "Customer Satisfaction",
          description: "Thousands of happy customers",
          colorScheme: "destructive",
          order: 4,
          active: true,
        },
      ],
    });
  }

  // FAQ kontrolü
  const existingFAQs = await prisma.procedureFAQ.count({
    where: { pageSlug: "lazer-epilasyon" },
  });

  if (existingFAQs === 0) {
    // TR FAQs
    await prisma.procedureFAQ.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "Lazer epilasyon ağrılı mı?",
          answer:
            "Alma Soprano Ice Platinum'un Ice Platinum soğutma teknolojisi sayesinde işlem neredeyse ağrısızdır. Hafif bir ısınma hissi dışında rahatsızlık yaşamazsınız.",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "Kaç seans gerekir?",
          answer:
            "Genellikle 6-8 seans önerilir. Ancak kişinin cilt tipi, tüy yapısı ve hormon dengesi gibi faktörlere göre bu sayı değişebilir.",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "Yan etkisi var mı?",
          answer:
            "FDA onaylı cihazımız ile uygulanan lazer epilasyonun ciddi bir yan etkisi yoktur. Geçici kızarıklık veya hassasiyet yaşanabilir ancak bunlar kısa sürede geçer.",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "Tüm cilt tiplerine uygun mu?",
          answer:
            "Evet, Alma Soprano Ice Platinum 3 farklı dalga boyu ile tüm cilt tiplerine (Fitzpatrick I-VI) güvenle uygulanabilir.",
          order: 4,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "İşlem ne kadar sürer?",
          answer:
            "Bölgeye göre değişir. Örneğin koltuk altı 10-15 dakika, tam bacak 30-40 dakika sürebilir.",
          order: 5,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "tr",
          question: "Seanslar arası ne kadar süre olmalı?",
          answer:
            "Yüz bölgesi için 4-6 hafta, vücut için 6-8 hafta aralarla seanslar planlanır.",
          order: 6,
          active: true,
        },
      ],
    });

    // EN FAQs
    await prisma.procedureFAQ.createMany({
      data: [
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "Is laser hair removal painful?",
          answer:
            "Thanks to the Ice Platinum cooling technology of Alma Soprano Ice Platinum, the procedure is almost painless. You won't experience any discomfort except a slight warming sensation.",
          order: 1,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "How many sessions are needed?",
          answer:
            "Usually 6-8 sessions are recommended. However, this number may vary depending on factors such as skin type, hair structure and hormonal balance.",
          order: 2,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "Are there any side effects?",
          answer:
            "Laser hair removal performed with our FDA-approved device has no serious side effects. Temporary redness or sensitivity may occur but these pass quickly.",
          order: 3,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "Is it suitable for all skin types?",
          answer:
            "Yes, Alma Soprano Ice Platinum can be safely applied to all skin types (Fitzpatrick I-VI) with 3 different wavelengths.",
          order: 4,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "How long does the procedure take?",
          answer:
            "It varies by area. For example, underarms take 10-15 minutes, full legs take 30-40 minutes.",
          order: 5,
          active: true,
        },
        {
          pageSlug: "lazer-epilasyon",
          locale: "en",
          question: "How long should be between sessions?",
          answer:
            "Sessions are planned 4-6 weeks apart for face area, 6-8 weeks apart for body.",
          order: 6,
          active: true,
        },
      ],
    });
  }

  // ========================================
  // PROCEDURE PAGES - LAZER EPILASYON
  // ========================================

  // ========================================
  // PROCEDURE PAGES - LAZER EPİLASYON
  // ========================================

  const existingLazerEpilasyonPageTR = await prisma.procedurePage.findFirst({
    where: { slug: "lazer-epilasyon", locale: "tr" },
  });

  const existingLazerEpilasyonPageEN = await prisma.procedurePage.findFirst({
    where: { slug: "lazer-epilasyon", locale: "en" },
  });

  if (!existingLazerEpilasyonPageTR || !existingLazerEpilasyonPageEN) {
    console.log("🔄 Seeding lazer epilasyon page...");

    // TR Page
    if (!existingLazerEpilasyonPageTR) {
      await prisma.procedurePage.create({
        data: {
          slug: "lazer-epilasyon",
          locale: "tr",
          heroTitle: "Lazer Epilasyon",
          heroTitleHighlight: "ile Kalıcı Çözüm",
          heroDescription:
            "Son teknoloji Soprano Ice Platinum cihazı ile ağrısız ve etkili lazer epilasyon. Tüm cilt tiplerine uygun, FDA onaylı güvenli uygulama.",
          heroButtonReviews: "Google Yorumlarımız",
          heroButtonPhone: "Hemen Ara",
          heroImage: "/images/lazer-epilasyon.jpg",
          heroImageAlt: "Lazer Epilasyon",
          deviceTitle: "Soprano Ice Platinum",
          deviceDescription:
            "Alma Lasers'ın en gelişmiş lazer epilasyon cihazı. 3 farklı dalga boyu (Alex, Diode, Nd:Yag) ile tüm cilt tiplerine ve tüy kalınlıklarına etkili çözüm sunar.",
          deviceFeaturesTitle: "Cihaz Özellikleri",
          deviceAdvantagesTitle: "Avantajlar",
          pricingTitle: "Lazer Epilasyon Fiyatları",
          pricingDescription:
            "Tüm bölgeler için özel paketlerimiz ve kampanyalarımız mevcuttur. Taksit imkanları için bizimle iletişime geçin.",
          pricingCallText: "Fiyat için arayın",
          whyUsTitle: "Neden Veneta Clinic?",
          faqTitle: "Sıkça Sorulan Sorular",
          ctaTitle: "Ücretsiz Cilt Analizi İçin Hemen İletişime Geçin",
          ctaDescription:
            "Uzman kadromuz size en uygun lazer epilasyon planını oluşturmak için hazır. Randevunuz için bizi arayın.",
          ctaButtonPhone: "Hemen Ara",
          ctaButtonWhatsApp: "WhatsApp",
          active: true,
        },
      });
    }

    // EN Page
    if (!existingLazerEpilasyonPageEN) {
      await prisma.procedurePage.create({
        data: {
          slug: "lazer-epilasyon",
          locale: "en",
          heroTitle: "Laser Hair Removal",
          heroTitleHighlight: "Permanent Solution",
          heroDescription:
            "Painless and effective laser hair removal with the latest Soprano Ice Platinum device. FDA-approved safe application suitable for all skin types.",
          heroButtonReviews: "Our Google Reviews",
          heroButtonPhone: "Call Now",
          heroImage: "/images/lazer-epilasyon.jpg",
          heroImageAlt: "Laser Hair Removal",
          deviceTitle: "Soprano Ice Platinum",
          deviceDescription:
            "Alma Lasers' most advanced laser hair removal device. Offers effective solutions for all skin types and hair thicknesses with 3 different wavelengths (Alex, Diode, Nd:Yag).",
          deviceFeaturesTitle: "Device Features",
          deviceAdvantagesTitle: "Advantages",
          pricingTitle: "Laser Hair Removal Prices",
          pricingDescription:
            "We have special packages and campaigns for all areas. Contact us for installment options.",
          pricingCallText: "Call for price",
          whyUsTitle: "Why Veneta Clinic?",
          faqTitle: "Frequently Asked Questions",
          ctaTitle: "Contact Us Now for Free Skin Analysis",
          ctaDescription:
            "Our expert team is ready to create the most suitable laser hair removal plan for you. Call us for your appointment.",
          ctaButtonPhone: "Call Now",
          ctaButtonWhatsApp: "WhatsApp",
          active: true,
        },
      });
    }

    // Features kontrolü
    const existingFeatures = await prisma.procedureFeature.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingFeatures === 0) {
      // TR Features
      await prisma.procedureFeature.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "zap",
            title: "Ağrısız Uygulama",
            description: "SHR teknolojisi ile konforlu seans",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "clock",
            title: "Hızlı Sonuç",
            description: "6-8 seansta kalıcı sonuç",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "shield",
            title: "Güvenli",
            description: "FDA onaylı cihaz",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "star",
            title: "Tüm Cilt Tipleri",
            description: "Her cilt tonuna uygun",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Features
      await prisma.procedureFeature.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "zap",
            title: "Painless Application",
            description: "Comfortable sessions with SHR technology",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "clock",
            title: "Fast Results",
            description: "Permanent results in 6-8 sessions",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "shield",
            title: "Safe",
            description: "FDA-approved device",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "star",
            title: "All Skin Types",
            description: "Suitable for every skin tone",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Device Items kontrolü
    const existingDeviceItems = await prisma.procedureDeviceItem.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingDeviceItems === 0) {
      // TR Device Features
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "feature",
            text: "3 farklı dalga boyu (755nm Alex, 810nm Diode, 1064nm Nd:Yag)",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "feature",
            text: "SHR (Super Hair Removal) teknolojisi",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "feature",
            text: "Soğutma sistemi ile cilt koruması",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "feature",
            text: "12mm x 35mm geniş uygulama başlığı",
            order: 4,
            active: true,
          },
        ],
      });

      // TR Device Advantages
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "advantage",
            text: "Tüm cilt tiplerine uygun (1-6 arası)",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "advantage",
            text: "İnce ve kalın tüylerde etkili",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "advantage",
            text: "Yan etki riski minimal",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            type: "advantage",
            text: "Yazın da uygulanabilir",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Device Features
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "feature",
            text: "3 different wavelengths (755nm Alex, 810nm Diode, 1064nm Nd:Yag)",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "feature",
            text: "SHR (Super Hair Removal) technology",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "feature",
            text: "Skin protection with cooling system",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "feature",
            text: "12mm x 35mm large application head",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Device Advantages
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "advantage",
            text: "Suitable for all skin types (1-6)",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "advantage",
            text: "Effective on fine and thick hair",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "advantage",
            text: "Minimal side effect risk",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            type: "advantage",
            text: "Can be applied in summer",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Treatment Areas kontrolü
    const existingAreas = await prisma.procedureTreatmentArea.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingAreas === 0) {
      // TR Treatment Areas
      await prisma.procedureTreatmentArea.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Yüz Bölgesi",
            description: "Üst dudak, çene, yanaklar, alın",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Vücut",
            description: "Kol, bacak, sırt, göğüs, karın",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Bikini Bölgesi",
            description: "Klasik, Brazilian, Hollywood",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Hassas Bölgeler",
            description: "Koltuk altı, genital bölge",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Treatment Areas
      await prisma.procedureTreatmentArea.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Facial Area",
            description: "Upper lip, chin, cheeks, forehead",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Body",
            description: "Arms, legs, back, chest, abdomen",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Bikini Area",
            description: "Classic, Brazilian, Hollywood",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Sensitive Areas",
            description: "Underarms, genital area",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Pricing kontrolü
    const existingPricing = await prisma.procedurePricing.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingPricing === 0) {
      // TR Pricing
      await prisma.procedurePricing.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Tam Bacak",
            description: "6-8 seans paketi",
            priceText: "2.500 TL",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Tam Kol",
            description: "6-8 seans paketi",
            priceText: "1.800 TL",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Brazilian",
            description: "6-8 seans paketi",
            priceText: "1.200 TL",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            title: "Koltuk Altı",
            description: "6-8 seans paketi",
            priceText: "800 TL",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Pricing
      await prisma.procedurePricing.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Full Legs",
            description: "6-8 session package",
            priceText: "€100",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Full Arms",
            description: "6-8 session package",
            priceText: "€75",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Brazilian",
            description: "6-8 session package",
            priceText: "€50",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            title: "Underarms",
            description: "6-8 session package",
            priceText: "€35",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Why Us kontrolü
    const existingWhyUs = await prisma.procedureWhyUs.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingWhyUs === 0) {
      // TR Why Us
      await prisma.procedureWhyUs.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "award",
            title: "15+ Yıl Deneyim",
            description: "Lazer epilasyon alanında uzman kadro",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "shield",
            title: "FDA Onaylı Cihaz",
            description: "Soprano Ice Platinum güvenliği",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "users",
            title: "10,000+ Mutlu Müşteri",
            description: "Yüksek memnuniyet oranı",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            icon: "heart",
            title: "Kişiye Özel Plan",
            description: "Cilt tipinize uygun uygulama",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Why Us
      await prisma.procedureWhyUs.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "award",
            title: "15+ Years Experience",
            description: "Expert team in laser hair removal",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "shield",
            title: "FDA Approved Device",
            description: "Soprano Ice Platinum safety",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "users",
            title: "10,000+ Happy Customers",
            description: "High satisfaction rate",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            icon: "heart",
            title: "Personalized Plan",
            description: "Application suitable for your skin type",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // FAQ kontrolü
    const existingFAQs = await prisma.procedureFAQ.count({
      where: { pageSlug: "lazer-epilasyon" },
    });

    if (existingFAQs === 0) {
      // TR FAQs
      await prisma.procedureFAQ.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Lazer epilasyon ağrılı mı?",
            answer:
              "Soprano Ice Platinum'un SHR teknolojisi sayesinde işlem neredeyse ağrısızdır. Sadece hafif bir ısınma hissi yaşanır.",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Kaç seans gerekir?",
            answer:
              "Ortalama 6-8 seans yeterlidir. Ancak kişinin tüy yapısı, cilt tipi ve uygulama bölgesine göre değişebilir.",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Yan etkisi var mı?",
            answer:
              "Geçici hafif kızarıklık dışında yan etki görülmez. Soğutma sistemi cilt sağlığını korur.",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Yazın yapılabilir mi?",
            answer:
              "Evet, Soprano Ice Platinum tüm mevsimlerde güvenle uygulanabilir. Güneş sonrası 2 hafta beklenmesi yeterlidir.",
            order: 4,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Kalıcı mı?",
            answer:
              "Evet, tamamlanan seans sonunda tüy folikülleri tamamen devre dışı kalır ve kalıcı sonuç elde edilir.",
            order: 5,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "tr",
            question: "Tüm cilt tiplerine uygun mu?",
            answer:
              "Evet, 3 farklı dalga boyu sayesinde Fitzpatrick 1-6 arası tüm cilt tiplerine güvenle uygulanabilir.",
            order: 6,
            active: true,
          },
        ],
      });

      // EN FAQs
      await prisma.procedureFAQ.createMany({
        data: [
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "Is laser hair removal painful?",
            answer:
              "Thanks to Soprano Ice Platinum's SHR technology, the procedure is almost painless. Only a slight warming sensation is felt.",
            order: 1,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "How many sessions are needed?",
            answer:
              "An average of 6-8 sessions is sufficient. However, it may vary depending on the person's hair structure, skin type and application area.",
            order: 2,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "Are there any side effects?",
            answer:
              "No side effects are observed except temporary mild redness. The cooling system protects skin health.",
            order: 3,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "Can it be done in summer?",
            answer:
              "Yes, Soprano Ice Platinum can be safely applied in all seasons. It is sufficient to wait 2 weeks after sun exposure.",
            order: 4,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "Is it permanent?",
            answer:
              "Yes, at the end of completed sessions, hair follicles are completely disabled and permanent results are obtained.",
            order: 5,
            active: true,
          },
          {
            pageSlug: "lazer-epilasyon",
            locale: "en",
            question: "Is it suitable for all skin types?",
            answer:
              "Yes, thanks to 3 different wavelengths, it can be safely applied to all skin types between Fitzpatrick 1-6.",
            order: 6,
            active: true,
          },
        ],
      });
    }

    console.log("✅ Lazer epilasyon page created (TR & EN)!");
  }

  // ========================================
  // PROCEDURE PAGES - SAÇ EKİMİ
  // ========================================

  const existingSacEkimiPageTR = await prisma.procedurePage.findFirst({
    where: { slug: "sac-ekimi", locale: "tr" },
  });

  const existingSacEkimiPageEN = await prisma.procedurePage.findFirst({
    where: { slug: "sac-ekimi", locale: "en" },
  });

  if (!existingSacEkimiPageTR || !existingSacEkimiPageEN) {
    console.log("🔄 Seeding sac ekimi page...");

    // TR Page
    if (!existingSacEkimiPageTR) {
      await prisma.procedurePage.create({
        data: {
          slug: "sac-ekimi",
          locale: "tr",
          heroTitle: "Doğal Saçlarınıza",
          heroTitleHighlight: "Kavuşun - FUE Tekniği ile",
          heroDescription:
            "En son FUE (Follicular Unit Extraction) tekniği ile doğal görünümlü, kalıcı saç ekimi. Uzman ekibimiz ve ileri teknolojimizle size en iyi sonuçları sunuyoruz.",
          heroButtonReviews: "Google Yorumlarımız",
          heroButtonPhone: "Hemen Ara",
          heroImage: "/images/hair-transplant.jpg",
          heroImageAlt: "FUE Saç Ekimi",
          deviceTitle: "FUE Tekniği",
          deviceDescription:
            "Follicular Unit Extraction (FUE), saç köklerinin tek tek alınarak nakledildiği modern saç ekimi yöntemidir. İz bırakmaz ve doğal sonuçlar verir.",
          deviceFeaturesTitle: "Teknik Özellikler",
          deviceAdvantagesTitle: "Avantajlar",
          pricingTitle: "Saç Ekimi Paketleri",
          pricingDescription:
            "Size özel paketlerimiz için bizimle iletişime geçin. Taksit imkanlarımız mevcuttur.",
          pricingCallText: "Fiyat için arayın",
          whyUsTitle: "Neden Bizi Tercih Etmelisiniz?",
          faqTitle: "Sıkça Sorulan Sorular",
          ctaTitle: "Ücretsiz Saç Analizi İçin Hemen İletişime Geçin",
          ctaDescription:
            "Uzman ekibimiz size en uygun saç ekimi planını oluşturmak için hazır. Randevunuz için bizi arayın.",
          ctaButtonPhone: "Hemen Ara",
          ctaButtonWhatsApp: "WhatsApp",
          active: true,
        },
      });
    }

    // EN Page
    if (!existingSacEkimiPageEN) {
      await prisma.procedurePage.create({
        data: {
          slug: "sac-ekimi",
          locale: "en",
          heroTitle: "Get Your",
          heroTitleHighlight: "Natural Hair Back - FUE Technique",
          heroDescription:
            "Natural-looking, permanent hair transplant with the latest FUE (Follicular Unit Extraction) technique. We offer you the best results with our expert team and advanced technology.",
          heroButtonReviews: "Our Google Reviews",
          heroButtonPhone: "Call Now",
          heroImage: "/images/hair-transplant.jpg",
          heroImageAlt: "FUE Hair Transplant",
          deviceTitle: "FUE Technique",
          deviceDescription:
            "Follicular Unit Extraction (FUE) is a modern hair transplant method where hair follicles are extracted and transplanted individually. It leaves no scars and gives natural results.",
          deviceFeaturesTitle: "Technical Features",
          deviceAdvantagesTitle: "Advantages",
          pricingTitle: "Hair Transplant Packages",
          pricingDescription:
            "Contact us for our special packages. Installment options available.",
          pricingCallText: "Call for price",
          whyUsTitle: "Why Choose Us?",
          faqTitle: "Frequently Asked Questions",
          ctaTitle: "Contact Us Now for Free Hair Analysis",
          ctaDescription:
            "Our expert team is ready to create the most suitable hair transplant plan for you. Call us for your appointment.",
          ctaButtonPhone: "Call Now",
          ctaButtonWhatsApp: "WhatsApp",
          active: true,
        },
      });
    }

    // Features kontrolü
    const existingFeatures = await prisma.procedureFeature.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingFeatures === 0) {
      // TR Features
      await prisma.procedureFeature.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "scissors",
            title: "FUE Tekniği",
            description: "İz bırakmayan modern saç ekimi yöntemi",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "users",
            title: "Uzman Kadro",
            description: "Deneyimli doktorlar ve sertifikalı ekip",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "check-circle",
            title: "Doğal Sonuç",
            description: "Kalıcı ve doğal görünümlü saçlar",
            order: 3,
            active: true,
          },
        ],
      });

      // EN Features
      await prisma.procedureFeature.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "scissors",
            title: "FUE Technique",
            description: "Modern hair transplant method with no scars",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "users",
            title: "Expert Team",
            description: "Experienced doctors and certified team",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "check-circle",
            title: "Natural Results",
            description: "Permanent and natural-looking hair",
            order: 3,
            active: true,
          },
        ],
      });
    }

    // Device Items kontrolü
    const existingDeviceItems = await prisma.procedureDeviceItem.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingDeviceItems === 0) {
      // TR Device Features
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "feature",
            text: "Mikromotor tekniği ile hassas ekstraksiyon",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "feature",
            text: "0.6-0.8mm punch çapı ile minimal travma",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "feature",
            text: "Lokal anestezi ile ağrısız işlem",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "feature",
            text: "Doğal saç çıkış açısı ve yönü korunur",
            order: 4,
            active: true,
          },
        ],
      });

      // TR Device Advantages
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "advantage",
            text: "İz ve skar bırakmaz",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "advantage",
            text: "Hızlı iyileşme süresi (7-10 gün)",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "advantage",
            text: "%95-98 tutunma oranı",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            type: "advantage",
            text: "Doğal ve kalıcı sonuçlar",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Device Features
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "feature",
            text: "Precise extraction with micromotor technique",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "feature",
            text: "Minimal trauma with 0.6-0.8mm punch diameter",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "feature",
            text: "Painless procedure with local anesthesia",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "feature",
            text: "Natural hair angle and direction preserved",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Device Advantages
      await prisma.procedureDeviceItem.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "advantage",
            text: "No scars or marks",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "advantage",
            text: "Fast recovery time (7-10 days)",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "advantage",
            text: "95-98% graft survival rate",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            type: "advantage",
            text: "Natural and permanent results",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Treatment Areas kontrolü
    const existingAreas = await prisma.procedureTreatmentArea.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingAreas === 0) {
      // TR Treatment Areas
      await prisma.procedureTreatmentArea.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Saç Çizgisi",
            description: "Ön saç hattı düzenleme ve dolgu",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Tepe Bölgesi",
            description: "Vertex bölge yoğunlaştırma",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Sakal Ekimi",
            description: "Sakal ve bıyık bölgesi",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Kaş Ekimi",
            description: "Kaş yoğunlaştırma ve şekillendirme",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Treatment Areas
      await prisma.procedureTreatmentArea.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Hairline",
            description: "Front hairline design and filling",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Crown Area",
            description: "Vertex area densification",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Beard Transplant",
            description: "Beard and mustache area",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Eyebrow Transplant",
            description: "Eyebrow densification and shaping",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // Pricing kontrolü
    const existingPricing = await prisma.procedurePricing.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingPricing === 0) {
      // TR Pricing
      await prisma.procedurePricing.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Standart Paket",
            description: "2000-3000 greft",
            priceText: "Fiyat için arayın",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "Premium Paket",
            description: "3000-4000 greft",
            priceText: "Fiyat için arayın",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            title: "VIP Paket",
            description: "4000+ greft",
            priceText: "Fiyat için arayın",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
        ],
      });

      // EN Pricing
      await prisma.procedurePricing.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Standard Package",
            description: "2000-3000 grafts",
            priceText: "Call for price",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "Premium Package",
            description: "3000-4000 grafts",
            priceText: "Call for price",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            title: "VIP Package",
            description: "4000+ grafts",
            priceText: "Call for price",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
        ],
      });
    }

    // Why Us kontrolü
    const existingWhyUs = await prisma.procedureWhyUs.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingWhyUs === 0) {
      // TR Why Us
      await prisma.procedureWhyUs.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "heart",
            title: "Müşteri Memnuniyeti",
            description: "Binlerce mutlu hastamız",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "scissors",
            title: "FUE Uzmanı",
            description: "10+ yıl FUE deneyimi",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "shield",
            title: "Garanti",
            description: "Tutunma garantisi",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            icon: "clock",
            title: "7/24 Destek",
            description: "Operasyon sonrası takip",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });

      // EN Why Us
      await prisma.procedureWhyUs.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "heart",
            title: "Customer Satisfaction",
            description: "Thousands of happy patients",
            colorScheme: "primary",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "scissors",
            title: "FUE Expert",
            description: "10+ years FUE experience",
            colorScheme: "secondary",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "shield",
            title: "Guarantee",
            description: "Graft survival guarantee",
            colorScheme: "accent",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            icon: "clock",
            title: "24/7 Support",
            description: "Post-operative follow-up",
            colorScheme: "destructive",
            order: 4,
            active: true,
          },
        ],
      });
    }

    // FAQ kontrolü
    const existingFAQs = await prisma.procedureFAQ.count({
      where: { pageSlug: "sac-ekimi" },
    });

    if (existingFAQs === 0) {
      // TR FAQs
      await prisma.procedureFAQ.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "Saç ekimi ağrılı mı?",
            answer:
              "Lokal anestezi ile yapıldığı için işlem ağrısızdır. Sadece anestezi sırasında hafif bir batma hissi yaşanır.",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "Ne kadar sürer?",
            answer:
              "Ekilecek greft sayısına göre 6-8 saat arasında değişir. İşlem tek seansta tamamlanır.",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "İyileşme süreci nasıl?",
            answer:
              "İlk 7-10 gün kabuklanma olur. 3. aydan itibaren saçlar çıkmaya başlar, 12. ayda nihai sonuç alınır.",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "FUE kalıcı mı?",
            answer:
              "Evet, nakledilen saçlar ömür boyu kalıcıdır. Donör bölgeden alınan saçlar dökülmeye dirençlidir.",
            order: 4,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "Kimler yaptırabilir?",
            answer:
              "18 yaş üstü, yeterli donör bölgesi olan ve sağlık durumu uygun herkes yaptırabilir.",
            order: 5,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "tr",
            question: "İz kalır mı?",
            answer:
              "FUE tekniğinde iz kalmaz. Sadece çok küçük nokta şeklinde izler olur ve saç uzadığında görünmez.",
            order: 6,
            active: true,
          },
        ],
      });

      // EN FAQs
      await prisma.procedureFAQ.createMany({
        data: [
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "Is hair transplant painful?",
            answer:
              "The procedure is painless as it is performed under local anesthesia. Only a slight stinging sensation is felt during anesthesia.",
            order: 1,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "How long does it take?",
            answer:
              "It varies between 6-8 hours depending on the number of grafts to be transplanted. The procedure is completed in one session.",
            order: 2,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "What is the recovery process like?",
            answer:
              "Crusting occurs in the first 7-10 days. Hair starts growing from the 3rd month, final result is obtained in 12 months.",
            order: 3,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "Is FUE permanent?",
            answer:
              "Yes, transplanted hair is permanent for life. Hair taken from the donor area is resistant to shedding.",
            order: 4,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "Who can get it?",
            answer:
              "Anyone over 18 years old with sufficient donor area and suitable health condition can get it.",
            order: 5,
            active: true,
          },
          {
            pageSlug: "sac-ekimi",
            locale: "en",
            question: "Will there be scars?",
            answer:
              "There are no scars with FUE technique. Only very small dot-shaped marks remain and are invisible when hair grows.",
            order: 6,
            active: true,
          },
        ],
      });
    }

    console.log("✅ Sac ekimi page created (TR & EN)!");
  }

  // About Section kontrolü
  const existingAboutSection = await prisma.procedureAboutSection.count({
    where: { pageSlug: "ameliyatli-estetik" },
  });

  if (existingAboutSection === 0) {
    // TR About Section
    await prisma.procedureAboutSection.create({
      data: {
        pageSlug: "ameliyatli-estetik",
        locale: "tr",
        title: "Ameliyatlı Estetik Hakkında",
        description:
          "Ameliyatlı estetik operasyonlar, yüz ve vücut hatlarınızı yeniden şekillendirerek size daha genç, dinç ve özgüvenli bir görünüm kazandırır. Uzman cerrahlarımız, modern teknikler ve ileri teknoloji kullanarak doğal ve kalıcı sonuçlar elde etmenizi sağlar.",
        areasTitle: "Uygulama Alanları",
        advantagesTitle: "Avantajlar",
      },
    });

    // EN About Section
    await prisma.procedureAboutSection.create({
      data: {
        pageSlug: "ameliyatli-estetik",
        locale: "en",
        title: "About Surgical Aesthetics",
        description:
          "Surgical aesthetic operations reshape your face and body lines, giving you a younger, more vibrant and confident appearance. Our expert surgeons help you achieve natural and permanent results using modern techniques and advanced technology.",
        areasTitle: "Application Areas",
        advantagesTitle: "Advantages",
      },
    });

    // TR About Areas
    await prisma.procedureAboutArea.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Yüz Estetiği (Burun, Göz Kapağı, Yüz Germe)",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Vücut Estetiği (Karın Germe, Liposuction)",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Meme Estetiği (Büyütme, Küçültme, Dikleştirme)",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Kalça ve Bacak Estetiği",
          order: 4,
          active: true,
        },
      ],
    });

    // EN About Areas
    await prisma.procedureAboutArea.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Facial Aesthetics (Nose, Eyelid, Face Lift)",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Body Aesthetics (Tummy Tuck, Liposuction)",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Breast Aesthetics (Augmentation, Reduction, Lift)",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Hip and Leg Aesthetics",
          order: 4,
          active: true,
        },
      ],
    });

    // TR About Advantages
    await prisma.procedureAboutAdvantage.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Kalıcı ve doğal sonuçlar",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Deneyimli ve uzman cerrahlar",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Modern ameliyathane ve teknoloji",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          text: "Kapsamlı ameliyat sonrası takip",
          order: 4,
          active: true,
        },
      ],
    });

    // EN About Advantages
    await prisma.procedureAboutAdvantage.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Permanent and natural results",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Experienced and expert surgeons",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Modern operating room and technology",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          text: "Comprehensive post-operative follow-up",
          order: 4,
          active: true,
        },
      ],
    });
  }

  // Process Steps kontrolü
  const existingProcess = await prisma.procedureProcess.count({
    where: { pageSlug: "ameliyatli-estetik" },
  });

  if (existingProcess === 0) {
    // TR Process Steps
    await prisma.procedureProcess.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          number: "1",
          title: "Konsültasyon",
          description:
            "İlk görüşmemizde beklentilerinizi dinliyor, size özel tedavi planı oluşturuyoruz. Tüm sorularınızı yanıtlıyor ve süreci detaylı olarak anlatıyoruz.",
          bgColor: "bg-primary/20",
          textColor: "text-primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          number: "2",
          title: "Operasyon",
          description:
            "Deneyimli cerrahlarımız, modern ameliyathanelerimizde son teknoloji ekipmanlarla operasyonunuzu gerçekleştirir. Güvenliğiniz bizim önceliğimizdir.",
          bgColor: "bg-secondary/20",
          textColor: "text-secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          number: "3",
          title: "İyileşme",
          description:
            "Operasyon sonrası iyileşme sürecinizde yanınızdayız. Düzenli kontroller ve 7/24 destek ekibimizle size rehberlik ediyoruz.",
          bgColor: "bg-accent/20",
          textColor: "text-accent",
          order: 3,
          active: true,
        },
      ],
    });

    // EN Process Steps
    await prisma.procedureProcess.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          number: "1",
          title: "Consultation",
          description:
            "In our first meeting, we listen to your expectations and create a treatment plan specific to you. We answer all your questions and explain the process in detail.",
          bgColor: "bg-primary/20",
          textColor: "text-primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          number: "2",
          title: "Operation",
          description:
            "Our experienced surgeons perform your operation with state-of-the-art equipment in our modern operating rooms. Your safety is our priority.",
          bgColor: "bg-secondary/20",
          textColor: "text-secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          number: "3",
          title: "Recovery",
          description:
            "We are with you during your post-operative recovery process. We guide you with regular checks and our 24/7 support team.",
          bgColor: "bg-accent/20",
          textColor: "text-accent",
          order: 3,
          active: true,
        },
      ],
    });
  }

  // Why Us kontrolü
  const existingWhyUsSurgery = await prisma.procedureWhyUs.count({
    where: { pageSlug: "ameliyatli-estetik" },
  });

  if (existingWhyUsSurgery === 0) {
    // TR Why Us
    await prisma.procedureWhyUs.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          icon: "user-check",
          title: "Uzman Kadro",
          description:
            "15+ yıl deneyimli plastik cerrahlar ve anestezi uzmanları",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          icon: "shield-check",
          title: "Güvenli Ortam",
          description: "JCI akreditasyonlu ameliyathane standartları",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          icon: "heart",
          title: "Doğal Sonuç",
          description: "Kişiye özel, doğal ve estetik sonuçlar",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          icon: "headphones",
          title: "7/24 Destek",
          description: "Ameliyat öncesi ve sonrası kesintisiz destek",
          colorScheme: "destructive",
          order: 4,
          active: true,
        },
      ],
    });

    // EN Why Us
    await prisma.procedureWhyUs.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          icon: "user-check",
          title: "Expert Team",
          description:
            "Plastic surgeons and anesthesiologists with 15+ years experience",
          colorScheme: "primary",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          icon: "shield-check",
          title: "Safe Environment",
          description: "JCI accredited operating room standards",
          colorScheme: "secondary",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          icon: "heart",
          title: "Natural Results",
          description: "Personalized, natural and aesthetic results",
          colorScheme: "accent",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          icon: "headphones",
          title: "24/7 Support",
          description: "Uninterrupted support before and after surgery",
          colorScheme: "destructive",
          order: 4,
          active: true,
        },
      ],
    });
  }

  // FAQ kontrolü
  const existingFAQsSurgery = await prisma.procedureFAQ.count({
    where: { pageSlug: "ameliyatli-estetik" },
  });

  if (existingFAQsSurgery === 0) {
    // TR FAQs
    await prisma.procedureFAQ.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          question: "Ameliyatlı estetik operasyonlar güvenli mi?",
          answer:
            "Evet, deneyimli cerrahlarımız ve modern ameliyathane standartlarımızla tüm operasyonlar güvenli bir şekilde gerçekleştirilir. JCI akreditasyonlu hastane standartlarına uygun çalışıyoruz.",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          question: "İyileşme süreci ne kadar sürer?",
          answer:
            "Operasyon türüne göre değişir. Genellikle 1-2 hafta içinde günlük aktivitelere dönebilirsiniz. Tam iyileşme 3-6 ay içinde tamamlanır.",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          question: "Sonuçlar kalıcı mı?",
          answer:
            "Evet, ameliyatlı estetik operasyonların sonuçları kalıcıdır. Ancak doğal yaşlanma süreci devam eder. Sağlıklı yaşam tarzı ile sonuçlarınızı uzun yıllar koruyabilirsiniz.",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          question: "Hangi yaşta yaptırılabilir?",
          answer:
            "Genellikle 18 yaş ve üzeri kişiler yaptırabilir. Ancak her operasyon için özel değerlendirme yapılır ve uygunluk kontrolü gerçekleştirilir.",
          order: 4,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "tr",
          question: "Ameliyat sonrası takip nasıl olur?",
          answer:
            "Düzenli kontroller ve 7/24 destek hattımızla tüm süreç boyunca yanınızdayız. İlk kontrol 1 hafta sonra, sonraki kontroller doktorunuzun önerisi doğrultusunda yapılır.",
          order: 5,
          active: true,
        },
      ],
    });

    // EN FAQs
    await prisma.procedureFAQ.createMany({
      data: [
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          question: "Are surgical aesthetic operations safe?",
          answer:
            "Yes, all operations are performed safely with our experienced surgeons and modern operating room standards. We work in accordance with JCI accredited hospital standards.",
          order: 1,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          question: "How long does the recovery process take?",
          answer:
            "It varies depending on the type of operation. Usually you can return to daily activities within 1-2 weeks. Full recovery is completed within 3-6 months.",
          order: 2,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          question: "Are the results permanent?",
          answer:
            "Yes, the results of surgical aesthetic operations are permanent. However, the natural aging process continues. You can maintain your results for many years with a healthy lifestyle.",
          order: 3,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          question: "At what age can it be done?",
          answer:
            "Usually people aged 18 and over can have it done. However, special evaluation is made for each operation and suitability check is performed.",
          order: 4,
          active: true,
        },
        {
          pageSlug: "ameliyatli-estetik",
          locale: "en",
          question: "What is the post-operative follow-up like?",
          answer:
            "We are with you throughout the process with regular checks and our 24/7 support line. First check is after 1 week, subsequent checks are made according to your doctor's recommendation.",
          order: 5,
          active: true,
        },
      ],
    });
  }

  console.log("✅ Ameliyatlı estetik page created (TR & EN)!");

  await seedSurgicalCategories();

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
