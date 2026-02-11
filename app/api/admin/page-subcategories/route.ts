// app/api/admin/page-subcategories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET - List all subcategories for a parent page
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const parentSlug = searchParams.get("parentSlug");
    const locale = searchParams.get("locale") || "tr";

    const where: Record<string, unknown> = { locale };
    if (parentSlug) {
      where.parentSlug = parentSlug;
    }

    const subcategories = await prisma.pageSubcategory.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error("Error fetching page subcategories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create new subcategory
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      parentSlug,
      slug,
      locale = "tr",
      heroTitle,
      heroHighlight,
      heroDescription,
      heroImage,
      heroImageAlt,
      sections,
      metaTitle,
      metaDescription,
      metaKeywords,
      order = 0,
      published = false,
      // Eski API uyumluluğu
      title,
    } = body;

    // heroTitle veya title'dan birini al
    const finalHeroTitle = heroTitle || title;

    if (!parentSlug || !slug || !finalHeroTitle) {
      return NextResponse.json(
        { error: "parentSlug, slug ve heroTitle (veya title) zorunludur" },
        { status: 400 },
      );
    }

    // Aynı slug+parent+locale var mı kontrol et
    const existing = await prisma.pageSubcategory.findUnique({
      where: {
        parentSlug_slug_locale: {
          parentSlug,
          slug,
          locale,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Bu slug zaten kullanılıyor" },
        { status: 409 },
      );
    }

    const subcategory = await prisma.pageSubcategory.create({
      data: {
        parentSlug,
        slug,
        locale,
        heroTitle: finalHeroTitle,
        heroHighlight: heroHighlight || null,
        heroDescription: heroDescription || null,
        heroImage: heroImage || null,
        heroImageAlt: heroImageAlt || null,
        sections: sections || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        order,
        published,
      },
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    console.error("Error creating page subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
