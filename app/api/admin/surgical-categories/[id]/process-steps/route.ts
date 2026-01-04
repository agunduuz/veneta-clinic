// app/api/admin/surgical-categories/[id]/process-steps/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET process steps
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

    const steps = await prisma.surgicalProcessStep.findMany({
      where: { categoryId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(steps);
  } catch (error) {
    console.error("Process steps GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch process steps" },
      { status: 500 }
    );
  }
}

// POST new step
export async function POST(
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
    const { step, description, order, active } = body;

    if (!step || !description) {
      return NextResponse.json(
        { error: "Step and description are required" },
        { status: 400 }
      );
    }

    const newStep = await prisma.surgicalProcessStep.create({
      data: {
        categoryId: id,
        step,
        description,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newStep, { status: 201 });
  } catch (error) {
    console.error("Process step POST error:", error);
    return NextResponse.json(
      { error: "Failed to create process step" },
      { status: 500 }
    );
  }
}
