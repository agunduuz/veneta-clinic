// app/api/admin/surgical-categories/[id]/why-choose-items/[itemId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// PUT - Update why choose item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId } = await params;
    const body = await request.json();

    const updated = await prisma.surgicalWhyChooseItem.update({
      where: { id: itemId },
      data: {
        text: body.text,
        order: body.order,
        active: body.active,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Why Choose Item PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update why choose item" },
      { status: 500 }
    );
  }
}

// DELETE - Delete why choose item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId } = await params;

    await prisma.surgicalWhyChooseItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Why Choose Item DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete why choose item" },
      { status: 500 }
    );
  }
}
