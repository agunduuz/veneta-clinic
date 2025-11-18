// app/api/footer/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Frontend için tüm footer data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    // 1. Footer Content (İletişim, Sosyal Medya, Copyright)
    const content = await prisma.footerContent.findUnique({
      where: { locale },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Footer content not found" },
        { status: 404 }
      );
    }

    // 2. Link Grupları + Linkler (Aktif olanlar, sıralı)
    const groups = await prisma.footerLinkGroup.findMany({
      where: {
        locale,
        active: true,
      },
      include: {
        links: {
          where: { active: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      content: {
        phone: content.phone,
        phoneSecondary: content.phoneSecondary,
        email: content.email,
        address: content.address,
        mapLink: content.mapLink,
        facebookUrl: content.facebookUrl,
        instagramUrl: content.instagramUrl,
        twitterUrl: content.twitterUrl,
        linkedinUrl: content.linkedinUrl,
        youtubeUrl: content.youtubeUrl,
        copyrightText: content.copyrightText,
      },
      groups: groups.map((group) => ({
        id: group.id,
        title: group.title,
        slug: group.slug,
        links: group.links.map((link) => ({
          id: link.id,
          title: link.title,
          href: link.href,
        })),
      })),
    });
  } catch (error) {
    console.error("Footer GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer data" },
      { status: 500 }
    );
  }
}
