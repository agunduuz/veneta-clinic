import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için about section, areas, advantages
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

    // About Section
    const aboutSection = await prisma.procedureAboutSection.findUnique({
      where: {
        pageSlug_locale: {
          pageSlug: slug,
          locale: locale,
        },
      },
    });

    // About Areas
    const aboutAreas = await prisma.procedureAboutArea.findMany({
      where: {
        pageSlug: slug,
        locale: locale,
      },
      orderBy: { order: "asc" },
    });

    // About Advantages
    const aboutAdvantages = await prisma.procedureAboutAdvantage.findMany({
      where: {
        pageSlug: slug,
        locale: locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      aboutSection,
      aboutAreas,
      aboutAdvantages,
    });
  } catch (error) {
    console.error("About data GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

// PUT - About Section güncelle
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

    const updated = await prisma.procedureAboutSection.upsert({
      where: {
        pageSlug_locale: {
          pageSlug: slug,
          locale,
        },
      },
      update: data,
      create: {
        pageSlug: slug,
        locale,
        ...data,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("About section PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update about section" },
      { status: 500 }
    );
  }
}
