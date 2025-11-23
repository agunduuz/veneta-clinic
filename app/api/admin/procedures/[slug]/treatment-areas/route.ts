// app/api/admin/procedures/[slug]/treatment-areas/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için treatment areas
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

    const areas = await prisma.procedureTreatmentArea.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(areas);
  } catch (error) {
    console.error("Treatment areas GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch treatment areas" },
      { status: 500 }
    );
  }
}

// POST - Yeni treatment area ekle
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
    const { locale, title, description, order, active } = body;

    if (!locale || !title || !description) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newArea = await prisma.procedureTreatmentArea.create({
      data: {
        pageSlug: slug,
        locale,
        title,
        description,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newArea, { status: 201 });
  } catch (error) {
    console.error("Treatment area POST error:", error);
    return NextResponse.json(
      { error: "Failed to create treatment area" },
      { status: 500 }
    );
  }
}
