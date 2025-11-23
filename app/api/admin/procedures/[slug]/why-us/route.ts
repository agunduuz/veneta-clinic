// app/api/admin/procedures/[slug]/why-us/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için why us
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

    const whyUs = await prisma.procedureWhyUs.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(whyUs);
  } catch (error) {
    console.error("Why us GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch why us" },
      { status: 500 }
    );
  }
}

// POST - Yeni why us ekle
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
    const { locale, icon, title, description, colorScheme, order, active } =
      body;

    if (!locale || !icon || !title || !description || !colorScheme) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newWhyUs = await prisma.procedureWhyUs.create({
      data: {
        pageSlug: slug,
        locale,
        icon,
        title,
        description,
        colorScheme,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newWhyUs, { status: 201 });
  } catch (error) {
    console.error("Why us POST error:", error);
    return NextResponse.json(
      { error: "Failed to create why us" },
      { status: 500 }
    );
  }
}
