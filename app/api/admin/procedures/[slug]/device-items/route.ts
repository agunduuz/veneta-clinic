// app/api/admin/procedures/[slug]/device-items/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için device items
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

    const deviceItems = await prisma.procedureDeviceItem.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(deviceItems);
  } catch (error) {
    console.error("Device items GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch device items" },
      { status: 500 }
    );
  }
}

// POST - Yeni device item ekle
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
    const { locale, type, text, order, active } = body;

    if (!locale || !type || !text) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newItem = await prisma.procedureDeviceItem.create({
      data: {
        pageSlug: slug,
        locale,
        type,
        text,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Device item POST error:", error);
    return NextResponse.json(
      { error: "Failed to create device item" },
      { status: 500 }
    );
  }
}
