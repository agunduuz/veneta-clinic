// app/api/homepage/procedures/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tek procedure getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const procedure = await prisma.procedure.findUnique({
      where: { id: params.id },
    });

    if (!procedure) {
      return NextResponse.json(
        { error: "Procedure not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(procedure);
  } catch (error) {
    console.error("❌ Procedure GET Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch procedure",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Procedure güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      category,
      imageUrl,
      badge,
      detailLink,
      order,
      published,
    } = body;

    const procedure = await prisma.procedure.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(category && { category }),
        ...(imageUrl && { imageUrl }),
        ...(badge !== undefined && { badge }),
        ...(detailLink !== undefined && { detailLink }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json(procedure);
  } catch (error) {
    console.error("❌ Procedure Update Error:", error);
    return NextResponse.json(
      {
        error: "Failed to update procedure",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Procedure sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.procedure.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Procedure Delete Error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete procedure",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
