// app/api/footer/links/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// POST - Yeni link ekle
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { groupId, title, href, order, active } = body;

    if (!groupId || !title || !href) {
      return NextResponse.json(
        { error: "GroupId, title, and href are required" },
        { status: 400 }
      );
    }

    const newLink = await prisma.footerLink.create({
      data: {
        groupId,
        title,
        href,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Footer link POST error:", error);
    return NextResponse.json(
      { error: "Failed to create footer link" },
      { status: 500 }
    );
  }
}
