// app/api/admin/surgical-categories/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET all categories (admin)
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const categories = await prisma.surgicalCategory.findMany({
      where: { locale },
      include: {
        advantages: {
          orderBy: { order: "asc" },
        },
        processSteps: {
          orderBy: { order: "asc" },
        },
        faqs: {
          orderBy: { order: "asc" },
        },
        features: {
          orderBy: { order: "asc" },
        },
        whyChooseItems: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Surgical categories GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST new category
export async function POST(request: Request) {
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
      description,
      heroImage,
      patientsCount,
      experienceYears,
      rating,
      galleryImages,
      metaTitle,
      metaDescription,
      metaKeywords,
      published,
      order,
    } = body;

    if (!locale || !slug || !title) {
      return NextResponse.json(
        { error: "Locale, slug, and title are required" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.surgicalCategory.create({
      data: {
        locale,
        slug,
        title,
        description,
        heroImage,
        patientsCount,
        experienceYears,
        rating,
        galleryImages: galleryImages || [],
        metaTitle,
        metaDescription,
        metaKeywords,
        published: published ?? false,
        order: order || 0,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Surgical category POST error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
