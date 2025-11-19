// app/api/contact/content/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için contact page content
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const contactPage = await prisma.contactPage.findUnique({
      where: { locale },
    });

    if (!contactPage) {
      return NextResponse.json(
        { error: "Contact page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contactPage);
  } catch (error) {
    console.error("Contact content GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact content" },
      { status: 500 }
    );
  }
}

// PUT - Contact page content güncelle
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

    const updated = await prisma.contactPage.update({
      where: { locale },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Contact content PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update contact content" },
      { status: 500 }
    );
  }
}
