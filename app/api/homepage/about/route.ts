// app/api/homepage/about/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET - locale'ye göre about section getir
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const about = await prisma.aboutSection.findFirst({
      where: { locale },
    });

    if (!about) {
      return NextResponse.json(
        { error: "About section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about section:", error);
    return NextResponse.json(
      { error: "Failed to fetch about section" },
      { status: 500 }
    );
  }
}

// PUT - locale'ye göre about section güncelle
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const locale = body.locale || "tr";

    const existingAbout = await prisma.aboutSection.findFirst({
      where: { locale },
    });

    if (!existingAbout) {
      return NextResponse.json(
        { error: "About section not found" },
        { status: 404 }
      );
    }

    const updatedAbout = await prisma.aboutSection.update({
      where: { id: existingAbout.id },
      data: {
        title: body.title,
        description: body.description,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        imageUrl: body.imageUrl,
        rating: body.rating,
      },
    });

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("Error updating about section:", error);
    return NextResponse.json(
      { error: "Failed to update about section" },
      { status: 500 }
    );
  }
}
