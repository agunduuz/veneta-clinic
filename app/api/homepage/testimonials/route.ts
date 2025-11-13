// app/api/homepage/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm testimonials'ları getir (locale bazlı, sadece aktif olanlar)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") as "tr" | "en") || "tr";

    const testimonials = await prisma.testimonial.findMany({
      where: {
        locale,
        active: true,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("❌ Testimonials API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch testimonials",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Testimonials'ları toplu güncelle (admin için)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { testimonials } = body; // locale kullanılmıyor, kaldırdık

    if (!Array.isArray(testimonials)) {
      return NextResponse.json(
        { error: "Invalid request body - testimonials must be an array" },
        { status: 400 }
      );
    }

    // Her testimonial'ı güncelle
    const updatePromises = testimonials.map(
      (testimonial: {
        id: string;
        name: string;
        procedure: string;
        comment: string;
        rating: number;
        imageUrl?: string;
        active: boolean;
        order: number;
      }) =>
        prisma.testimonial.update({
          where: { id: testimonial.id },
          data: {
            name: testimonial.name,
            procedure: testimonial.procedure,
            comment: testimonial.comment,
            rating: testimonial.rating,
            imageUrl: testimonial.imageUrl,
            active: testimonial.active,
            order: testimonial.order,
          },
        })
    );

    const updatedTestimonials = await Promise.all(updatePromises);

    return NextResponse.json(updatedTestimonials);
  } catch (error) {
    console.error("❌ Testimonials Update Error:", error);
    return NextResponse.json(
      {
        error: "Failed to update testimonials",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
