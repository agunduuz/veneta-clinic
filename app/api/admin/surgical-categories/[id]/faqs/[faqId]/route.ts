// app/api/admin/surgical-categories/faqs/[faqId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// PUT update FAQ
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ faqId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { faqId } = await params;
    const body = await request.json();

    const updated = await prisma.surgicalFAQ.update({
      where: { id: faqId },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("FAQ PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// DELETE FAQ
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ faqId: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { faqId } = await params;

    await prisma.surgicalFAQ.delete({
      where: { id: faqId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("FAQ DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
