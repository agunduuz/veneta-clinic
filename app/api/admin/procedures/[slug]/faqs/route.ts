// app/api/admin/procedures/[slug]/faqs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için FAQs
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const faqs = await prisma.procedureFAQ.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
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

// POST - Yeni FAQ ekle
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const { locale, question, answer, order, active } = body;

    if (!locale || !question || !answer) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newFAQ = await prisma.procedureFAQ.create({
      data: {
        pageSlug: slug,
        locale,
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
