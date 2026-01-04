// app/api/surgical-categories/[slug]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const category = await prisma.surgicalCategory.findFirst({
      where: {
        slug,
        locale,
        published: true,
        active: true,
      },
      include: {
        advantages: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
        processSteps: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
        faqs: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Surgical category GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
