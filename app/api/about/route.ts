// app/api/about/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Frontend için about page data
export async function GET(request: Request) {
  try {
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

    // Get features
    const features = await prisma.aboutFeature.findMany({
      where: {
        locale,
        active: true,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      ...aboutPage,
      features,
    });
  } catch (error) {
    console.error("About page GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about page" },
      { status: 500 }
    );
  }
}
