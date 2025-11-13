import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Hero Section verisini getir (locale parametresi ile)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "tr";

    const hero = await prisma.heroSection.findUnique({
      where: { locale },
    });

    if (!hero) {
      return NextResponse.json(
        { error: "Hero section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hero);
  } catch (error: any) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section", details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Hero Section verisini güncelle (locale bazlı)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { locale = "tr", ...data } = body;

    // Locale için hero'yu bul veya oluştur
    const hero = await prisma.heroSection.upsert({
      where: { locale },
      update: {
        title: data.title,
        description: data.description,
        stat1Number: data.stat1Number,
        stat1Text: data.stat1Text,
        stat2Number: data.stat2Number,
        stat2Text: data.stat2Text,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
        imageUrl: data.imageUrl,
      },
      create: {
        locale,
        title: data.title,
        description: data.description,
        stat1Number: data.stat1Number,
        stat1Text: data.stat1Text,
        stat2Number: data.stat2Number,
        stat2Text: data.stat2Text,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
        imageUrl: data.imageUrl,
      },
    });

    return NextResponse.json(hero);
  } catch (error: any) {
    console.error("Error updating hero section:", error);
    return NextResponse.json(
      { error: "Failed to update hero section", details: error.message },
      { status: 500 }
    );
  }
}
