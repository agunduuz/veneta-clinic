// app/api/about/features/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için tüm features
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const features = await prisma.aboutFeature.findMany({
      where: { locale },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(features);
  } catch (error) {
    console.error("About features GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}

// POST - Yeni feature ekle
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { locale, featureId, title, description, image, order, active } =
      body;

    if (!locale || !featureId || !title || !description || !image) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newFeature = await prisma.aboutFeature.create({
      data: {
        locale,
        featureId,
        title,
        description,
        image,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error("About feature POST error:", error);
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    );
  }
}
