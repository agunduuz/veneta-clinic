// app/api/admin/page-subcategories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single subcategory by ID
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

    const subcategory = await prisma.pageSubcategory.findUnique({
      where: { id },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: "Alt sayfa bulunamadı" },
        { status: 404 },
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error fetching page subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update subcategory
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

    const {
      parentSlug,
      slug,
      locale,
      heroTitle,
      heroHighlight,
      heroDescription,
      heroImage,
      heroImageAlt,
      sections,
      metaTitle,
      metaDescription,
      metaKeywords,
      order,
      published,
      // Eski API uyumluluğu
      title,
    } = body;

    const finalHeroTitle = heroTitle || title;

    // Slug çakışma kontrolü (kendi ID'si hariç)
    if (parentSlug && slug && locale) {
      const existing = await prisma.pageSubcategory.findFirst({
        where: {
          parentSlug,
          slug,
          locale,
          NOT: { id },
        },
      });

      if (existing) {
        return NextResponse.json(
          {
            error: "Bu slug zaten başka bir alt sayfa tarafından kullanılıyor",
          },
          { status: 409 },
        );
      }
    }

    const updateData: Record<string, unknown> = {};

    // Sadece gönderilen alanları güncelle
    if (parentSlug !== undefined) updateData.parentSlug = parentSlug;
    if (slug !== undefined) updateData.slug = slug;
    if (locale !== undefined) updateData.locale = locale;
    if (finalHeroTitle !== undefined) updateData.heroTitle = finalHeroTitle;
    if (heroHighlight !== undefined)
      updateData.heroHighlight = heroHighlight || null;
    if (heroDescription !== undefined)
      updateData.heroDescription = heroDescription || null;
    if (heroImage !== undefined) updateData.heroImage = heroImage || null;
    if (heroImageAlt !== undefined)
      updateData.heroImageAlt = heroImageAlt || null;
    if (sections !== undefined) updateData.sections = sections || null;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle || null;
    if (metaDescription !== undefined)
      updateData.metaDescription = metaDescription || null;
    if (metaKeywords !== undefined)
      updateData.metaKeywords = metaKeywords || null;
    if (order !== undefined) updateData.order = order;
    if (published !== undefined) updateData.published = published;

    const updated = await prisma.pageSubcategory.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating page subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete subcategory
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

    await prisma.pageSubcategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
