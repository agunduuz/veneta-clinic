// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Frontend için contact page data
export async function GET(request: Request) {
  try {
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
    console.error("Contact page GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact page" },
      { status: 500 }
    );
  }
}
