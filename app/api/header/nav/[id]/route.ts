// app/api/header/nav/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// PUT - Nav item güncelle
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
    const { title, href, order, active, openInNewTab } = body;

    const updated = await prisma.headerNavItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(href && { href }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
        ...(openInNewTab !== undefined && { openInNewTab }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Header nav PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update nav item" },
      { status: 500 }
    );
  }
}

// DELETE - Nav item sil (cascade ile children da silinir)
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

    await prisma.headerNavItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Header nav DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete nav item" },
      { status: 500 }
    );
  }
}
