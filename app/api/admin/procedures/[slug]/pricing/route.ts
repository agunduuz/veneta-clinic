// app/api/admin/procedures/[slug]/pricing/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için pricing
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

    const pricing = await prisma.procedurePricing.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Pricing GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}

// POST - Yeni pricing ekle
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
    const {
      locale,
      title,
      description,
      priceText,
      colorScheme,
      order,
      active,
    } = body;

    if (!locale || !title || !description || !priceText || !colorScheme) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newPricing = await prisma.procedurePricing.create({
      data: {
        pageSlug: slug,
        locale,
        title,
        description,
        priceText,
        colorScheme,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newPricing, { status: 201 });
  } catch (error) {
    console.error("Pricing POST error:", error);
    return NextResponse.json(
      { error: "Failed to create pricing" },
      { status: 500 }
    );
  }
}
