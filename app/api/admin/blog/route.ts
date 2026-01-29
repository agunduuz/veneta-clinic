// app/api/admin/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - List all blog posts (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const blogPosts = await prisma.blogPost.findMany({
      where: { locale },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error("Blog admin GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      locale,
      slug,
      title,
      excerpt,
      content,
      imageUrl,
      category,
      author,
      readTime,
      metaTitle,
      metaDescription,
      metaKeywords,
      published,
      order,
    } = body;

    if (!locale || !slug || !title || !excerpt || !imageUrl) {
      return NextResponse.json(
        { error: "Locale, slug, title, excerpt, and imageUrl are required" },
        { status: 400 },
      );
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        locale,
        slug,
        title,
        excerpt,
        content: content || null,
        imageUrl,
        category: category || null,
        author: author || null,
        readTime: readTime || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        published: published ?? false,
        order: order || 0,
      },
    });

    return NextResponse.json(blogPost, { status: 201 });
  } catch (error) {
    console.error("Blog admin POST error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
