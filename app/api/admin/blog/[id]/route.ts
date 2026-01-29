// app/api/admin/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blogPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("Blog admin GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content || null,
        imageUrl: body.imageUrl,
        category: body.category || null,
        author: body.author || null,
        readTime: body.readTime || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || null,
        published: body.published ?? false,
        order: body.order || 0,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Blog admin PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog admin DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
