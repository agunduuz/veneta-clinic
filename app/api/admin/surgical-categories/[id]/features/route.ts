// app/api/admin/surgical-categories/[id]/features/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// POST - Create new feature
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

    const feature = await prisma.surgicalFeature.create({
      data: {
        categoryId: id,
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.error("Feature POST error:", error);
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    );
  }
}
