// app/api/admin/procedures/[slug]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için procedure page content
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

    const page = await prisma.procedurePage.findUnique({
      where: {
        slug_locale: {
          slug,
          locale,
        },
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Procedure page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Procedure page admin GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch procedure page" },
      { status: 500 }
    );
  }
}

// PUT - Procedure page content güncelle
export async function PUT(
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
    const { locale, ...data } = body;

    if (!locale) {
      return NextResponse.json(
        { error: "Locale is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.procedurePage.update({
      where: {
        slug_locale: {
          slug,
          locale,
        },
      },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Procedure page PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update procedure page" },
      { status: 500 }
    );
  }
}
