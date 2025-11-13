// app/api/homepage/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const blogPosts = await prisma.blogPost.findMany({
      where: { locale, published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
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
  } catch (error) {
    console.error("❌ Blog API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogPosts } = body; // locale removed

    if (!Array.isArray(blogPosts)) {
      return NextResponse.json(
        { error: "Invalid request body - blogPosts must be an array" },
        { status: 400 }
      );
    }

    const updatePromises = blogPosts.map(
      (post: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content?: string | null;
        imageUrl: string;
        category?: string | null;
        author?: string | null;
        readTime?: string | null;
        published: boolean;
        order: number;
      }) =>
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
  } catch (error) {
    console.error("❌ Blog Update Error:", error);
    return NextResponse.json(
      {
        error: "Failed to update blog posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
