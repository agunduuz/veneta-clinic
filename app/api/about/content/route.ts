// app/api/about/content/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için about page content
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const aboutPage = await prisma.aboutPage.findUnique({
      where: { locale },
    });

    if (!aboutPage) {
      return NextResponse.json(
        { error: "About page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutPage);
  } catch (error) {
    console.error("About content GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about content" },
      { status: 500 }
    );
  }
}

// PUT - About page content güncelle
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

    const updated = await prisma.aboutPage.update({
      where: { locale },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("About content PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update about content" },
      { status: 500 }
    );
  }
}
