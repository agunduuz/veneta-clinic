// app/api/admin/procedures/[slug]/features/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için features
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

    const features = await prisma.procedureFeature.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(features);
  } catch (error) {
    console.error("Features GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}

// POST - Yeni feature ekle
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
    const { locale, icon, title, description, order, active } = body;

    if (!locale || !icon || !title || !description) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newFeature = await prisma.procedureFeature.create({
      data: {
        pageSlug: slug,
        locale,
        icon,
        title,
        description,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error("Feature POST error:", error);
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    );
  }
}
