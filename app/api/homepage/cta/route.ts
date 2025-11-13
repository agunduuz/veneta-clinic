import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "tr";

    const cta = await prisma.cTASection.findUnique({
      where: { locale },
    });

    if (!cta) {
      return NextResponse.json(
        { error: "CTA section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cta);
  } catch (error) {
    console.error("Error fetching CTA section:", error);
    return NextResponse.json(
      { error: "Failed to fetch CTA section" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { locale = "tr", ...data } = body;

    const cta = await prisma.cTASection.upsert({
      where: { locale },
      update: {
        title: data.title,
        description: data.description,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
      },
      create: {
        locale,
        title: data.title,
        description: data.description,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
      },
    });

    return NextResponse.json(cta);
  } catch (error) {
    console.error("Error updating CTA section:", error);
    return NextResponse.json(
      { error: "Failed to update CTA section" },
      { status: 500 }
    );
  }
}
