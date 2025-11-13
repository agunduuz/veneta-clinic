// app/api/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";
    const category = searchParams.get("category");

    const where: {
      locale: string;
      published: boolean;
      category?: string;
    } = {
      locale,
      published: true,
    };

    if (category && category !== "all") {
      where.category = category;
    }

    const blogPosts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
    console.error("❌ Blog List API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
