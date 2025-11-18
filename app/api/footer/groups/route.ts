// app/api/footer/groups/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Tüm grupları getir
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const groups = await prisma.footerLinkGroup.findMany({
      where: { locale },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Footer groups GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer groups" },
      { status: 500 }
    );
  }
}

// POST - Yeni grup ekle
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { locale, title, slug, order, active } = body;

    if (!locale || !title || !slug) {
      return NextResponse.json(
        { error: "Locale, title, and slug are required" },
        { status: 400 }
      );
    }

    const newGroup = await prisma.footerLinkGroup.create({
      data: {
        locale,
        title,
        slug,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error("Footer groups POST error:", error);
    return NextResponse.json(
      { error: "Failed to create footer group" },
      { status: 500 }
    );
  }
}
