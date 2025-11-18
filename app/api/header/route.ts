// app/api/header/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Frontend için tüm header navigation data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    // Ana menü items (parentId null olanlar)
    const mainMenuItems = await prisma.headerNavItem.findMany({
      where: {
        locale,
        parentId: null,
        active: true,
      },
      orderBy: { order: "asc" },
    });

    // Her ana menü için alt menüleri getir
    const menuWithChildren = await Promise.all(
      mainMenuItems.map(async (item) => {
        const children = await prisma.headerNavItem.findMany({
          where: {
            parentId: item.id,
            active: true,
          },
          orderBy: { order: "asc" },
        });

        return {
          id: item.id,
          title: item.title,
          href: item.href,
          openInNewTab: item.openInNewTab,
          children: children.length > 0 ? children : undefined,
        };
      })
    );

    return NextResponse.json(menuWithChildren);
  } catch (error) {
    console.error("Header navigation GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch header navigation" },
      { status: 500 }
    );
  }
}
