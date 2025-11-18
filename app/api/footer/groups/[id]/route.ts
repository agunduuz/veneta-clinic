// app/api/footer/groups/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// PUT - Grup güncelle
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ← Promise ekledik
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // ← await params
    const body = await request.json();
    const { title, slug, order, active } = body;

    const updated = await prisma.footerLinkGroup.update({
      where: { id }, // ← params.id yerine id
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Footer group PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update footer group" },
      { status: 500 }
    );
  }
}

// DELETE - Grup sil (cascade ile linkler de silinir)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ← Promise ekledik
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // ← await params

    await prisma.footerLinkGroup.delete({
      where: { id }, // ← params.id yerine id
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Footer group DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete footer group" },
      { status: 500 }
    );
  }
}
