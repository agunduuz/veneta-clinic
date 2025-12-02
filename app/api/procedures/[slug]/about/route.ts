import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
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
        active: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    // About Advantages
    const aboutAdvantages = await prisma.procedureAboutAdvantage.findMany({
      where: {
        pageSlug: slug,
        locale: locale,
        active: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json({
      aboutSection,
      aboutAreas,
      aboutAdvantages,
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
