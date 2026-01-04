// app/api/admin/surgical-categories/[id]/why-choose-items/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// POST - Create new why choose item
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

    const item = await prisma.surgicalWhyChooseItem.create({
      data: {
        categoryId: id,
        text: body.text,
        order: body.order,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Why Choose Item POST error:", error);
    return NextResponse.json(
      { error: "Failed to create why choose item" },
      { status: 500 }
    );
  }
}
