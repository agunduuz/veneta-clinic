// app/api/admin/surgical-categories/[id]/faqs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET FAQs
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

    const faqs = await prisma.surgicalFAQ.findMany({
      where: { categoryId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("FAQs GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// POST new FAQ
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
    const { question, answer, order, active } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const newFAQ = await prisma.surgicalFAQ.create({
      data: {
        categoryId: id,
        question,
        answer,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    console.error("FAQ POST error:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
