// app/api/admin/procedures/[slug]/about/areas/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// POST - Yeni about area ekle
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
    const { locale, text, order, active } = body;

    if (!locale || !text) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newArea = await prisma.procedureAboutArea.create({
      data: {
        pageSlug: slug,
        locale,
        text,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newArea, { status: 201 });
  } catch (error) {
    console.error("About area POST error:", error);
    return NextResponse.json(
      { error: "Failed to create about area" },
      { status: 500 }
    );
  }
}
