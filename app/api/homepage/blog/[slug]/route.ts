// app/api/homepage/blog/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    // 👇 Next.js 15'te params bir Promise, o yüzden await gerekiyor
    const { slug } = await params;

    const blogPost = await prisma.blogPost.findFirst({
      where: { slug, locale, published: true },
    });

    if (!blogPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("❌ Blog Detail API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
