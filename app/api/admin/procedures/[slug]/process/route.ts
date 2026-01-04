// app/api/admin/procedures/[slug]/process/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// GET - Admin için process steps
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    const processSteps = await prisma.procedureProcess.findMany({
      where: {
        pageSlug: slug,
        locale,
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(processSteps);
  } catch (error) {
    console.error("Process steps GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch process steps" },
      { status: 500 }
    );
  }
}

// POST - Yeni process step ekle
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const {
      locale,
      number,
      title,
      description,
      bgColor,
      textColor,
      order,
      active,
    } = body;

    if (!locale || !number || !title || !description) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newStep = await prisma.procedureProcess.create({
      data: {
        pageSlug: slug,
        locale,
        number,
        title,
        description,
        bgColor: bgColor || "bg-primary/20",
        textColor: textColor || "text-primary",
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(newStep, { status: 201 });
  } catch (error) {
    console.error("Process step POST error:", error);
    return NextResponse.json(
      { error: "Failed to create process step" },
      { status: 500 }
    );
  }
}
