// app/api/admin/surgical-categories/[id]/advantages/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET advantages for category
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

    const advantages = await prisma.surgicalAdvantage.findMany({
      where: { categoryId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(advantages);
  } catch (error) {
    console.error("Advantages GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch advantages" },
      { status: 500 }
    );
  }
}

// POST new advantage
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
    const { title, description, icon, order, active } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newAdvantage = await prisma.surgicalAdvantage.create({
      data: {
        categoryId: id,
        title,
        description,
        icon,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newAdvantage, { status: 201 });
  } catch (error) {
    console.error("Advantage POST error:", error);
    return NextResponse.json(
      { error: "Failed to create advantage" },
      { status: 500 }
    );
  }
}
