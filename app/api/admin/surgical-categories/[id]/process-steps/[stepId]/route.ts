// app/api/admin/surgical-categories/process-steps/[stepId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// PUT update step
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stepId } = await params;
    const body = await request.json();

    const updated = await prisma.surgicalProcessStep.update({
      where: { id: stepId },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Process step PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update process step" },
      { status: 500 }
    );
  }
}

// DELETE step
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stepId } = await params;

    await prisma.surgicalProcessStep.delete({
      where: { id: stepId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Process step DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete process step" },
      { status: 500 }
    );
  }
}
