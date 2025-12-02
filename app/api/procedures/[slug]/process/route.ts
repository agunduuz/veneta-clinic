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

    const processSteps = await prisma.procedureProcess.findMany({
      where: {
        pageSlug: slug,
        locale: locale,
        active: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(processSteps);
  } catch (error) {
    console.error("Error fetching process steps:", error);
    return NextResponse.json(
      { error: "Failed to fetch process steps" },
      { status: 500 }
    );
  }
}
