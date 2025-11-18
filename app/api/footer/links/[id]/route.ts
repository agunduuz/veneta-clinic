// app/api/footer/links/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// PUT - Link güncelle
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
    const { title, href, order, active } = body;

    const updated = await prisma.footerLink.update({
      where: { id }, // ← params.id yerine id
      data: {
        ...(title && { title }),
        ...(href && { href }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Footer link PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update footer link" },
      { status: 500 }
    );
  }
}

// DELETE - Link sil
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

    await prisma.footerLink.delete({
      where: { id }, // ← params.id yerine id
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Footer link DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete footer link" },
      { status: 500 }
    );
  }
}
