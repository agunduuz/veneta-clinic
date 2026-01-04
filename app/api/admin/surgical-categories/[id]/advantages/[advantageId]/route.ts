// app/api/admin/surgical-categories/advantages/[advantageId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// PUT update advantage
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ advantageId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { advantageId } = await params;
    const body = await request.json();

    const updated = await prisma.surgicalAdvantage.update({
      where: { id: advantageId },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Advantage PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update advantage" },
      { status: 500 }
    );
  }
}

// DELETE advantage
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ advantageId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { advantageId } = await params;

    await prisma.surgicalAdvantage.delete({
      where: { id: advantageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Advantage DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete advantage" },
      { status: 500 }
    );
  }
}
