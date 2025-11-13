import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Slug'a göre tek blog yazısını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const blogPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        locale,
        published: true,
      },
    });

    if (!blogPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogPost);
  } catch (error: any) {
    console.error("❌ Blog Detail API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post", details: error.message },
      { status: 500 }
    );
  }
}
