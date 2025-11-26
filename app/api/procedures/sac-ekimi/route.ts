// app/api/procedures/sac-ekimi/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";

    // Main page data
    const pageData = await prisma.procedurePage.findFirst({
      where: {
        slug: "sac-ekimi",
        locale: locale,
        active: true,
      },
    });

    if (!pageData) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Features
    const features = await prisma.procedureFeature.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        icon: true,
        title: true,
        description: true,
        order: true,
      },
    });

    // Device Items
    const deviceItems = await prisma.procedureDeviceItem.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        type: true,
        text: true,
        order: true,
      },
    });

    const deviceFeatures = deviceItems.filter(
      (item) => item.type === "feature"
    );
    const deviceAdvantages = deviceItems.filter(
      (item) => item.type === "advantage"
    );

    // Treatment Areas
    const treatmentAreas = await prisma.procedureTreatmentArea.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        order: true,
      },
    });

    // Pricing
    const pricing = await prisma.procedurePricing.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        priceText: true,
        colorScheme: true,
        order: true,
      },
    });

    // Why Us
    const whyUs = await prisma.procedureWhyUs.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        icon: true,
        title: true,
        description: true,
        colorScheme: true,
        order: true,
      },
    });

    // FAQs
    const faqs = await prisma.procedureFAQ.findMany({
      where: {
        pageSlug: "sac-ekimi",
        locale: locale,
        active: true,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        question: true,
        answer: true,
        order: true,
      },
    });

    // Combine all data
    const response = {
      // Hero
      heroTitle: pageData.heroTitle,
      heroTitleHighlight: pageData.heroTitleHighlight,
      heroDescription: pageData.heroDescription,
      heroButtonReviews: pageData.heroButtonReviews,
      heroButtonPhone: pageData.heroButtonPhone,
      heroImage: pageData.heroImage,
      heroImageAlt: pageData.heroImageAlt,

      // Features
      features,

      // Device
      deviceTitle: pageData.deviceTitle,
      deviceDescription: pageData.deviceDescription,
      deviceFeaturesTitle: pageData.deviceFeaturesTitle,
      deviceAdvantagesTitle: pageData.deviceAdvantagesTitle,
      deviceFeatures,
      deviceAdvantages,

      // Treatment Areas
      treatmentAreas,

      // Pricing
      pricingTitle: pageData.pricingTitle,
      pricingDescription: pageData.pricingDescription,
      pricingCallText: pageData.pricingCallText,
      pricing,

      // Why Us
      whyUsTitle: pageData.whyUsTitle,
      whyUs,

      // FAQ
      faqTitle: pageData.faqTitle,
      faqs,

      // CTA
      ctaTitle: pageData.ctaTitle,
      ctaDescription: pageData.ctaDescription,
      ctaButtonPhone: pageData.ctaButtonPhone,
      ctaButtonWhatsApp: pageData.ctaButtonWhatsApp,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Public API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
