// prisma/seeds/06-blog.seed.ts
// ============================================
// SEED: BLOG POSTS
// ============================================

import { PrismaClient } from "@prisma/client";

export async function seedBlog(prisma: PrismaClient) {
  console.log("🔄 Seeding blog posts...");

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
  }

  console.log("✅ Blog posts seeded!");
}
