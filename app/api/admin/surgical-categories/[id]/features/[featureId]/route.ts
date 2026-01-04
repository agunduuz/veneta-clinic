// app/api/admin/surgical-categories/[id]/features/[featureId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// PUT - Update feature
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; featureId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { featureId } = await params;
    const body = await request.json();

    console.log("Updating feature:", featureId); // Debug

    const updated = await prisma.surgicalFeature.update({
      where: { id: featureId },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        active: body.active,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Feature PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update feature" },
      { status: 500 }
    );
  }
}

// DELETE - Delete feature
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; featureId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { featureId } = await params;

    console.log("Deleting feature:", featureId); // Debug

    await prisma.surgicalFeature.delete({
      where: { id: featureId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feature DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete feature" },
      { status: 500 }
    );
  }
}
