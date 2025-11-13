import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Son 3 blog yazısını getir (anasayfa için)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const blogPosts = await prisma.blogPost.findMany({
      where: {
        locale,
        published: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3, // Son 3 blog
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        category: true,
        author: true,
        readTime: true,
        createdAt: true,
      },
    });

    return NextResponse.json(blogPosts);
  } catch (error: any) {
    console.error("❌ Blog API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts", details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Blog yazılarını toplu güncelle (admin için)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogPosts, locale = "tr" } = body;

    if (!Array.isArray(blogPosts)) {
      return NextResponse.json(
        { error: "Invalid request body - blogPosts must be an array" },
        { status: 400 }
      );
    }

    // Her blog'u güncelle
    const updatePromises = blogPosts.map((post: any) =>
      prisma.blogPost.update({
        where: { id: post.id },
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          imageUrl: post.imageUrl,
          category: post.category,
          author: post.author,
          readTime: post.readTime,
          published: post.published,
          order: post.order,
        },
      })
    );

    const updatedPosts = await Promise.all(updatePromises);

    return NextResponse.json(updatedPosts);
  } catch (error: any) {
    console.error("❌ Blog Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update blog posts", details: error.message },
      { status: 500 }
    );
  }
}
