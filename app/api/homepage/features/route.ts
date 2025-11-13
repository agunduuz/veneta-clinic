import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm features'ları locale bazlı getir
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "tr";

    console.log("🔍 Features API - Fetching for locale:", locale);

    const features = await prisma.feature.findMany({
      where: {
        locale: locale,
      },
      orderBy: {
        order: "asc",
      },
    });

    console.log("✅ Features API - Found:", features.length, "items");

    return NextResponse.json(features);
  } catch (error: any) {
    console.error("❌ Features API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch features", details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Features'ları güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { features, locale = "tr" } = body;

    console.log(
      "🔍 Features API - Updating",
      features?.length,
      "items for locale:",
      locale
    );

    if (!Array.isArray(features)) {
      return NextResponse.json(
        { error: "Invalid request body - features must be an array" },
        { status: 400 }
      );
    }

    // Her feature'ı güncelle
    const updatePromises = features.map((feature: any) =>
      prisma.feature.update({
        where: { id: feature.id },
        data: {
          title: feature.title,
          description: feature.description,
          order: feature.order,
        },
      })
    );

    const updatedFeatures = await Promise.all(updatePromises);

    console.log("✅ Features API - Updated successfully");

    return NextResponse.json(updatedFeatures);
  } catch (error: any) {
    console.error("❌ Features API Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update features", details: error.message },
      { status: 500 }
    );
  }
}
