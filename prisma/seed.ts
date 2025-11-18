// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
