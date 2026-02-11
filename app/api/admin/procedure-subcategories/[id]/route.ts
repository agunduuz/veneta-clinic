// app/api/admin/procedure-subcategories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single procedure subcategory
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subcategory = await prisma.procedureSubcategory.findUnique({
      where: { id: params.id },
      include: {
        features: { orderBy: { order: "asc" } },
        deviceItems: { orderBy: { order: "asc" } },
        treatmentAreas: { orderBy: { order: "asc" } },
        pricing: { orderBy: { order: "asc" } },
        whyUs: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    if (!subcategory) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error fetching procedure subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT - Update procedure subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      features,
      deviceItems,
      treatmentAreas,
      pricing,
      whyUs,
      faqs,
      ...subcategoryData
    } = body;

    // Update main data
    const subcategory = await prisma.procedureSubcategory.update({
      where: { id: params.id },
      data: subcategoryData,
    });

    // Update relations if provided
    if (features !== undefined) {
      await prisma.procedureSubcategoryFeature.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (features.length > 0) {
        await prisma.procedureSubcategoryFeature.createMany({
          data: features.map((f: any, idx: number) => ({
            ...f,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    if (deviceItems !== undefined) {
      await prisma.procedureSubcategoryDeviceItem.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (deviceItems.length > 0) {
        await prisma.procedureSubcategoryDeviceItem.createMany({
          data: deviceItems.map((d: any, idx: number) => ({
            ...d,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    if (treatmentAreas !== undefined) {
      await prisma.procedureSubcategoryTreatmentArea.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (treatmentAreas.length > 0) {
        await prisma.procedureSubcategoryTreatmentArea.createMany({
          data: treatmentAreas.map((t: any, idx: number) => ({
            ...t,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    if (pricing !== undefined) {
      await prisma.procedureSubcategoryPricing.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (pricing.length > 0) {
        await prisma.procedureSubcategoryPricing.createMany({
          data: pricing.map((p: any, idx: number) => ({
            ...p,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    if (whyUs !== undefined) {
      await prisma.procedureSubcategoryWhyUs.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (whyUs.length > 0) {
        await prisma.procedureSubcategoryWhyUs.createMany({
          data: whyUs.map((w: any, idx: number) => ({
            ...w,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    if (faqs !== undefined) {
      await prisma.procedureSubcategoryFAQ.deleteMany({
        where: { subcategoryId: params.id },
      });
      if (faqs.length > 0) {
        await prisma.procedureSubcategoryFAQ.createMany({
          data: faqs.map((f: any, idx: number) => ({
            ...f,
            subcategoryId: params.id,
            order: idx + 1,
          })),
        });
      }
    }

    // Fetch updated data
    const updated = await prisma.procedureSubcategory.findUnique({
      where: { id: params.id },
      include: {
        features: { orderBy: { order: "asc" } },
        deviceItems: { orderBy: { order: "asc" } },
        treatmentAreas: { orderBy: { order: "asc" } },
        pricing: { orderBy: { order: "asc" } },
        whyUs: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating procedure subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete procedure subcategory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cascade delete will handle relations automatically
    await prisma.procedureSubcategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting procedure subcategory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
