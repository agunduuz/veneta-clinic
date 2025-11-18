// app/api/header/nav/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için tüm nav items (inactive dahil)
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    // Ana menü items
    const mainItems = await prisma.headerNavItem.findMany({
      where: {
        locale,
        parentId: null,
      },
      orderBy: { order: "asc" },
    });

    // Alt menü items dahil
    const itemsWithChildren = await Promise.all(
      mainItems.map(async (item) => {
        const children = await prisma.headerNavItem.findMany({
          where: {
            parentId: item.id,
          },
          orderBy: { order: "asc" },
        });

        return {
          ...item,
          children: children.length > 0 ? children : [],
        };
      })
    );

    return NextResponse.json(itemsWithChildren);
  } catch (error) {
    console.error("Header nav GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch header nav items" },
      { status: 500 }
    );
  }
}

// POST - Yeni nav item ekle
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { locale, title, href, parentId, order, active, openInNewTab } = body;

    if (!locale || !title || !href) {
      return NextResponse.json(
        { error: "Locale, title, and href are required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.headerNavItem.create({
      data: {
        locale,
        title,
        href,
        parentId: parentId || null,
        order: order || 0,
        active: active !== undefined ? active : true,
        openInNewTab: openInNewTab || false,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Header nav POST error:", error);
    return NextResponse.json(
      { error: "Failed to create nav item" },
      { status: 500 }
    );
  }
}
