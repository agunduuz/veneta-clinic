// app/api/footer/content/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin panel için footer content
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const content = await prisma.footerContent.findUnique({
      where: { locale },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Footer content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Footer content GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer content" },
      { status: 500 }
    );
  }
}

// PUT - Footer content güncelle
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { locale, ...data } = body;

    if (!locale) {
      return NextResponse.json(
        { error: "Locale is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.footerContent.upsert({
      where: { locale },
      update: data,
      create: { locale, ...data },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Footer content PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update footer content" },
      { status: 500 }
    );
  }
}
