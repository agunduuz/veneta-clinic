// app/api/procedures/[slug]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Frontend için procedure page data
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    // Main page data
    const page = await prisma.procedurePage.findUnique({
      where: {
        slug_locale: {
          slug,
          locale,
        },
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Procedure page not found" },
        { status: 404 }
      );
    }

    // Get all related data
    const [features, deviceItems, treatmentAreas, pricing, whyUs, faqs] =
      await Promise.all([
        prisma.procedureFeature.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
        prisma.procedureDeviceItem.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
        prisma.procedureTreatmentArea.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
        prisma.procedurePricing.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
        prisma.procedureWhyUs.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
        prisma.procedureFAQ.findMany({
          where: {
            pageSlug: slug,
            locale,
            active: true,
          },
          orderBy: { order: "asc" },
        }),
      ]);

    // Group device items by type
    const deviceFeatures = deviceItems.filter(
      (item) => item.type === "feature"
    );
    const deviceAdvantages = deviceItems.filter(
      (item) => item.type === "advantage"
    );

    return NextResponse.json({
      ...page,
      features,
      deviceFeatures,
      deviceAdvantages,
      treatmentAreas,
      pricing,
      whyUs,
      faqs,
    });
  } catch (error) {
    console.error("Procedure page GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch procedure page" },
      { status: 500 }
    );
  }
}
