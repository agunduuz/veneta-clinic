// app/api/admin/surgical-categories/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET single category
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const category = await prisma.surgicalCategory.findUnique({
      where: { id },
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
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Surgical category GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Nested relations'ları ayır
    const { ...categoryData } = body;

    const updated = await prisma.surgicalCategory.update({
      where: { id },
      data: categoryData,
    });

    // ✅ BONUS: Eğer category publish ve active ise, header item'ı da aktifleştir
    if (updated.published && updated.active) {
      const headerHref =
        updated.locale === "en"
          ? `/en/surgical-aesthetics/${updated.slug}`
          : `/ameliyatli-estetik/${updated.slug}`;

      await prisma.headerNavItem.updateMany({
        where: {
          href: headerHref,
          locale: updated.locale,
        },
        data: { active: true },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Surgical category PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // ✅ 1. Kategoriyi al
    const category = await prisma.surgicalCategory.findUnique({
      where: { id },
      select: { slug: true, locale: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // ✅ 2. İlgili header navigation item'ı pasife al
    const headerHref =
      category.locale === "en"
        ? `/en/surgical-aesthetics/${category.slug}`
        : `/ameliyatli-estetik/${category.slug}`;

    await prisma.headerNavItem.updateMany({
      where: {
        href: headerHref,
        locale: category.locale,
      },
      data: { active: false },
    });

    // ✅ 3. Kategoriyi sil
    await prisma.surgicalCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted and header item deactivated",
    });
  } catch (error) {
    console.error("Surgical category DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
