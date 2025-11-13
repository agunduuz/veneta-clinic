import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm procedures'ları getir (locale ve category bazlı)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";
    const category = searchParams.get("category"); // "surgical", "non-surgical", veya null (all)

    const where: any = {
      locale,
      published: true,
    };

    // Category filter varsa ekle
    if (category && category !== "all") {
      where.category = category;
    }

    const procedures = await prisma.procedure.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(procedures);
  } catch (error: any) {
    console.error("❌ Procedures API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch procedures", details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Procedures'ları toplu güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { procedures, locale = "tr" } = body;

    if (!Array.isArray(procedures)) {
      return NextResponse.json(
        { error: "Invalid request body - procedures must be an array" },
        { status: 400 }
      );
    }

    // Her procedure'ı güncelle
    const updatePromises = procedures.map((procedure: any) =>
      prisma.procedure.update({
        where: { id: procedure.id },
        data: {
          title: procedure.title,
          slug: procedure.slug,
          description: procedure.description,
          category: procedure.category,
          imageUrl: procedure.imageUrl,
          badge: procedure.badge,
          detailLink: procedure.detailLink,
          order: procedure.order,
          published: procedure.published,
        },
      })
    );

    const updatedProcedures = await Promise.all(updatePromises);

    return NextResponse.json(updatedProcedures);
  } catch (error: any) {
    console.error("❌ Procedures Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update procedures", details: error.message },
      { status: 500 }
    );
  }
}
