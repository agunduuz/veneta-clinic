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

    // ✅ DÜZELTME: Nested relations'ları ayır
    const {
      advantages,
      processSteps,
      faqs,
      features,
      whyChooseItems, // ✅ YENİ
      ...categoryData
    } = body;

    // Sadece category bilgilerini güncelle
    const updated = await prisma.surgicalCategory.update({
      where: { id },
      data: categoryData,
    });

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

    await prisma.surgicalCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Surgical category DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
