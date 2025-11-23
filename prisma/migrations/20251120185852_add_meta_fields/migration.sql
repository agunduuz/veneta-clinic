-- CreateTable
CREATE TABLE "procedure_pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroTitleHighlight" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroButtonReviews" TEXT NOT NULL,
    "heroButtonPhone" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "heroImageAlt" TEXT NOT NULL,
    "deviceTitle" TEXT NOT NULL,
    "deviceDescription" TEXT NOT NULL,
    "deviceFeaturesTitle" TEXT NOT NULL,
    "deviceAdvantagesTitle" TEXT NOT NULL,
    "pricingTitle" TEXT NOT NULL,
    "pricingDescription" TEXT NOT NULL,
    "pricingCallText" TEXT NOT NULL,
    "whyUsTitle" TEXT NOT NULL,
    "faqTitle" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "ctaButtonPhone" TEXT NOT NULL,
    "ctaButtonWhatsApp" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_features" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_device_items" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_device_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_treatment_areas" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_treatment_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_pricing" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceText" TEXT NOT NULL,
    "colorScheme" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_why_us" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colorScheme" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_why_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedure_faqs" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedure_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "procedure_pages_slug_key" ON "procedure_pages"("slug");

-- CreateIndex
CREATE INDEX "procedure_pages_slug_locale_active_idx" ON "procedure_pages"("slug", "locale", "active");

-- CreateIndex
CREATE UNIQUE INDEX "procedure_pages_slug_locale_key" ON "procedure_pages"("slug", "locale");

-- CreateIndex
CREATE INDEX "procedure_features_pageSlug_locale_active_order_idx" ON "procedure_features"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_device_items_pageSlug_locale_type_active_order_idx" ON "procedure_device_items"("pageSlug", "locale", "type", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_treatment_areas_pageSlug_locale_active_order_idx" ON "procedure_treatment_areas"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_pricing_pageSlug_locale_active_order_idx" ON "procedure_pricing"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_why_us_pageSlug_locale_active_order_idx" ON "procedure_why_us"("pageSlug", "locale", "active", "order");

-- CreateIndex
CREATE INDEX "procedure_faqs_pageSlug_locale_active_order_idx" ON "procedure_faqs"("pageSlug", "locale", "active", "order");
